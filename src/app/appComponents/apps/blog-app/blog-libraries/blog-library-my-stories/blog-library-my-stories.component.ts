import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { IGetAllBlogPostsByUsernameForLibraryRequestDto } from '../../../../../models/apps/blogApp/blogLibraries/blogLibrariesRequestModel';
import { BlogLibrariesService } from '../../../../../services/apps/blogApp/blog-libraries.service';
import { IBlogListResponseDto } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-library-my-stories',
  imports: [CommonModule, RouterModule, ButtonModule, CardModule, TableModule, TagModule],
  templateUrl: './blog-library-my-stories.component.html',
  styleUrl: './blog-library-my-stories.component.scss'
})
export class BlogLibraryMyStoriesComponent implements OnInit {

  constructor (private blogLibrariesService:BlogLibrariesService, private messageService:MessageService, private location:Location){}

  locationBack(){
    this.location.back();
  }

  getAllBlogPostsByUsernameForLibraryData:IGetAllBlogPostsByUsernameForLibraryRequestDto={
    page:1,
    limit:10
  }

  ngOnInit(): void {
    this.getAllBlogPostsByUsernameForLibrary();
  }

  postsIsLoading:boolean=false;
  totalRecords:number=0;
  blogPostList:IBlogListResponseDto={} as IBlogListResponseDto;
  getAllBlogPostsByUsernameForLibrary(){
    this.postsIsLoading=true;
    this.blogLibrariesService.getAllBlogPostsByUsernameForLibraryService(this.getAllBlogPostsByUsernameForLibraryData).subscribe({
      next:(res)=>{
        console.log(res);
        this.blogPostList=res;
        this.totalRecords=res.totalRecords;
      },
      error:(error)=>{
        console.log(error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching blog posts.'});
      },
      complete:()=>{
        this.postsIsLoading=false;
      }
    });
  }

  loadMorePostButtonVisible:boolean=true;
  getAllBlogPostsWithScroll(){
    this.postsIsLoading = true;
    this.getAllBlogPostsByUsernameForLibraryData.page++;
  
    this.blogLibrariesService.getAllBlogPostsByUsernameForLibraryService(this.getAllBlogPostsByUsernameForLibraryData)
      .pipe(finalize(() => this.postsIsLoading = false))
      .subscribe({
        next: (response: IBlogListResponseDto) => {
          const validPosts = response.data.filter(blog => blog.status && blog.categoryStatus);
          if (validPosts.length > 0) {
            this.blogPostList.data.push(...validPosts);
          } else {
            this.loadMorePostButtonVisible = false;
            this.messageService.add({ severity: 'warn', summary: 'No more posts', detail: 'No more posts to load.' });
          }
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching posts.' });
        }
      });
  }

  onTableLazyLoad(event: TableLazyLoadEvent) {
    const page = Math.floor((event.first ?? 0) / (event.rows ?? 10)) + 1;
    const limit = event.rows ?? 10;
  
    this.getAllBlogPostsByUsernameForLibraryData.page = page;
    this.getAllBlogPostsByUsernameForLibraryData.limit = limit;
  
    this.postsIsLoading = true;
    this.blogLibrariesService.getAllBlogPostsByUsernameForLibraryService(this.getAllBlogPostsByUsernameForLibraryData)
      .pipe(finalize(() => this.postsIsLoading = false))
      .subscribe({
        next: (res) => {
          this.blogPostList.data = res.data; // her seferde sıfırdan yüklenir
          this.totalRecords = res.totalRecords || 0;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching posts.' });
        }
      });
  }

}
