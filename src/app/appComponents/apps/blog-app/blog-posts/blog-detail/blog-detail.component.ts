import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { IBlogResponseDto, IBooleanResponse, IGetBlogPostBySlugRequestDto, IGetBlogPostUserVoteControlRequestDto, IGetBlogPostUserVoteControlResponseDto, IGetBlogPostVotesRequestDto, IGetBlogPostVotesResponseDto, IUpdateBlogPostUserVotesRequestDto, IUpdateBlogPostViewLogResponseDto } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { BlogPostsCrudService } from '../../../../../services/apps/blogApp/blog-posts-crud.service';
import { CommonModule, Location } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { Title } from '@angular/platform-browser';
import { AuthCrudService } from '../../../../../services/users/auths/auth-crud.service';
import { environment } from '../../../../../../environments/environment';
import { BlogLibrariesService } from '../../../../../services/apps/blogApp/blog-libraries.service';
import { UserCrudService } from '../../../../../services/users/user-crud.service';
import { IUserRolesResponseDto } from '../../../../../models/auths/authCrudModel';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    ButtonModule,
    RouterModule,
    DialogModule,
    TableModule,
    PaginatorModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CardModule,
    MenuModule,
    TooltipModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private blogPostService:BlogPostsCrudService, private location:Location, private router:Router, private titleService:Title, private authCrudService:AuthCrudService, private messageService:MessageService, private blogLibrariesService:BlogLibrariesService, private userCrudService:UserCrudService, private meta:Meta){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.getBlogPostBySlugData.slug = params.get('slug')!;
      this.getBlogPostBySlug();
    });
  }
  
  environmentApiImageUrl:string=environment.apiImageUrl;
  @ViewChild('blogContentRef') blogContentRef!: ElementRef;
  fixImageSrcs() {
    if (!this.blogContentRef) return;
  
    // const images = this.blogContentRef.nativeElement.querySelectorAll('img');
    // images.forEach((img: HTMLImageElement) => {
    //   img.style.cursor = 'pointer';
    //   img.addEventListener('click', () => {
    //     this.showImageContentDialog(img.src);
    //   });
    // });
  }

  sanitizeAndWrapPreTags(html: string): string {
    const newContent = html.replace(/<pre([\s\S]*?)>([\s\S]*?)<\/pre>/gi, (match, attr, content) => {
      return `
        <div class="overflow-x-auto max-w-full whitespace-pre border border-gray-700 rounded-md bg-gray-900 pb-6 pl-6 pr-6 font-mono text-lg text-gray-200">         
          <pre id="code-block"${attr}>${content}</pre>
        </div>
      `;
    });
    this.blogContentRef.nativeElement.innerHTML = newContent;
    return newContent;
  }
  

  locationBack() {
    this.location.back();
  }

  blogPostDetail:IBlogResponseDto = {} as IBlogResponseDto;
  getBlogPostBySlugData:IGetBlogPostBySlugRequestDto = {slug:''};
  blogPostDetailIsLoading:boolean=false;
  getBlogPostBySlug() {
    this.blogPostDetailIsLoading=true;
    this.blogPostService.getBlogPostBySlug(this.getBlogPostBySlugData).subscribe({
      next: (response:IBlogResponseDto) => {
        this.blogPostDetail = response;
        if (response.data.status === false) this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
        this.getSessionUsername();
        this.updateBlogPostViewCount(this.blogPostDetail.data.id);
      },
      error: (error:any) => {
        this.router.navigateByUrl('/error/notfound');
        this.blogPostDetailIsLoading=false;
      },
      complete: () => {
        this.getBlogPostVoteCount();
        this.getBlogPostUserVoteControl();
        // setTimeout(() => {
        //   this.fixImageSrcs();
        // }, 1);
        setTimeout(() => {
          this.sanitizeAndWrapPreTags(this.blogPostDetail.data.content);
        }, 1);
        this.blogPostDetailIsLoading=false;
        if(this.blogPostDetail.data) this.titleService.setTitle(this.blogPostDetail.data.title+' - c01splace');
      }
    });
  }

  imageContentDialogVisible:boolean=false;
  imageContentDialogData:string="";
  showImageContentDialog(imageSrc:string){
    this.imageContentDialogVisible = true;
    this.imageContentDialogData = imageSrc;
  }
  hideImageContentDialog(){
    this.imageContentDialogVisible = false;
    this.imageContentDialogData="";
  }

  //getBlogPostUserVoteControl
  blogPostUserVoteControlIsLoading:boolean=false;
  getBlogPostUserVoteControl(){
    this.blogPostUserVoteControlIsLoading=true;
    if (this.blogPostDetail.data && this.sessionUsername) {
      const blogPostUserVoteControlData:IGetBlogPostUserVoteControlRequestDto = {blogPostID:this.blogPostDetail.data.id, username:this.sessionUsername};
      this.blogPostService.getBlogPostUserVoteControl(blogPostUserVoteControlData).subscribe({
        next: (response:IGetBlogPostUserVoteControlResponseDto) => {
          this.blogPostUserVoteControlIsLoading=false;
          this.blogPostVotedControl=response.data;
        },
        error: (error:any) => {
          this.blogPostUserVoteControlIsLoading=false;
        },
        complete: () => {
          this.blogPostUserVoteControlIsLoading=false;
        }
      });
    }
    else {
      this.blogPostUserVoteControlIsLoading=false;
    }
  }

  //updateVotes
  blogPostVoteCount:IGetBlogPostVotesResponseDto = {} as IGetBlogPostVotesResponseDto;
  blogPostVotedControl:number=0;
  getBlogPostVoteCount(){
    if (!this.blogPostDetail.data) {
      return;
    }
    const blogPostVoteCountData:IGetBlogPostVotesRequestDto = {blogPostID:this.blogPostDetail.data.id};
    this.blogPostService.getBlogPostVoteCount(blogPostVoteCountData).subscribe({
      next: (response:IGetBlogPostVotesResponseDto) => {
        this.blogPostVoteCount = response;
        this.blogPostDetail.data.voteCount=response.data;
        this.updateBlogPostVoteButtonLoading = false;
      },
      error: (error:any) => {
        (error);
        this.updateBlogPostVoteButtonLoading = false;
      },
      complete: () => {
        this.updateBlogPostVoteButtonLoading = false;
      }
    });
  }

  sessionUsername:string="";
  getSessionUsername(){
    if (!localStorage.getItem('authorization')) {
      return;
    }
    this.authCrudService._signedInData.subscribe(response=>{
      if(response){
        this.sessionUsername=response.data.username;
        this.getBlogPostUserVoteControl();
        this.getUserRolesData();
      }
    });
  }

  userRolesData:string[]=[];
  getUserRolesData(){
    this.userCrudService.getUserRolesData({username:this.sessionUsername}).subscribe({
      next: (response:IUserRolesResponseDto) => {
        this.userRolesData=response.data;
        if (this.blogPostDetail.data && this.blogPostDetail.data.status==false && (this.userRolesData.includes('admin') || this.userRolesData.includes('moderator'))) {
          this.menuItems = [
            {
              label: 'Approve',
              icon: 'pi pi-check',
              command: () => this.showUpdateBlogPostStatusDialog()
            },
            // {
            //   label: 'Delete',
            //   icon: 'pi pi-trash',
            //   command: () => this.showDeleteBlogPostDialog()
            // }
          ];
        }
        else if (this.blogPostDetail.data && this.blogPostDetail.data.status==true && (this.userRolesData.includes('admin') || this.userRolesData.includes('moderator'))) {
          this.menuItems = [
            {
              label: 'Reject',
              icon: 'pi pi-times',
              command: () => this.showUpdateBlogPostStatusDialog()
            },
            // {
            //   label: 'Delete',
            //   icon: 'pi pi-trash',
            //   command: () => this.showDeleteBlogPostDialog()
            // }
          ];
        }
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error!', detail:'Error fetching user roles.'})
      }
    });
  }

  //updateBlogPostVote
  updateBlogPostVoteButtonLoading : boolean = false;
  updateBlogPostVote(vote:number){
    if (this.sessionUsername=="" || this.sessionUsername==null || this.sessionUsername==undefined) {
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    
    if (this.blogPostVotedControl * vote > 0) vote = 0;
    
    this.updateBlogPostVoteButtonLoading = true;
    if (this.blogPostDetail.data && this.sessionUsername) {
      const updateBlogPostVoteData:IUpdateBlogPostUserVotesRequestDto = {blogPostID:this.blogPostDetail.data.id, username:this.sessionUsername, vote:vote};
      this.blogPostService.updateBlogPostVote(updateBlogPostVoteData).subscribe({
        next: (response:IBooleanResponse) => {
          this.getBlogPostVoteCount();
          this.getBlogPostUserVoteControl();
          this.messageService.add({severity:'success', summary: 'Success!'});
        },
        error: (error:any) => {
          (error);
          this.messageService.add({severity:'error', summary:'Error!'});
          if(error.status==401 || this.sessionUsername=="" || this.sessionUsername==null || this.sessionUsername==undefined){
            this.authCrudService.returnUrl = this.location.path();
            this.router.navigateByUrl('/auth/login');
          }
          this.updateBlogPostVoteButtonLoading = false;
        },
        complete: () => {
          this.updateBlogPostVoteButtonLoading = false;
        }
      });
    }
  }

  viewCount:number=0;
  viewCountLoading:boolean=false;
  updateBlogPostViewCount(id:string){
    this.viewCountLoading=true;
    this.blogPostService.updateBlogPostViewLog({blogPostID:id}).subscribe({
      next: (response:IUpdateBlogPostViewLogResponseDto) => {
        this.viewCount = response.data;
        this.viewCountLoading=false;
      },
      error: (error:any) => {
        this.viewCountLoading=false;
      }
    });
  }
  
  saveToLibrary(blogPostID:string){
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined || this.sessionUsername == "" || this.sessionUsername == null || this.sessionUsername == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.blogLibrariesService.temporarySaveToLibraryData = blogPostID;
    this.authCrudService.returnUrl = this.location.path();
    
    this.router.navigateByUrl('/user/library/list');
  }

  //comments
  clear(table:Table){
    table.clear();
  }

  onGlobalFilter(table:Table, event:any){
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  //menu
  menuItems:MenuItem[] = [];

  updateAndDeleteBlogPostSpamControl: boolean = false;

  showDeleteBlogPostDialog(){
    this.deleteBlogPostDialogVisible = true;
  }

  deleteBlogPostDialogVisible : boolean = false;

  deleteBlogPost(){
    this.deleteBlogPostDialogVisible = false;
    this.updateAndDeleteBlogPostSpamControl=true;
    this.blogPostService.deleteBlogPost({id:this.blogPostDetail.data.id}).subscribe({
      next: (response:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary: 'Success!'});
        this.getBlogPostBySlug();
      },
      error: (error:any) => {
        (error);
        this.messageService.add({severity:'error', summary:'Error!'});
        if(error.status==401 || this.sessionUsername=="" || this.sessionUsername==null || this.sessionUsername==undefined){
          this.authCrudService.returnUrl = this.location.path();
          this.router.navigateByUrl('/auth/login');
        }
      },
      complete: () => {
        this.deleteBlogPostDialogVisible = false;
        this.updateAndDeleteBlogPostSpamControl=false;
      }
    });
  }

  hideDeleteBlogPostDialog(){
    this.deleteBlogPostDialogVisible = false;
  }

  updateBlogPostStatusDialogVisible : boolean = false;

  showUpdateBlogPostStatusDialog(){
    this.updateBlogPostStatusDialogVisible = true;
  }

  hideUpdateBlogPostStatusDialog(){
    this.updateBlogPostStatusDialogVisible = false;
  }

  updateBlogPostStatus(){
    this.updateAndDeleteBlogPostSpamControl=true;
    this.blogPostService.updateBlogPostStatus({id:this.blogPostDetail.data.id}).subscribe({
      next: (response:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary: 'Success!', detail:'Blog post status updated successfully.'});
        this.getBlogPostBySlug();
      },
      error: (error:any) => {
        (error);
        this.messageService.add({severity:'error', summary:'Error!', detail:'Error updating blog post status.'});
        if(error.status==401 || this.sessionUsername=="" || this.sessionUsername==null || this.sessionUsername==undefined){
          this.authCrudService.returnUrl = this.location.path();
          this.router.navigateByUrl('/auth/login');
        }
      },
      complete: () => {
        this.updateBlogPostStatusDialogVisible = false;
        this.updateAndDeleteBlogPostSpamControl=false;
      }
    });
  }

  
}
