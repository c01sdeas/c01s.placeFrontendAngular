import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogCategoriesCrudService } from '../../../../../../services/apps/blogApp/blog-categories-crud.service';
import { BlogPostsCrudService } from '../../../../../../services/apps/blogApp/blog-posts-crud.service';
import { MessageService } from 'primeng/api';
import { IBlogCategoryResponseListData } from '../../../../../../models/apps/blogApp/blogPosts/blogCategoriesCrudModel';
import { SelectModule } from 'primeng/select';
import { EditorModule } from 'primeng/editor';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthCrudService } from '../../../../../../services/users/auths/auth-crud.service';
import { RouterModule } from '@angular/router';
import { TextareaModule } from 'primeng/textarea';
import { Location } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-new-blog-post',
  imports: [CommonModule, SelectModule, EditorModule, CardModule, InputTextModule, ButtonModule, ReactiveFormsModule, RouterModule, TextareaModule, DialogModule],
  templateUrl: './create-new-blog-post.component.html',
  styleUrl: './create-new-blog-post.component.scss'
})
export class CreateNewBlogPostComponent implements OnInit {

  constructor(private blogPostsCrudService: BlogPostsCrudService, private blogCategoriesCrudService: BlogCategoriesCrudService, private messageService: MessageService, private formBuilder:FormBuilder, private authCrudService:AuthCrudService, private location:Location) { }

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

  locationBack(){
    this.location.back();
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
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message });
      }
    });
  }
    

  categories: IBlogCategoryResponseListData = {} as IBlogCategoryResponseListData;
  getAllCategories(): void {
    this.blogCategoriesCrudService.getAllBlogCategories({page: 1, limit: 10}).subscribe({
      next: (response) => {
        this.categories = response;
        this.categories.data=this.categories.data.filter((category)=>category.status);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message });
      }
    });
  }

  yourPostWillApproveDialogVisible: boolean = false;
  showYourPostWillApproveDialog(): void {
    this.yourPostWillApproveDialogVisible = true;
  }
  hideYourPostWillApproveDialog(): void {
    this.yourPostWillApproveDialogVisible = false;
  }
  
  createNewPostFormData!:FormGroup;
  createPostButtonDisabled: boolean = false;
  async createPost(): Promise<void> {
    console.log(this.createNewPostFormData.value);
    
    this.createPostButtonDisabled = true;
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

      const updatedContent = await this.sendImageToServer();
      this.createNewPostFormData.patchValue({ content: updatedContent });

      this.blogPostsCrudService.createNewBlogPost(this.createNewPostFormData.value).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message });
        },
        complete: () => {
          this.createNewPostFormData.reset();
          this.createPostButtonDisabled = false;
          this.showYourPostWillApproveDialog();
        }
      });
    }
    else{
      this.createPostButtonDisabled = false;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please check the fields.' });
    }
  }


  dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  }

  sendImageToServer(): Promise<string> {
    return new Promise((resolve) => {
      const div = document.createElement('div');
      div.innerHTML = this.createNewPostFormData.get('content')?.value || '';
      const images = div.querySelectorAll('img');
  
      let pendingUploads = 0;
  
      images.forEach((img: HTMLImageElement, index: number) => {
        const src = img.src;
        if (src.startsWith('data:image')) {
          pendingUploads++;
          const file = this.dataURLtoFile(src, `image-${Date.now()}-${index}.png`);
          const formData = new FormData();
          formData.append('image', file);
  
          this.blogPostsCrudService.createNewBlogPostImage(formData).subscribe({
            next: (response) => {
              img.src = response.data; 
            },
            error: (error) => {
              console.error('Image upload failed', error);
            },
            complete: () => {
              pendingUploads--;
              if (pendingUploads === 0) {
                resolve(div.innerHTML);
              }
            }
          });
        }
      });
  
      if (pendingUploads === 0) {
        resolve(div.innerHTML);
      }
    });
  }

    // const base64Images = this.createNewPostFormData.get('content')?.value.match(/<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/g);
    // console.log(base64Images);

    // const formDataList: FormData[] = [];

    // base64Images?.forEach((imgTag: string, index: number) => {
    //   const base64Match = imgTag.match(/src=["'](data:image\/[^"']+)["']/);
    //   if (!base64Match) return;

    //   const base64Data = base64Match[1];
    //   const byteString = atob(base64Data.split(',')[1]);
    //   const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];

    //   const ab = new ArrayBuffer(byteString.length);
    //   const ia = new Uint8Array(ab);
    //   for (let i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    //   }

    //   const blob = new Blob([ab], { type: mimeString });
    //   const formData = new FormData();
    //   formData.append('file', blob, `editor-image-${Date.now()}-${index}.png`);

    //   formDataList.push(formData);
    // });

    // formDataList.forEach((formData: FormData) => {
    //   this.blogPostsCrudService.createNewBlogPostImage(formData).subscribe({
    //     next: (response) => {
    //       this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
    //     },
    //     error: (error) => {
    //       this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message });
    //     }
    //   });
    // });

}
