import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { IBlogCategoryResponseListData, IGetAllBlogCategoriesRequestDto } from '../../../../../../models/apps/blogApp/blogPosts/blogCategoriesCrudModel';
import { BlogCategoriesCrudService } from '../../../../../../services/apps/blogApp/blog-categories-crud.service';
import { IBooleanResponse } from '../../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-tags',
  imports: [CommonModule, TableModule, PaginatorModule, ButtonModule, InputTextModule, IconFieldModule, RouterModule, CardModule, DividerModule, TooltipModule, DialogModule, ToggleButtonModule, BadgeModule, FormsModule ],
  templateUrl: './check-tags.component.html',
  styleUrl: './check-tags.component.scss'
})
export class CheckTagsComponent {
  constructor(private router:Router, private blogCategoriesCrudService: BlogCategoriesCrudService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.getAllBlogCategories();
  }

  blogCategories: IBlogCategoryResponseListData = {} as IBlogCategoryResponseListData;
  blogCategoriesIsLoading : boolean = false;
  getAllBlogCategories(){
    
    this.blogCategoriesIsLoading = true;
    this.blogCategoriesCrudService.getAllBlogCategories({page:1,limit:0}).subscribe({
      next: (response:IBlogCategoryResponseListData) => {
        this.blogCategories = response;              
        // this.blogCategories.data = this.blogCategories.data.filter(category => category.status);
        this.blogCategoriesIsLoading = false;
        console.log(response);
      },
      error: (error:any) => {
        this.blogCategoriesIsLoading = false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching categories.'});
      },
      complete: () => {
        this.updateTagStatusSpamControl.splice(this.updateTagStatusSpamControl.indexOf(this.updateTagStatusSpamControlData!), 1);
      }
    });
  }

  tagStatusFilter:boolean=false;
  deleteBlogCategoryDialogVisible:boolean=false;
  deleteBlogCategoryDialogData:{id:string,title:string}={id:'',title:''};
  showDeleteBlogCategoryDialog(id:string,title:string){
    this.deleteBlogCategoryDialogVisible=true;
    this.deleteBlogCategoryDialogData.id=id;
    this.deleteBlogCategoryDialogData.title=title;
  }

  hideDeleteBlogCategoryDialog(){
    this.deleteBlogCategoryDialogVisible=false;
    this.deleteBlogCategoryDialogData={id:'',title:''};
  }

  deleteBlogCategory(){
    this.updateTagStatusSpamControl.push(this.deleteBlogCategoryDialogData.id);
    this.blogCategoriesCrudService.deleteBlogCategory({id:this.deleteBlogCategoryDialogData.id}).subscribe({
      next: (response:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Category deleted successfully.'});
        this.hideDeleteBlogCategoryDialog();
        this.getAllBlogCategories();
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error deleting category.'});
      },
      complete: () => {
        this.hideDeleteBlogCategoryDialog();
      }
    });
    
  }

  
  updateTagStatusSpamControl:string[]=[];
  updateTagStatusSpamControlData:string|undefined;

  updateTagStatus(id:string){
    this.updateTagStatusSpamControlData=id;
    this.updateTagStatusSpamControl.push(id);
    this.blogCategoriesCrudService.updateBlogCategoryStatus({id}).subscribe({
      next: (response:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Category status updated successfully.'});
        this.getAllBlogCategories();
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error updating category status.'});
      }
    });
  }
}
