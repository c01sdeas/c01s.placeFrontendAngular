import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { IBlogLibraryListResponseDto, IFollowingTagListResponseDto } from '../../../../../models/apps/blogApp/blogLibraries/blogLibrariesResponseModel';
import { ICreateNewBlogLibraryRequestDto, ICreateNewBlogPostInLibraryRequestDto, IGetAllBlogLibrariesByUsernameRequestDto, IGetAllFollowingTagsByUsernameRequestDto, IUpdateBlogLibraryStatusRequestDto } from '../../../../../models/apps/blogApp/blogLibraries/blogLibrariesRequestModel';
import { IBooleanResponse } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { MessageService } from 'primeng/api';
import { AuthCrudService } from '../../../../../services/users/auths/auth-crud.service';
import { BlogLibrariesService } from '../../../../../services/apps/blogApp/blog-libraries.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-libraries-list',
  imports: [CommonModule, CardModule, ButtonModule, InputTextModule, TableModule, DividerModule, SplitButtonModule, FormsModule, RouterLink, DialogModule, TooltipModule],
  templateUrl: './blog-libraries-list.component.html',
  styleUrl: './blog-libraries-list.component.scss'
})
export class BlogLibrariesListComponent {
  
  constructor(private router:Router, private blogLibrariesService:BlogLibrariesService, private authCrudService:AuthCrudService, private location:Location, private messageService:MessageService, private titleService:Title) {}

  ngOnInit(): void {
    this.titleService.setTitle("Libraries - c01splace");
    this.temporaryblogPostID=this.blogLibrariesService.temporarySaveToLibraryData;
    this.getSessionUsername();
  }

  locationBack(){
    this.location.back();
  }

  temporaryblogPostID:string="";

  sessionUsername:string="";
  getSessionUsername(){
    if (!localStorage.getItem('authorization')) {
      return;
    }
    this.authCrudService._signedInData.subscribe(response=>{
      if(response){
        this.sessionUsername=response.data.username;
        this.getAllBlogLibrariesByUsername();
      }
    });
  }

  blogLibrarySettingsItems:MenuItem[] = [
    {
      label:'Update',
      icon:'pi pi-pencil',
      
    },
    {
      label:'Delete',
      icon:'pi pi-trash',
      
    }
  ];

  newLibraryName:string="";
  newLibraryDescription:string="";
  blogLibraries:IBlogLibraryListResponseDto = {} as IBlogLibraryListResponseDto;
  blogLibrariesIsLoading:boolean=false;
  getAllBlogLibrariesByUsername(){
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined || this.sessionUsername == "" || this.sessionUsername == null || this.sessionUsername == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.blogLibrariesIsLoading=true;

    const requestData:IGetAllBlogLibrariesByUsernameRequestDto = {blogPostID:this.temporaryblogPostID};
    
    this.blogLibrariesService.getAllBlogLibrariesByUsernameService(requestData).subscribe({
      next: (response:IBlogLibraryListResponseDto) => {
        this.blogLibraries = {...response};
        this.blogLibraries.data = [];

        if(response.data){
          this.blogLibraries.data = response.data.filter(library=>library.status);
        }
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching libraries.'});
      },
      complete: () => {
        this.blogLibrariesIsLoading=false;
      }
    });
  }

  createNewLibraryVisible:boolean=false;
  showCreateNewLibrary(){
    this.createNewLibraryVisible=true;
  }
  hideCreateNewLibrary(){
    this.createNewLibraryVisible=false;
  }

  createNewLibraryRequestData:ICreateNewBlogLibraryRequestDto = {
    title:this.newLibraryName,
    description:this.newLibraryDescription,
  };
  createNewLibrary(){
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined || this.sessionUsername == "" || this.sessionUsername == null || this.sessionUsername == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    
    this.blogLibrariesService.createNewBlogLibraryService(this.createNewLibraryRequestData).subscribe({
      next: (response:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Library created successfully.'});
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error creating library.'});
      },
      complete: () => {
        this.getAllBlogLibrariesByUsername();
        this.hideCreateNewLibrary();
      }
    });
    
  }

  saveToLibraryButtonLoading:boolean=false;
  saveToLibrary(libraryID:string){
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined || this.sessionUsername == "" || this.sessionUsername == null || this.sessionUsername == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }

    this.saveToLibraryButtonLoading=true;
    const requestData:ICreateNewBlogPostInLibraryRequestDto = {libraryID, blogPostID:this.temporaryblogPostID};
    this.blogLibrariesService.createNewBlogPostInLibraryService(requestData).subscribe({
      next: (response:IBooleanResponse) => {
        this.blogLibrariesIsLoading=false;
        
      },
      error: (error:any) => {
        this.blogLibrariesIsLoading=false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error saving to library.'});
      },
      complete: () => {
        this.getAllBlogLibrariesByUsername();
        this.blogLibrariesService.temporarySaveToLibraryData="";
        this.authCrudService.returnUrl="";
        this.saveToLibraryButtonLoading=false;
      }
    });
  } 

  removeFromLibrary(libraryID:string){
    
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined || this.sessionUsername == "" || this.sessionUsername == null || this.sessionUsername == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.saveToLibraryButtonLoading=true;
    this.blogLibrariesService.deleteBlogPostInLibraryService({libraryID, blogPostID:this.temporaryblogPostID}).subscribe({
      next: (response:IBooleanResponse) => {
        this.blogLibrariesIsLoading=false;
      },
      error: (error:any) => {
        this.blogLibrariesIsLoading=false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error removing from library.'});
      },
      complete: () => {
        this.getAllBlogLibrariesByUsername();
        this.saveToLibraryButtonLoading=false;
      }
    });
  }

  doneForSaveToLibrary(){
    this.blogLibrariesService.temporarySaveToLibraryData="";
    if (this.authCrudService.returnUrl.length > 0) this.router.navigateByUrl(this.authCrudService.returnUrl);
    else this.location.back();
    this.authCrudService.returnUrl="";
    this.saveToLibraryButtonLoading=false;
  }

  deleteLibraryButtonSpamControl:boolean=false;
  deleteLibraryDialogVisible:boolean=false;
  deleteLibraryDialogData:IUpdateBlogLibraryStatusRequestDto={} as IUpdateBlogLibraryStatusRequestDto;
  showDeleteLibraryDialog(libraryID:string){
    this.deleteLibraryDialogData.id=libraryID;
    this.deleteLibraryDialogVisible=true;
    
  }
  hideDeleteLibraryDialog(){
    this.deleteLibraryDialogVisible=false;
  }

  deleteLibrary(){
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined || this.sessionUsername == "" || this.sessionUsername == null || this.sessionUsername == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.deleteLibraryButtonSpamControl=true;
    this.blogLibrariesService.updateBlogLibraryStatusService(this.deleteLibraryDialogData).subscribe({
      next: (response:IBooleanResponse) => {
        this.blogLibrariesIsLoading=false;
      },
      error: (error:any) => {
        this.blogLibrariesIsLoading=false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error deleting library.'});
      },
      complete: () => {
        this.getAllBlogLibrariesByUsername();
        this.hideDeleteLibraryDialog();
        this.deleteLibraryButtonSpamControl=false;
      }
    });
  }

  followedTagsDialogVisible:boolean=false;
  showFollowedTagsDialog(){
    this.getAllFollowingTagsByUsername();
    this.followedTagsDialogVisible=true;
  }
  hideFollowedTagsDialog(){
    this.followedTagsDialogVisible=false;
  }

  followedTags:IFollowingTagListResponseDto={} as IFollowingTagListResponseDto;
  followedTagsIsLoading:boolean=false;
  getAllFollowingTagsByUsernameRequestData:IGetAllFollowingTagsByUsernameRequestDto={page:1, limit:10};
  getAllFollowingTagsByUsername(){
    
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined || this.sessionUsername == "" || this.sessionUsername == null || this.sessionUsername == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.followedTagsIsLoading=true;
    this.blogLibrariesService.getAllFollowingTagsByUsernameService(this.getAllFollowingTagsByUsernameRequestData).subscribe({
      next: (response:IFollowingTagListResponseDto) => {
        this.followedTags=response;
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching followed tags.'});
      },
      complete: () => {
        this.followedTagsIsLoading=false;
      }
    });
  }

  removeFromFollowedTagsButtonSpamControl:boolean=false;
  removeFromFollowedTags(tagID:string){
    if(localStorage.getItem('authorization') == null || localStorage.getItem('authorization') == undefined || this.sessionUsername == "" || this.sessionUsername == null || this.sessionUsername == undefined){
      this.authCrudService.returnUrl = this.location.path();
      this.router.navigateByUrl('/auth/login');
      return;
    }
    this.removeFromFollowedTagsButtonSpamControl=true;
    this.blogLibrariesService.updateFollowingTagStatusService({tagID}).subscribe({
      next: (response:IBooleanResponse) => {
        this.followedTagsIsLoading=false;
        this.messageService.add({severity:'success', summary:'Success', detail:'Tag removed from followed tags.'});
        console.log(response);
        
      },
      error: (error:any) => {
        this.followedTagsIsLoading=false;
        this.messageService.add({severity:'error', summary:'Error', detail:'Error removing from followed tags.'});
      },
      complete: () => {
        this.getAllFollowingTagsByUsername();
        this.removeFromFollowedTagsButtonSpamControl=false;
      }
    });
  }

  
  
}
