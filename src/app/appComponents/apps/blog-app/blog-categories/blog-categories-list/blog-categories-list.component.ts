import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IBlogCategoryResponseData, IBlogCategoryResponseListData, IGetAllBlogCategoriesRequestData } from '../../../../../services/apps/models/apps/blogApp/blogCategoriesCrudModel';
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

@Component({
  selector: 'app-blog-categories-list',
  imports: [CommonModule, TableModule, PaginatorModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, RouterModule, CardModule, DividerModule, TooltipModule ],
  templateUrl: './blog-categories-list.component.html',
  styleUrl: './blog-categories-list.component.scss'
})
export class BlogCategoriesListComponent implements OnInit{

  constructor(private blogCategoriesCrudService: BlogCategoriesCrudService, private router:Router, private location:Location, private titleService:Title, private messageService:MessageService){}

  ngOnInit(): void {
      this.getAllBlogCategories();
  }

  environmentApiImageUrl:string=environment.apiImageUrl;

  locationBack(){
    this.location.back();
  }

  getAllBlogCategoriesData:IGetAllBlogCategoriesRequestData={page:1,limit:10};
  blogCategories: IBlogCategoryResponseListData = {} as IBlogCategoryResponseListData;
  blogCategoriesIsLoading : boolean = false;
  getAllBlogCategories(){
      this.blogCategoriesIsLoading = true;
      this.blogCategoriesCrudService.getAllBlogCategories(this.getAllBlogCategoriesData).subscribe({
          next: (res:IBlogCategoryResponseListData) => {
              this.blogCategories = res;
              console.log(res);
              
              // this.blogCategories.data = this.blogCategories.data.filter((category:IBlogCategoryResponseListData) => category.status);
              this.blogCategoriesIsLoading = false;
              this.titleService.setTitle("Tags - c01splace");
          },
          error: (error:any) => {
              this.blogCategoriesIsLoading = false;
          },
      });
  }

  loadMoreTagButtonVisible:boolean=true;
  getAllBlogCategoriesWithScroll(){
    this.blogCategoriesIsLoading=true;
    this.getAllBlogCategoriesData.page++;
    this.blogCategoriesCrudService.getAllBlogCategories(this.getAllBlogCategoriesData).subscribe({
      next: (res:IBlogCategoryResponseListData) => {
        if(res.data)
          this.blogCategories.data.push(...res.data);
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

  @ViewChild('dt') dt!: Table;

  onGlobalFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (this.dt) {
      this.dt.filterGlobal(value, 'contains');
    } 
  }

  clear(table: Table) {
      table.clear();
  }
}