import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { BlogPostsCrudService } from '../../../../../services/apps/blogApp/blog-posts-crud.service';
import { IBlogResponseListData, IGetAllBlogPostsRequestData, IGetBlogPostByCategorySlugRequestData } from '../../../../../services/apps/models/apps/blogApp/blogPostsCrudModel';
import { TabsModule } from 'primeng/tabs';
import { BlogCategoriesCrudService } from '../../../../../services/apps/blogApp/blog-categories-crud.service';
import { IBlogCategoryResponseListData, IGetAllBlogCategoriesRequestData } from '../../../../../services/apps/models/apps/blogApp/blogCategoriesCrudModel';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { environment } from '../../../../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    DividerModule,
    CardModule,
    TabsModule,
    RouterModule,
    TooltipModule
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {

  constructor (private router:Router, private blogPostService:BlogPostsCrudService, private blogCategoryService:BlogCategoriesCrudService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.getAllBlogPosts();
    this.getAllBlogCategories();
  }
  
  environmentApiImageUrl:string=environment.apiImageUrl;

  blogCategories:IBlogCategoryResponseListData = {} as IBlogCategoryResponseListData;
  getAllBlogCategoriesData:IGetAllBlogCategoriesRequestData = {page:1, limit:10};
  getAllBlogCategories() {
    this.blogCategoryService.getAllBlogCategories(this.getAllBlogCategoriesData).subscribe({
      next: (response:IBlogCategoryResponseListData) => {
        this.blogCategories = response;
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching categories.'});
        location.reload();
      }
    });
  }


  postsIsLoading:boolean=false;
  blogList:IBlogResponseListData = {} as IBlogResponseListData;
  getBlogPostsData:IGetAllBlogPostsRequestData = {page:1, limit:10};
  getAllBlogPosts() {
    this.postsIsLoading=true;
    this.blogPostService.getAllBlogPosts(this.getBlogPostsData).subscribe({
      next: (response:IBlogResponseListData) => {
        this.blogList = response;
        this.postsIsLoading=false;
        console.log(this.blogList);
        
      },
      error: (error:any) => {
        this.postsIsLoading=false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching posts.'});
        location.reload();
      }
    });
  }

  loadMorePostButtonVisible:boolean=true;
  getAllBlogPostsWithScroll(){
    this.postsIsLoading=true;
    this.getBlogPostsData.page++;
    this.blogPostService.getAllBlogPosts(this.getBlogPostsData).subscribe({
      next: (response:IBlogResponseListData) => {
        if(response.data)
            this.blogList.data.push(...response.data);
          else {
            this.loadMorePostButtonVisible=false;
            this.messageService.add({severity:'warn', summary:'No more posts', detail:'No more posts to load.'});
          }
        
        this.postsIsLoading=false;
      },
      error: (error:any) => {
        this.postsIsLoading=false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching posts.'});
        location.reload();
      },
      complete: () => {
        this.postsIsLoading=false;
      }
    });
  }

}
