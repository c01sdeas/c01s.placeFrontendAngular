import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BlogPostsCrudService } from '../../../services/apps/blogApp/blog-posts-crud.service';
import { UserCrudService } from '../../../services/users/user-crud.service';
import { IBlogListResponseDto, IGetAllBlogPostsByUsernameRequestDto } from '../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BlogLibrariesService } from '../../../services/apps/blogApp/blog-libraries.service';
import { AuthCrudService } from '../../../services/users/auths/auth-crud.service';
import { TooltipModule } from 'primeng/tooltip';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post-list-from-user',
  imports: [CommonModule, RouterModule, ButtonModule, DividerModule, MenuModule, TooltipModule],
  templateUrl: './blog-post-list-from-user.component.html',
  styleUrl: './blog-post-list-from-user.component.scss'
})
export class BlogPostListFromUserComponent implements OnInit{
  
  constructor (private messageService:MessageService, private blogPostService:BlogPostsCrudService, private userCrudService:UserCrudService, private route:ActivatedRoute, private location:Location, private router:Router, private blogLibrariesService:BlogLibrariesService, private authCrudService:AuthCrudService, private titleService:Title) {}

  ngOnInit(): void {
    this.getAllBlogPostsByUsername();
  }

  menuItems:MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil'
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash'
    }
  ];

  goToPostDetail(categorySlug:string,postSlug:string) {
    this.router.navigate(['/tag', categorySlug, 'post', postSlug]);
  }

  locationBack(){
    this.location.back();
  }
  
  writer:string="";

  environmentApiImageUrl:string=environment.apiImageUrl;

  postsIsLoading:boolean = false;

  blogList:IBlogListResponseDto ={} as IBlogListResponseDto;
  getAllBlogPostsByUsernameRequestData:IGetAllBlogPostsByUsernameRequestDto = {username:"", page:1, limit:10};
  getAllBlogPostsByUsername(){
    this.postsIsLoading = true;
    this.getAllBlogPostsByUsernameRequestData.username = this.route.snapshot.params['username'];
    this.blogPostService.getAllBlogPostsByUsername(this.getAllBlogPostsByUsernameRequestData).subscribe({
      next: (res:IBlogListResponseDto) => {
        this.blogList = {...res};
        this.blogList.data = [];
        if (res.data && res.data.length>0) {
          this.writer = res.data[0].userNickname;
          this.titleService.setTitle("Stories from " + this.writer + " - c01splace");
          res.data.filter((blog)=>{
            if(blog.status){
              this.blogList.data.push(blog);
            }
          });
        }
        this.postsIsLoading = false;
      },
      error: (err) => {
        (err);
        this.postsIsLoading = false;
      }
    })
  }

  loadMorePostButtonVisible:boolean=true;
  getAllBlogPostsWithScroll(){
      this.postsIsLoading=true;
      this.getAllBlogPostsByUsernameRequestData.page++;
      this.blogPostService.getAllBlogPostsByUsername(this.getAllBlogPostsByUsernameRequestData).subscribe({
      next: (response:IBlogListResponseDto) => {
          if(response.data)
              this.blogList.data.push(...response.data.filter(blog=>blog.status));
          else {
              this.loadMorePostButtonVisible=false;
              this.messageService.add({severity:'warn', summary:'No more posts', detail:'No more posts to load.'});
          }
          
          this.postsIsLoading=false;
      },
      error: (error:any) => {
          this.postsIsLoading=false;
      },
      complete: () => {
          this.postsIsLoading=false;
      }
      });
  }

  saveToLibrary(blogPostID:string){
    this.authCrudService.signedInData$.subscribe(response=>{
      if(response.data.username){
        this.blogLibrariesService.temporarySaveToLibraryData = blogPostID;
        this.authCrudService.returnUrl = this.location.path();
        this.router.navigateByUrl('/user/library/list');
      } else this.router.navigateByUrl('/auth/login');
    });
  }
}
