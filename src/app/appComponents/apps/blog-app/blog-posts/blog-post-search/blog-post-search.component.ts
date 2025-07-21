import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BlogPostsCrudService } from '../../../../../services/apps/blogApp/blog-posts-crud.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { IBlogListResponseDto } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { DividerModule } from 'primeng/divider';
import { BlogLibrariesService } from '../../../../../services/apps/blogApp/blog-libraries.service';
import { IBooleanResponse } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-blog-post-search',
  imports: [CommonModule, InputTextModule, ButtonModule, ReactiveFormsModule, IconFieldModule, InputIconModule, DividerModule, RouterLink],
  templateUrl: './blog-post-search.component.html',
  styleUrl: './blog-post-search.component.scss'
})
export class BlogPostSearchComponent {

  constructor (private blogPostsCrudService:BlogPostsCrudService, private blogLibrariesService:BlogLibrariesService, private router:Router) {}

  environmentApiImageUrl:string = environment.apiImageUrl;

  searchForm:FormGroup = new FormGroup({
    searchText:new FormControl('',[Validators.required])
  })

  blogPostsSearchIsLoading:boolean = false;
  blogPostsSearchData:IBlogListResponseDto = {} as IBlogListResponseDto;
  searchInBlogPosts(){
    this.blogPostsSearchIsLoading = true;
    this.blogPostsCrudService.searchInBlogPosts({data:this.searchForm.value.searchText}).subscribe((response) => {
      this.blogPostsSearchData = response;
      this.blogPostsSearchIsLoading = false;
    })
  }

  saveToLibrary(blogPostID:string){
    this.blogLibrariesService.temporarySaveToLibraryData = blogPostID;
    this.router.navigate(['/user/library/list']);
  }

}
