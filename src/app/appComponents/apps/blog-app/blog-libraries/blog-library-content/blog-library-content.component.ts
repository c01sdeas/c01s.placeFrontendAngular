import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BlogLibrariesService } from '../../../../../services/apps/blogApp/blog-libraries.service';
import { IGetAllBlogPostsInLibraryRequestDto } from '../../../../../models/apps/blogApp/blogLibraries/blogLibrariesRequestModel';
import { IBlogPostListInLibraryResponseDto } from '../../../../../models/apps/blogApp/blogLibraries/blogLibrariesResponseModel';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { environment } from '../../../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { IBooleanResponse } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { Location } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-library-content',
  imports: [CommonModule, ButtonModule, DividerModule, RouterLink, RouterModule, TooltipModule],
  templateUrl: './blog-library-content.component.html',
  styleUrl: './blog-library-content.component.scss'
})
export class BlogLibraryContentComponent implements OnInit {

  constructor(private blogLibrariesService:BlogLibrariesService, private activatedRoute:ActivatedRoute, private messageService:MessageService, private location:Location, private titleService:Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Library - c01splace");
    this.activatedRoute.paramMap.subscribe(params => {
      this.getBlogPostsData.libraryID=params.get('libraryID')!;
      this.getAllBlogPostsInLibrary();
    });
  }

  locationBack(){
    this.location.back();
  }
  
  environmentApiImageUrl:string=environment.apiImageUrl;

  // blogCategories:IBlogCategoryResponseListData = {} as IBlogCategoryResponseListData;
  // getAllBlogCategoriesData:IGetAllBlogCategoriesRequestDto = {page:1, limit:10};
  // getAllBlogCategories() {
  //   this.blogCategoryService.getAllBlogCategories(this.getAllBlogCategoriesData).subscribe({
  //     next: (response:IBlogCategoryResponseListData) => {
  //       this.blogCategories = response;
  //     },
  //     error: (error:any) => {
  //       this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching categories.'});
  //       // location.reload();
  //     }
  //   });
  // }


  postsIsLoading:boolean=false;
  blogList:IBlogPostListInLibraryResponseDto = {} as IBlogPostListInLibraryResponseDto;
  getBlogPostsData:IGetAllBlogPostsInLibraryRequestDto = {libraryID:"", page:1, limit:10};
  getAllBlogPostsInLibrary() {
    this.postsIsLoading=true;
    
    this.blogLibrariesService.getAllBlogPostsInLibraryService(this.getBlogPostsData).subscribe({
      next: (response:IBlogPostListInLibraryResponseDto) => {

        this.blogList={...response};
        this.blogList.data=[];
        
        if (response.data) {
          response.data.filter((blogPost) => {
            if (blogPost.status && blogPost.blogPostInLibraryStatus) {
              this.blogList.data.push(blogPost);
            }
          });
        } else {
          this.loadMorePostButtonVisible=false;
          this.messageService.add({severity:'warn', summary:'No more posts', detail:'No more posts to load.'});
        }

        this.postsIsLoading=false;
        
      },
      error: (error:any) => {
        this.blogList.data=[];
        this.postsIsLoading=false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching posts.'});
        // location.reload();
      }
    });
  }

  loadMorePostButtonVisible:boolean=true;
  getAllBlogPostsWithScroll(){
    this.postsIsLoading=true;
    this.getBlogPostsData.page++;
    this.blogLibrariesService.getAllBlogPostsInLibraryService(this.getBlogPostsData).subscribe({
      next: (response:IBlogPostListInLibraryResponseDto) => {
        this.blogList={...response};
        this.blogList.data=[];
        if(response.data){
          response.data.filter((blogPost) => {
            if (blogPost.status && blogPost.blogPostInLibraryStatus) {
              this.blogList.data.push(blogPost);
            }
          });
        }
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

  removeFromLibrary(blogPostID:string){
    this.blogLibrariesService.deleteBlogPostInLibraryService({libraryID:this.getBlogPostsData.libraryID, blogPostID}).subscribe({
      next: (response:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Post removed from library.'});
        this.getAllBlogPostsInLibrary();
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error removing post from library.'});
      }
    });
  }

}
