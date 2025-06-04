import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BlogPostsCrudService } from '../../../services/apps/blogApp/blog-posts-crud.service';
import { UserCrudService } from '../../../services/users/user-crud.service';
import { IBlogResponseListData, IGetAllBlogPostsByUsernameRequestData } from '../../../services/apps/models/apps/blogApp/blogPostsCrudModel';
import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-blog-post-list-from-user',
  imports: [CommonModule, RouterModule, ButtonModule, DividerModule, MenuModule],
  templateUrl: './blog-post-list-from-user.component.html',
  styleUrl: './blog-post-list-from-user.component.scss'
})
export class BlogPostListFromUserComponent implements OnInit{
  
  constructor (private messageService:MessageService, private blogPostService:BlogPostsCrudService, private userCrudService:UserCrudService, private route:ActivatedRoute, private location:Location, private router:Router) {}

  ngOnInit(): void {
    this.getAllBlogPostsByUsername();
}

  menuItems:MenuItem[] = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil'
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash'
    }
  ];

  goToPostDetail(categorySlug:string,postSlug:string) {
    this.router.navigate(['/tag', categorySlug, 'post', postSlug]);
  }

  locationBack(){
    this.location.back();
  }
  
  writer:string="";

  environmentApiImageUrl:string=environment.apiImageUrl;

  postsIsLoading:boolean = false;

  blogList:IBlogResponseListData ={} as IBlogResponseListData;
  getAllBlogPostsByUsernameRequestData:IGetAllBlogPostsByUsernameRequestData = {username:"", page:1, limit:10};
  getAllBlogPostsByUsername(){
    this.postsIsLoading = true;
    this.getAllBlogPostsByUsernameRequestData.username = this.route.snapshot.params['username'];
    this.blogPostService.getAllBlogPostsByUsername(this.getAllBlogPostsByUsernameRequestData).subscribe({
      next: (res:IBlogResponseListData) => {
        this.blogList = res;
        if (res.data && res.data.length>0) {
          this.writer = res.data[0].userNickname;
        }
        this.postsIsLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.postsIsLoading = false;
      }
    })
  }

  loadMorePostButtonVisible:boolean=true;
  getAllBlogPostsWithScroll(){
      this.postsIsLoading=true;
      this.getAllBlogPostsByUsernameRequestData.page++;
      this.blogPostService.getAllBlogPostsByUsername(this.getAllBlogPostsByUsernameRequestData).subscribe({
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
