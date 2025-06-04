import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { BlogCategoriesCrudService } from '../../../../../../services/apps/blogApp/blog-categories-crud.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-tag',
  imports: [CommonModule,FileUploadModule,ButtonModule,CardModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './create-new-tag.component.html',
  styleUrl: './create-new-tag.component.scss',
})
export class CreateNewTagComponent implements OnInit {

  constructor(private messageService: MessageService, private blogCategoriesCrudService:BlogCategoriesCrudService, private formBuilder:FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.createNewTagFormData=this.formBuilder.group({
      title:[null,Validators.required],
      description:[null, Validators.required],
      meta:[null, Validators.required],
      image:[null]
    });
  }

  createNewTagFormData!:FormGroup;

  createTag(): void {
    if (this.createNewTagFormData.valid) {
      this.createNewTagFormData.patchValue({
        image: this.createNewTagFormData.value.image,
        meta: this.createNewTagFormData.value.meta,
        title: this.createNewTagFormData.value.title,
        description: this.createNewTagFormData.value.description
      });

      this.blogCategoriesCrudService.createNewBlogCategory(this.createNewTagFormData.value).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        },
        complete: () => {
          this.createNewTagFormData.reset();
          this.router.navigate(['/create/post']);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tag created successfully' });
        }
      });
    }
    else this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please check the fields.' });
  }



  // uploadedFiles: File[] = [];

  // onUpload(event: UploadEvent) {
  //   this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });

    
  //   // this.blogCategoriesCrudService.createNewBlogCategoryImage(this.slug).subscribe({
  //   //   next: (response:any) => {
  //   //     console.log(response);
  //   //   },
  //   //   error: (error:any) => {
  //   //     console.log(error);
  //   //   }
  //   // });

  //   this.blogCategoriesCrudService.createNewBlogCategoryImage(this.formData).subscribe({
  //     next: (response:any) => {
  //       console.log(response);
  //     },
  //     error: (error:any) => {
  //       console.log(error);
  //     }
  //   });
  // }

  // onFileSelect(event: any) {
  //   if (event.formData) {
  //     event.formData.append('slug', this.slug.slug);
  //     this.formData = event.formData;
  //   }
  // }

  // slug = {slug:'test-category-title'};
  // formData:any;
  // uploadCustomWithTagData(event: any) {    
  //   const file = event.files[0];
  //   const formData: FormData = new FormData();
  //   formData.append('slug', this.slug.slug);
  //   formData.append('tagImage', file);

  //   for (let pair of formData.entries()) {
  //     console.log(`${pair[0]}: ${pair[1]}`);
  //   }
    
  //   this.blogCategoriesCrudService.createNewBlogCategoryImage(formData).subscribe({
  //     next: (response:any) => {
  //       console.log(response);
  //     },
  //     error: (error:any) => {
  //       console.log(error);
  //     }
  //   });
  // }
}
