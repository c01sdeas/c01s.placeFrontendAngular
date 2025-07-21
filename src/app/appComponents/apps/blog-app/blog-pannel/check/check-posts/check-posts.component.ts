import { Component } from '@angular/core';
import { BlogPostsCrudService } from '../../../../../../services/apps/blogApp/blog-posts-crud.service';
import { IBlogListResponseDto, IGetAllBlogPostsRequestDto } from '../../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-check-posts',
  imports: [TableModule, ButtonModule, FormsModule, CommonModule, InputTextModule, BadgeModule, DividerModule, ToggleButtonModule, RouterLink, CardModule, DialogModule],
  templateUrl: './check-posts.component.html',
  styleUrl: './check-posts.component.scss'
})
export class CheckPostsComponent {

  constructor (private blogPostsCrudService:BlogPostsCrudService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.getAllBlogPosts();
  }

  blogPostListLoading:boolean=false;
  getAllBlogPostsRequestDto:IGetAllBlogPostsRequestDto={ page:1, limit:0 };
  blogList:IBlogListResponseDto={} as IBlogListResponseDto;
  getAllBlogPosts(){
    this.blogPostListLoading=true;
    this.blogPostsCrudService.getAllBlogPosts(this.getAllBlogPostsRequestDto).subscribe({
      next:(response:IBlogListResponseDto)=>{
        this.blogList = response;
        console.log(response);
        
        if (response.data) this.blogList.data=response.data.filter((blog)=>blog.categoryStatus);
      },
      error:(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching stories.' });
      },
      complete:()=>{
        this.blogPostListLoading=false;
        if(this.updateBlogPostStatusSpamControlData && this.updateBlogPostStatusSpamControlData.length>0){
          this.updateBlogPostStatusSpamControl.splice(this.updateBlogPostStatusSpamControl.indexOf(this.updateBlogPostStatusSpamControlData), 1);
          this.updateBlogPostStatusSpamControlData=undefined;
        }
      }
    });
  }

  postStatusFilter:boolean=false;

  updateBlogPostStatusSpamControl:string[]=[];
  updateBlogPostStatusSpamControlData:string|undefined;
  updateBlogPostStatus(postID:string){
    
    this.updateBlogPostStatusSpamControlData=postID;
    this.updateBlogPostStatusSpamControl.push(postID);
    this.blogPostsCrudService.updateBlogPostStatus({id:postID}).subscribe({
      next:(response)=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Blog post status updated successfully.' });
        this.getAllBlogPosts();
      },
      error:(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating blog post status.' });
      }
    });
  }


  //delete
  deleteBlogPostDialogVisible:boolean=false;
  deleteBlogPostDialogPostID:string|undefined;
  deleteBlogPostDialogPostTitle:string|undefined;
  showDeleteBlogPostDialog(postID:string, postTitle:string){
    this.deleteBlogPostDialogPostID=postID;
    this.deleteBlogPostDialogPostTitle=postTitle;
    this.deleteBlogPostDialogVisible=true;
    
  }
  hideDeleteBlogPostDialog(){
    this.deleteBlogPostDialogVisible=false;
    this.deleteBlogPostDialogPostID=undefined;
    this.deleteBlogPostDialogPostTitle=undefined;
  }

  deleteBlogPost(){
    this.updateBlogPostStatusSpamControlData=this.deleteBlogPostDialogPostID!;
    this.updateBlogPostStatusSpamControl.push(this.deleteBlogPostDialogPostID!);
    this.blogPostsCrudService.deleteBlogPost({id:this.deleteBlogPostDialogPostID!}).subscribe({
      next:(response)=>{        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Blog post deleted successfully.' });
        this.getAllBlogPosts();
      },
      error:(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting blog post.' });
      },
      complete:()=>{
        this.hideDeleteBlogPostDialog();
      }
    });
  }



}
