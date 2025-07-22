import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { BlogPostsCrudService } from '../../../../../services/apps/blogApp/blog-posts-crud.service';
import { IBlogListResponseDto, IGetAllBlogPostsRequestDto } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { TabsModule } from 'primeng/tabs';
import { BlogCategoriesCrudService } from '../../../../../services/apps/blogApp/blog-categories-crud.service';
import { IBlogCategoryResponseListData, IGetAllBlogCategoriesRequestDto } from '../../../../../models/apps/blogApp/blogPosts/blogCategoriesCrudModel';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from '../../../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { BlogLibrariesService } from '../../../../../services/apps/blogApp/blog-libraries.service';
import { AuthCrudService } from '../../../../../services/users/auths/auth-crud.service';
import { Location } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    TableModule,
    DividerModule,
    CardModule,
    TabsModule,
    RouterModule,
    TooltipModule,
    DialogModule,
    SplitButtonModule
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {

  constructor (private router:Router, private blogPostCrudService:BlogPostsCrudService, private blogCategoryService:BlogCategoriesCrudService, private messageService:MessageService, private blogLibrariesService:BlogLibrariesService, private authCrudService:AuthCrudService, private location:Location) { }

  ngOnInit(): void {
    this.getAllBlogPosts();
    this.getSessionUsername();
  }
  
  environmentApiImageUrl:string=environment.apiImageUrl;

  postsIsLoading:boolean=false;
  blogList:IBlogListResponseDto = {} as IBlogListResponseDto;
  getAllBlogPostsData:IGetAllBlogPostsRequestDto = {page:1, limit:10};
  getAllBlogPostsByFollowingTagsData:IGetAllBlogPostsRequestDto = {page:1, limit:10};
  getAllBlogPosts() {
    this.getAllBlogPostsData.page=1;
    this.listingFollowingTags=false;
    this.postsIsLoading=true;
    this.loadMorePostButtonVisible = true;
    this.blogPostCrudService.getAllBlogPosts(this.getAllBlogPostsData).subscribe({
      next: (response:IBlogListResponseDto) => {
        // this.blogList = response;
        if (response.data) {
          this.blogList.data=response.data.filter(blog=>blog.status&&blog.categoryStatus);
        }
        this.postsIsLoading=false;        
      },
      error: (error:any) => {
        this.postsIsLoading=false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching posts.'});
      }
    });
  }

  loadMorePostButtonVisible:boolean=true;
  getAllBlogPostsWithScroll(){
    this.postsIsLoading=true;
    
    if (!this.listingFollowingTags) {
      this.getAllBlogPostsData.page++;
      this.blogPostCrudService.getAllBlogPosts(this.getAllBlogPostsData).subscribe({
        next: (response:IBlogListResponseDto) => {          
          if(response.data && response.data.length>0 && response.data.filter(blog=>blog.status&&blog.categoryStatus).length>0)
            response.data.filter((blog)=>{
              if(blog.status){
                this.blogList.data.push(blog);
              }
            });
          else {
              this.loadMorePostButtonVisible=false;
              this.messageService.add({severity:'warn', summary:'No more posts', detail:'No more posts to load.'});
            }
          
          this.postsIsLoading=false;
        },
        error: (error:any) => {
          this.postsIsLoading=false;
          this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching posts.'});
        },
        complete: () => {
          this.postsIsLoading=false;
        }
      });
    } else {
      this.getAllBlogPostsByFollowingTagsData.page++;
      this.blogLibrariesService.getAllBlogPostsByFollowingTagsService(this.getAllBlogPostsByFollowingTagsData).subscribe({
        next: (response:IBlogListResponseDto) => {
          if(response.data && response.data.length>0 && response.data.filter(blog=>blog.status&&blog.categoryStatus).length>0)
            response.data.filter((blog)=>{
              if(blog.status){
                this.blogList.data.push(blog);
              }
            });
          else {
              this.loadMorePostButtonVisible=false;
              this.messageService.add({severity:'warn', summary:'No more posts', detail:'No more posts to load.'});
            }
          
          this.postsIsLoading=false;
        },
        error: (error:any) => {
          this.postsIsLoading=false;
          this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching posts.'});
        },
        complete: () => {
          this.postsIsLoading=false;
        }
      });
    }
  }

  //blogLibraries

  sessionUsername:string="";
    getSessionUsername(){
    if (!localStorage.getItem('authorization')) {
      return;
    }
    this.authCrudService._signedInData.subscribe(response=>{if(response){this.sessionUsername=response.data.username;}});
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

  listingFollowingTags:boolean=false;
  getAllBlogPostsByFollowingTags(){
    this.getAllBlogPostsByFollowingTagsData.page=1;
    this.listingFollowingTags=true;
    this.postsIsLoading=true;
    this.loadMorePostButtonVisible = true;
    this.blogLibrariesService.getAllBlogPostsByFollowingTagsService(this.getAllBlogPostsByFollowingTagsData).subscribe({
      next: (response:IBlogListResponseDto) => {
        this.blogList.data=response.data.filter((blog)=>blog.status&&blog.categoryStatus);
        this.postsIsLoading=false;
      },
      error: (error:any) => {
        this.postsIsLoading=false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching posts.'});
      }
    });
  }

  
}
