import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IBlogResponseListData, IGetBlogPostByCategorySlugRequestData } from '../../../../../services/apps/models/apps/blogApp/blogPostsCrudModel';
import { BlogPostsCrudService } from '../../../../../services/apps/blogApp/blog-posts-crud.service';
import { IBlogCategoryResponseData, IBlogCategoryResponseListData, IGetBlogPostCategoryBySlugRequestData } from '../../../../../services/apps/models/apps/blogApp/blogCategoriesCrudModel';
import { BlogCategoriesCrudService } from '../../../../../services/apps/blogApp/blog-categories-crud.service';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-blog-category-content',
  imports: [CommonModule, ButtonModule, CardModule, DividerModule, RouterModule, TooltipModule, MenuModule, DialogModule],
  templateUrl: './blog-category-content.component.html',
  styleUrl: './blog-category-content.component.scss'
})
export class BlogCategoryContentComponent implements OnInit {
    
    constructor(private router:Router, private activatedRoute:ActivatedRoute, private blogPostService:BlogPostsCrudService, private blogCategoryService:BlogCategoriesCrudService, private location:Location, private titleService:Title, private messageService:MessageService) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(params => {
          this.getAllBlogPostsByCategorySlugData.slug = params.get('slug')!;
          this.getAllBlogPostsByCategorySlug();
          this.getAllCategoriesBySlugData.slug = params.get('slug')!;
          this.getBlogPostCategoryBySlug();
        });
    }

    environmentApiImageUrl:string=environment.apiImageUrl;

    locationBack(){
        this.location.back();
    }

    getAllCategoriesBySlugData:IGetBlogPostCategoryBySlugRequestData = {limit: 10, page: 1, slug: ''} as IGetBlogPostCategoryBySlugRequestData;
    blogPostCategoryBySlug:IBlogCategoryResponseData = {} as IBlogCategoryResponseData;
    getBlogPostCategoryBySlug() {
        this.blogCategoryService.getBlogPostCategoryBySlug(this.getAllCategoriesBySlugData).subscribe({
            next: (response:IBlogCategoryResponseData) => {
                this.blogPostCategoryBySlug = response;
                this.titleService.setTitle(this.blogPostCategoryBySlug.data.title+' - c01splace');                
            },
            error: (error:any) => {
                this.router.navigateByUrl('/error/notfound');
            }
        });
    }

    postsIsLoading:boolean=false;
    blogList:IBlogResponseListData = {} as IBlogResponseListData;
    getAllBlogPostsByCategorySlugData:IGetBlogPostByCategorySlugRequestData = {limit: 10, page: 1, slug: ''} as IGetBlogPostByCategorySlugRequestData;
    getAllBlogPostsByCategorySlug() {
        this.postsIsLoading=true;
        this.blogPostService.getAllBlogPostsByCategorySlug(this.getAllBlogPostsByCategorySlugData).subscribe({
            next: (response:IBlogResponseListData) => {
                this.blogList = response;
                this.postsIsLoading=false;
            },
            error: (error:any) => {
                this.postsIsLoading=false;
            }
        });
    }

    goToPostDetail(categorySlug:string,postSlug:string) {
        this.router.navigate(['/tag', categorySlug, 'post', postSlug]);
    }

    menuItems:MenuItem[] = [
        {
            label: 'Tag Options',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-pencil'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-trash'
                }
            ]
        }
      ];


    tagBgDialogVisible:boolean=false;
    showTagBgDialog(){
    this.tagBgDialogVisible=true;
    }
    hideTagBgDialog(){
    this.tagBgDialogVisible=false;
    }

    loadMorePostButtonVisible:boolean=true;
    getAllBlogPostsWithScroll(){
        this.postsIsLoading=true;
        this.getAllBlogPostsByCategorySlugData.page++;
        this.blogPostService.getAllBlogPostsByCategorySlug(this.getAllBlogPostsByCategorySlugData).subscribe({
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
        },
        complete: () => {
            this.postsIsLoading=false;
        }
        });
    }

    
}
