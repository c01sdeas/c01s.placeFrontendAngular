import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { IBlogResponseData, IBooleanResponse, IGetBlogPostBySlugRequestData, IGetBlogPostUserVoteControlRequestData, IGetBlogPostUserVoteControlResponseData, IGetBlogPostVotesRequestData, IGetBlogPostVotesResponseData, IUpdateBlogPostUserVotesRequestData } from '../../../../../services/apps/models/apps/blogApp/blogPostsCrudModel';
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

  constructor(private activatedRoute:ActivatedRoute, private blogPostService:BlogPostsCrudService, private location:Location, private router:Router, private titleService:Title, private authCrudService:AuthCrudService, private messageService:MessageService){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.getBlogPostBySlugData.slug = params.get('slug')!;
      this.getBlogPostBySlug();
      this.getSessionUsername();

    });
  }

  environmentApiImageUrl:string=environment.apiImageUrl;

  locationBack() {
    this.location.back();
  }

  blogPostDetail:IBlogResponseData = {} as IBlogResponseData;
  getBlogPostBySlugData:IGetBlogPostBySlugRequestData = {slug:''};
  blogPostDetailIsLoading:boolean=false;
  getBlogPostBySlug() {
    this.blogPostDetailIsLoading=true;
    this.blogPostService.getBlogPostBySlug(this.getBlogPostBySlugData).subscribe({
      next: (response:IBlogResponseData) => {
        this.blogPostDetail = response;
      },
      error: (error:any) => {
        this.router.navigateByUrl('/error/notfound');
        this.blogPostDetailIsLoading=false;
      },
      complete: () => {
        this.getBlogPostVoteCount();
        this.getBlogPostUserVoteControl();
        this.blogPostDetailIsLoading=false;
        this.titleService.setTitle(this.blogPostDetail.data.title+' - c01splace');
      }
    });
  }

  imageContentDialogVisible:boolean=false;
  imageContentDialogData:string="";
  showImageContentDialog(){
    this.imageContentDialogVisible = true;
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
      const blogPostUserVoteControlData:IGetBlogPostUserVoteControlRequestData = {blogID:this.blogPostDetail.data.id, username:this.sessionUsername};
      this.blogPostService.getBlogPostUserVoteControl(blogPostUserVoteControlData).subscribe({
        next: (response:IGetBlogPostUserVoteControlResponseData) => {
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
  blogPostVoteCount:IGetBlogPostVotesResponseData = {} as IGetBlogPostVotesResponseData;
  blogPostVotedControl:number=0;
  getBlogPostVoteCount(){
    if (!this.blogPostDetail.data) {
      return;
    }
    const blogPostVoteCountData:IGetBlogPostVotesRequestData = {blogID:this.blogPostDetail.data.id};
    this.blogPostService.getBlogPostVoteCount(blogPostVoteCountData).subscribe({
      next: (response:IGetBlogPostVotesResponseData) => {
        this.blogPostVoteCount = response;
        this.blogPostDetail.data.voteCount=response.data;
        this.updateBlogPostVoteButtonLoading = false;
      },
      error: (error:any) => {
        console.log(error);
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
    this.authCrudService._signedInData.subscribe(response=>{if(response){this.sessionUsername=response.data.username;this.getBlogPostUserVoteControl();}});
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
      const updateBlogPostVoteData:IUpdateBlogPostUserVotesRequestData = {blogID:this.blogPostDetail.data.id, username:this.sessionUsername, vote:vote};
      this.blogPostService.updateBlogPostVote(updateBlogPostVoteData).subscribe({
        next: (response:IBooleanResponse) => {
          this.getBlogPostVoteCount();
          this.getBlogPostUserVoteControl();
          this.messageService.add({severity:'success', summary: 'Success!'});
        },
        error: (error:any) => {
          console.log(error);
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

  //comments
  clear(table:Table){
    table.clear();
  }

  onGlobalFilter(table:Table, event:any){
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  menuItems:MenuItem[] = [
    {
        label: 'Post Options',
        items: [
            {
                label: 'Edit',
                icon: 'pi pi-pencil'
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash'
            }
        ]
    }
  ];

  
}
