import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IBlogCategoryResponseListData, IGetAllBlogCategoriesRequestDto } from '../../../../../models/apps/blogApp/blogPosts/blogCategoriesCrudModel';
import { BlogCategoriesCrudService } from '../../../../../services/apps/blogApp/blog-categories-crud.service';
import { Table } from 'primeng/table';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { BlogLibrariesService } from '../../../../../services/apps/blogApp/blog-libraries.service';
import { IBooleanResponse } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { AuthCrudService } from '../../../../../services/users/auths/auth-crud.service';

@Component({
  selector: 'app-blog-categories-list',
  imports: [CommonModule, TableModule, PaginatorModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, RouterModule, CardModule, DividerModule, TooltipModule ],
  templateUrl: './blog-categories-list.component.html',
  styleUrl: './blog-categories-list.component.scss'
})
export class BlogCategoriesListComponent implements OnInit{

  constructor(private blogCategoriesCrudService: BlogCategoriesCrudService, private router:Router, private location:Location, private titleService:Title, private messageService:MessageService, private blogLibrariesService:BlogLibrariesService, private authCrudService:AuthCrudService){}

  ngOnInit(): void {
    this.titleService.setTitle("Tags - c01splace");
      this.getAllBlogCategories();
  }

  environmentApiImageUrl:string=environment.apiImageUrl;

  locationBack(){
    this.location.back();
  }

  getAllBlogCategoriesData:IGetAllBlogCategoriesRequestDto={page:1,limit:10};
  blogCategories: IBlogCategoryResponseListData = {} as IBlogCategoryResponseListData;
  blogCategoriesIsLoading : boolean = false;
  getAllBlogCategories(){
      this.blogCategoriesIsLoading = true;
      this.blogCategoriesCrudService.getAllBlogCategories(this.getAllBlogCategoriesData).subscribe({
          next: (res:IBlogCategoryResponseListData) => {
              this.blogCategories = res;          
              this.blogCategories.data = this.blogCategories.data.filter(category => category.status);
              this.blogCategoriesIsLoading = false;
          },
          error: (error:any) => {
              this.blogCategoriesIsLoading = false;
          },
          complete: () => {
            this.blogCategoriesIsLoading = false;
            this.followTagButtonSpamControl.splice(this.followTagButtonSpamControl.indexOf(this.followTagButtonSpamControlData!), 1);
          }
      });
  }

  loadMoreTagButtonVisible:boolean=true;
  getAllBlogCategoriesWithScroll(){
    this.blogCategoriesIsLoading=true;
    this.getAllBlogCategoriesData.page++;
    this.blogCategoriesCrudService.getAllBlogCategories(this.getAllBlogCategoriesData).subscribe({
      next: (res:IBlogCategoryResponseListData) => {
        if(res.data)
          this.blogCategories.data.push(...res.data.filter(category => category.status));
        else {
          this.messageService.add({severity:'warn', summary:'No more categories', detail:'No more categories to load.'});
        }
        this.blogCategoriesIsLoading=false;

        if(!res.data){
          this.loadMoreTagButtonVisible=false;
        }
      },
      error: (error:any) => {
        this.blogCategoriesIsLoading=false;
      },
      complete: () => {
        this.blogCategoriesIsLoading=false;
      }
    });
  }

  goToBlogCategoryContent(slug:string){
      this.router.navigate(['/tag/', slug]);
  }
  
  followTagButtonSpamControl:string[] = [];
  followTagButtonSpamControlData:string|undefined;
  followTag(tagID:string){
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.followTagButtonSpamControlData=tagID;
    this.followTagButtonSpamControl.push(tagID);
    this.blogLibrariesService.createNewFollowingTagService({tagID}).subscribe({
      next: (res:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Tag followed successfully'});
        this.getAllBlogCategories();
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to follow tag'});
      },
      complete: () => {
        this.getAllBlogCategories();
      }
    });
  }
  unfollowTag(tagID:string){
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.followTagButtonSpamControlData=tagID;
    this.followTagButtonSpamControl.push(tagID);
    this.blogLibrariesService.updateFollowingTagStatusService({tagID}).subscribe({
      next: (res:IBooleanResponse) => {
        this.messageService.add({severity: 'info', summary:'Success', detail:'Tag unfollowed successfully'});
        this.getAllBlogCategories();
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Failed to unfollow tag'});
      },
      complete: () => {
        this.getAllBlogCategories();
      }
    })
  }

}