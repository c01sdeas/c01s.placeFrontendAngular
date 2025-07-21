import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IBlogListResponseDto, IBooleanResponse, IGetBlogPostByCategorySlugRequestDto } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { BlogPostsCrudService } from '../../../../../services/apps/blogApp/blog-posts-crud.service';
import { IBlogCategoryResponseDto, IGetBlogPostCategoryBySlugRequestDto } from '../../../../../models/apps/blogApp/blogPosts/blogCategoriesCrudModel';
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
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { AuthCrudService } from '../../../../../services/users/auths/auth-crud.service';
import { BlogLibrariesService } from '../../../../../services/apps/blogApp/blog-libraries.service';
import { IUserRolesResponseDto } from '../../../../../models/auths/authCrudModel';
import { UserCrudService } from '../../../../../services/users/user-crud.service';

@Component({
  selector: 'app-blog-category-content',
  imports: [CommonModule, ButtonModule, CardModule, DividerModule, RouterModule, TooltipModule, MenuModule, DialogModule],
  templateUrl: './blog-category-content.component.html',
  styleUrl: './blog-category-content.component.scss'
})
export class BlogCategoryContentComponent implements OnInit {
    
    constructor(private router:Router, private activatedRoute:ActivatedRoute, private blogPostService:BlogPostsCrudService, private blogCategoryService:BlogCategoriesCrudService, private location:Location, private titleService:Title, private messageService:MessageService, private authCrudService:AuthCrudService, private blogLibrariesService:BlogLibrariesService, private userCrudService:UserCrudService, private meta:Meta) { }

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

    getAllCategoriesBySlugData:IGetBlogPostCategoryBySlugRequestDto = {limit: 10, page: 1, slug: ''} as IGetBlogPostCategoryBySlugRequestDto;
    blogPostCategoryBySlug:IBlogCategoryResponseDto = {} as IBlogCategoryResponseDto;
    getBlogPostCategoryBySlug() {
        this.blogCategoryService.getBlogPostCategoryBySlug(this.getAllCategoriesBySlugData).subscribe({
            next: (response:IBlogCategoryResponseDto) => {
                this.blogPostCategoryBySlug = response;
                if (response.data.status === false) this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
                
                this.titleService.setTitle(this.blogPostCategoryBySlug.data.title+' - c01splace');
                this.followTagButtonSpamControl=false;
                this.getSessionUsername();
            },
            error: (error:any) => {
                this.router.navigateByUrl('/error/notfound');
            },
            complete: () => {
                this.updateTagStatusSpamControl=false;
            }
        });
    }

    postsIsLoading:boolean=false;
    blogList:IBlogListResponseDto = {} as IBlogListResponseDto;
    getAllBlogPostsByCategorySlugData:IGetBlogPostByCategorySlugRequestDto = {limit: 10, page: 1, slug: ''} as IGetBlogPostByCategorySlugRequestDto;
    getAllBlogPostsByCategorySlug() {
        this.postsIsLoading=true;
        this.blogPostService.getAllBlogPostsByCategorySlug(this.getAllBlogPostsByCategorySlugData).subscribe({
            next: (response:IBlogListResponseDto) => {
                this.blogList={...response};
                this.blogList.data=[];
                if (response.data) {
                    response.data.filter((blog)=>{
                        if(blog.status){
                            this.blogList.data.push(blog);
                        }
                    });
                }
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

    menuItems:MenuItem[] = [];

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
        next: (response:IBlogListResponseDto) => {
            this.blogList={...response};
            this.blogList.data=[];
            if(response.data){
                response.data.filter((blog)=>{
                    if(blog.status){
                        this.blogList.data.push(blog);
                    }
                });
            }
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

    sessionCheck(){
        if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined){
            this.authCrudService.returnUrl = this.location.path();
            this.router.navigateByUrl('/auth/login');
            return;
        }
    }

    sessionUsername:string="";
    getSessionUsername(){
        if (!localStorage.getItem('authorization')) {
            return;
        }
        this.authCrudService._signedInData.subscribe(response=>{
            if(response){
                this.sessionUsername=response.data.username;
                this.getUserRolesData();
            }
        });
    }

    userRolesData:IUserRolesResponseDto = {} as IUserRolesResponseDto;
    getUserRolesData(){
        this.userCrudService.getUserRolesData({username:this.sessionUsername}).subscribe({
            next: (response:IUserRolesResponseDto) => {
                this.userRolesData = response;

                console.log(response);
                

                if ((response.data.includes('admin') || response.data.includes('moderator')) && this.blogPostCategoryBySlug.data.status) {
                    this.menuItems = [
                        {
                            label: 'Reject',
                            icon: 'pi pi-times',
                            command: () => {
                                this.showUpdateTagStatusDialog();
                            }
                        },
                        // {
                        //     label: 'Delete',
                        //     icon: 'pi pi-trash'
                        // }
                    ];
                } else {
                    this.menuItems = [
                        {
                            label: 'Approve',
                            icon: 'pi pi-check',
                            command: () => {
                                this.showUpdateTagStatusDialog();
                            }
                        },
                        // {
                        //     label: 'Delete',
                        //     icon: 'pi pi-trash'
                        // }
                    ];
                }
            },
            error: (error:any) => {
                this.userRolesData = {} as IUserRolesResponseDto;
            }
        });
    }
    

    followTagButtonSpamControl:boolean=false;
    followTag(tagID:string){
        console.log(tagID);
        
        if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined){
            this.authCrudService.returnUrl = this.location.path();
            this.router.navigateByUrl('/auth/login');
            return;
        }
        this.followTagButtonSpamControl=true;
        this.blogLibrariesService.createNewFollowingTagService({tagID}).subscribe({
        next: (res:IBooleanResponse) => {
            this.messageService.add({severity:'success', summary:'Success', detail:'Tag followed successfully'});
            this.getBlogPostCategoryBySlug();
        },
        error: (error:any) => {
            this.messageService.add({severity:'error', summary:'Error', detail:'Failed to follow tag'});
        },
        complete: () => {
            this.getBlogPostCategoryBySlug();
        }
        });
    }
    unfollowTag(tagID:string){
        if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined){
            this.authCrudService.returnUrl = this.location.path();
            this.router.navigateByUrl('/auth/login');
            return;
        }
        this.followTagButtonSpamControl=true;
        this.blogLibrariesService.updateFollowingTagStatusService({tagID}).subscribe({
        next: (res:IBooleanResponse) => {
            this.messageService.add({severity: 'info', summary:'Success', detail:'Tag unfollowed successfully'});
            this.getBlogPostCategoryBySlug();
        },
        error: (error:any) => {
            this.messageService.add({severity:'error', summary:'Error', detail:'Failed to unfollow tag'});
        },
        complete: () => {
            this.getBlogPostCategoryBySlug();
        }
        })
    }

    updateTagStatusDialogVisible:boolean=false;
    showUpdateTagStatusDialog(){
        this.updateTagStatusDialogVisible=true;
    }
    hideUpdateTagStatusDialog(){
        this.updateTagStatusDialogVisible=false;
    }

    updateTagStatusSpamControl:boolean=false;
    updateTagStatus(){
        if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined){
            this.authCrudService.returnUrl = this.location.path();
            this.router.navigateByUrl('/auth/login');
            return;
        }
        this.updateTagStatusSpamControl=true;
        this.blogCategoryService.updateBlogCategoryStatus({id:this.blogPostCategoryBySlug.data.id}).subscribe({
        next: (res:IBooleanResponse) => {
            this.messageService.add({severity:'info', summary:'Success', detail:'Tag status updated successfully'});
        },
        error: (error:any) => {
            this.messageService.add({severity:'error', summary:'Error', detail:'Failed to update tag status'});
        },
        complete: () => {
            this.getBlogPostCategoryBySlug();
        }
        });
    }

    deleteTag(){
        if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined){
            this.authCrudService.returnUrl = this.location.path();
            this.router.navigateByUrl('/auth/login');
            return;
        }
        this.blogCategoryService.deleteBlogCategory({id:this.blogPostCategoryBySlug.data.id}).subscribe({
        next: (res:IBooleanResponse) => {
            this.messageService.add({severity:'success', summary:'Success', detail:'Tag deleted successfully'});
            this.getBlogPostCategoryBySlug();
        },
        error: (error:any) => {
            this.messageService.add({severity:'error', summary:'Error', detail:'Failed to delete tag'});
        },
        complete: () => {
            this.getBlogPostCategoryBySlug();
        }
        });
    }
    
    
}
