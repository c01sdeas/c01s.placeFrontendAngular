import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ICreateNewCommentRequestDto } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { ICommentResponseDto } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { BlogPostsCrudService } from '../../../../../services/apps/blogApp/blog-posts-crud.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthCrudService } from '../../../../../services/users/auths/auth-crud.service';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-comment-thread',
  imports: [CommonModule, ButtonModule, FormsModule, TextareaModule, DividerModule],
  templateUrl: './comment-thread.component.html',
  styleUrl: './comment-thread.component.scss',
  standalone: true,
})
export class CommentThreadComponent {

  constructor(private blogPostService:BlogPostsCrudService, private messageService:MessageService, private location:Location, private router:Router, private authCrudService:AuthCrudService){}

  @Input() comment: any;
  @Input() blogPostID: string="";
  @Input() sessionUsername: string="";

  findAndAddReply(comments: any[], parentID: string, newReply: any): boolean {
    for (let comment of comments) {
      if (comment._id === parentID) {
        comment.replies = comment.replies || [];
        comment.replies.unshift(newReply);
        return true; // bulundu
      }
      if (comment.replies && comment.replies.length > 0) {
        const found = this.findAndAddReply(comment.replies, parentID, newReply);
        if (found) return true; // iç içe bulundu
      }
    }
    return false; // hiçbir yerde bulunamadı
  }

  createNewCommentData:ICreateNewCommentRequestDto= {} as ICreateNewCommentRequestDto;
    createNewComment(){
      
      if(this.createNewCommentData.comment=="" || this.createNewCommentData.comment==null || this.createNewCommentData.comment==undefined){
        this.messageService.add({severity:'error', summary:'Error!', detail:'Comment is required.'});
        return;
      }
      
      
      this.blogPostService.createNewCommentService(this.createNewCommentData).subscribe({
        next: (response:ICommentResponseDto) => {
          this.messageService.add({severity:'success', summary: 'Success!', detail:'Comment created successfully.'});
          this.findAndAddReply([this.comment], response.data.parentID!, response.data);
        },
        error: (error:any) => {
          (error);
          this.messageService.add({severity:'error', summary:'Error!', detail:'Error creating comment.'});
          if(error.status==401 || this.sessionUsername=="" || this.sessionUsername==null || this.sessionUsername==undefined){
            this.authCrudService.returnUrl = this.location.path();
            this.router.navigateByUrl('/auth/login');
          }
        },
        complete: () => {
          this.createNewCommentData= {} as ICreateNewCommentRequestDto;
          this.hideReplyCommentDialog();
        }
      });
    }
  replyCommentDialogVisibleID:string="";
  showReplyCommentDialog(commentID:string){
    this.createNewCommentData.blogPostID=this.blogPostID;
    this.createNewCommentData.username=this.sessionUsername;
    this.createNewCommentData.parentID=commentID;
    this.replyCommentDialogVisibleID=commentID;
  }

  hideReplyCommentDialog(){
    this.replyCommentDialogVisibleID="";
    this.createNewCommentData= {} as ICreateNewCommentRequestDto;
  }
}
