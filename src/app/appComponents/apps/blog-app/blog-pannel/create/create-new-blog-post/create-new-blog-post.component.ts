import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogCategoriesCrudService } from '../../../../../../services/apps/blogApp/blog-categories-crud.service';
import { BlogPostsCrudService } from '../../../../../../services/apps/blogApp/blog-posts-crud.service';
import { MessageService } from 'primeng/api';
import { IBlogCategoryResponseListData } from '../../../../../../services/apps/models/apps/blogApp/blogCategoriesCrudModel';
import { SelectModule } from 'primeng/select';
import { EditorModule } from 'primeng/editor';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthCrudService } from '../../../../../../services/users/auths/auth-crud.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-new-blog-post',
  imports: [CommonModule, SelectModule, EditorModule, CardModule, InputTextModule, ButtonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-new-blog-post.component.html',
  styleUrl: './create-new-blog-post.component.scss'
})
export class CreateNewBlogPostComponent implements OnInit {

  constructor(private blogPostsCrudService: BlogPostsCrudService, private blogCategoriesCrudService: BlogCategoriesCrudService, private messageService: MessageService, private formBuilder:FormBuilder, private authCrudService:AuthCrudService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.createNewPostFormData=this.formBuilder.group({
      image:[null],
      meta:[null,Validators.required],
      title:[null,Validators.required],
      intro:[null,Validators.required],
      content:[null,Validators.required],
      categoryID:[null,Validators.required],
      username:[null,Validators.required]
    });
    this.getSessionUserData();
  }

  getSessionUserData(): void {
    this.authCrudService._signedInData.subscribe({
      next: (response) => {
        if(response){
          this.createNewPostFormData.patchValue({
            username: response.data.username
          });
        }
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    });
  }
    

  categories: IBlogCategoryResponseListData = {} as IBlogCategoryResponseListData;
  getAllCategories(): void {
    this.blogCategoriesCrudService.getAllBlogCategories({page: 1, limit: 10}).subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    });
  }

  createNewPostFormData!:FormGroup;

  createPost(): void {
    if (this.createNewPostFormData.valid) {
      this.createNewPostFormData.patchValue({
        categoryID: this.createNewPostFormData.value.categoryID,
        image: this.createNewPostFormData.value.image,
        meta: this.createNewPostFormData.value.meta,
        title: this.createNewPostFormData.value.title,
        intro: this.createNewPostFormData.value.intro,
        content: this.createNewPostFormData.value.content,
        username: this.createNewPostFormData.value.username
      });

      this.blogPostsCrudService.createNewBlogPost(this.createNewPostFormData.value).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        },
        complete: () => {
          this.createNewPostFormData.reset();
        }
      });
    }
    else this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please check the fields.' });
  }

}
