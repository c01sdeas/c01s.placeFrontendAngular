import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IComment, ICommentVoteCountByUsernameResponseDto, ICreateNewCommentRequestDto, IUpdateCommentRequestDto, IUpdateCommentVoteRequestDto } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { ICommentResponseDto } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { BlogPostsCrudService } from '../../../../../services/apps/blogApp/blog-posts-crud.service';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthCrudService } from '../../../../../services/users/auths/auth-crud.service';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { IBooleanResponse } from '../../../../../models/apps/blogApp/blogPosts/blogPostsCrudModel';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-comment-thread',
  imports: [CommonModule, ButtonModule, FormsModule, TextareaModule, DividerModule, MenuModule, DialogModule],
  templateUrl: './comment-thread.component.html',
  styleUrl: './comment-thread.component.scss',
  standalone: true,
})
export class CommentThreadComponent {

  constructor(private blogPostService:BlogPostsCrudService, private messageService:MessageService, private location:Location, private router:Router, private authCrudService:AuthCrudService){}

  commentMenuItems:MenuItem[]=[];

  @Input() comment: any;
  @Input() blogPostID: string="";
  @Input() sessionUsername: string="";

  selectCommentForMenu(comment:IComment){
    if (this.sessionUsername==comment.username) {
      this.commentMenuItems=[
        {
          label: 'Edit',
          icon: 'pi pi-pencil',
          command: () => {
            this.showEditCommentDialog(comment);
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            this.showDeleteCommentDialog(comment);
          }
        }
      ];
    }
  }

  editCommentData:IComment= {} as IComment;
  editCommentDialogVisible:boolean=false;
  showEditCommentDialog(commentData:IComment){
    this.editCommentData=commentData;
    this.editCommentRequestData.id=commentData._id;
    this.editCommentRequestData.comment=commentData.comment;
    this.editCommentDialogVisible=true;
  }
  hideEditCommentDialog(){
    this.editCommentData= {} as IComment;
    this.editCommentRequestData= {} as IUpdateCommentRequestDto;
    this.editCommentDialogVisible=false;
  }

  editCommentRequestData:IUpdateCommentRequestDto= {} as IUpdateCommentRequestDto;
  editComment(){
    this.blogPostService.updateCommentService(this.editCommentRequestData).subscribe({
      next: (response:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary: 'Success!', detail:'Comment edited successfully.'});
        this.findAndUpdateComment([this.comment], this.editCommentData._id, this.editCommentRequestData.comment);
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error!', detail:'Error editing comment.'});
        if(error.status==401 || this.sessionUsername=="" || this.sessionUsername==null || this.sessionUsername==undefined){
          this.authCrudService.returnUrl = this.location.path();
          this.router.navigateByUrl('/auth/login');
        }
      },
      complete: () => {
        this.hideEditCommentDialog();
      }
    });
  }

  deleteCommentData:IComment= {} as IComment;
  deleteCommentDialogVisible:boolean=false;
  showDeleteCommentDialog(commentData:IComment){
    this.deleteCommentData=commentData;
    this.deleteCommentDialogVisible=true;
  }
  hideDeleteCommentDialog(){
    this.deleteCommentData= {} as IComment;
    this.deleteCommentDialogVisible=false;
  }
  deleteButtonSpamControl:boolean=false;
  deleteComment(){
    this.deleteButtonSpamControl=true;
    this.blogPostService.updateCommentStatusService({id:this.deleteCommentData._id}).subscribe({
      next: (response:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary: 'Success!', detail:'Comment deleted successfully.'});
        this.findAndDeleteComment([this.comment], this.deleteCommentData._id);
        this.comment={...this.comment};
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error!', detail:'Error deleting comment.'});
        if(error.status==401 || this.sessionUsername=="" || this.sessionUsername==null || this.sessionUsername==undefined){
          this.authCrudService.returnUrl = this.location.path();
          this.router.navigateByUrl('/auth/login');
        }
      },
      complete: () => {
        this.hideDeleteCommentDialog();
        this.deleteButtonSpamControl=false;
      }
    });
  }


  findAndAddReply(comments: any[], parentID: string, newReply: any): boolean {
    for (let comment of comments) {
      if (comment._id === parentID) {
        comment.replies = comment.replies || [];
        comment.replies.unshift(newReply);
        return true;
      }
      if (comment.replies && comment.replies.length > 0) {
        const found = this.findAndAddReply(comment.replies, parentID, newReply);
        if (found) return true;
      }
    }
    return false;
  }
  findAndDeleteComment(comments: any[], commentID: string): boolean {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
  
      if (comment._id === commentID) {
        comment.status = false;
        return true;
      }
  
      if (comment.replies && comment.replies.length > 0) {
        const found = this.findAndDeleteComment(comment.replies, commentID);
        if (found) {
          // Eğer replies tamamen boş kaldıysa kaldır
          if (comment.replies.length === 0) {
            comment.replies = [];
          }
          return true;
        }
      }
    }
    return false;
  }
  findAndUpdateComment(comments: any[], commentID: string, updatedComment: string): boolean {
    for (let comment of comments) {
      if (comment._id === commentID) {
        comment.comment = updatedComment;
        return true;
      }
      if (comment.replies && comment.replies.length > 0) {
        const found = this.findAndUpdateComment(comment.replies, commentID, updatedComment);
        if (found) return true;
      }
    }
    return false;
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

  //commentVotes
  updateCommentVoteButtonLoading:boolean=false;
  commentVotedControl:number|undefined=undefined;
  updateCommentVote(commentVoteData:IUpdateCommentVoteRequestDto){
    
    this.updateCommentVoteButtonLoading=true;
    this.blogPostService.updateCommentVoteService(commentVoteData).subscribe({
      next: (response:IBooleanResponse) => {
        this.messageService.add({severity:'success', summary: 'Success!', detail:'Comment vote updated successfully.'});
        this.getCommentVoteCountByUsername({commentID:commentVoteData.commentID, username:this.sessionUsername});
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error!', detail:'Error updating comment vote.'});
        if(error.status==401 || this.sessionUsername=="" || this.sessionUsername==null || this.sessionUsername==undefined){
          this.authCrudService.returnUrl = this.location.path();
          this.router.navigateByUrl('/auth/login');
        }
      }
    });
  }

  findAndUpdateVote(comments: any[], commentID: string, vote: number): boolean {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
  
      if (comment._id === commentID) {
        comment.vote = vote;
        if(vote==1 && comment.voteCount>0){
            comment.voteCount++;
        } else if(vote==1 && comment.voteCount==0){
            comment.voteCount++;
        } else if(vote==-1 && comment.voteCount>0){
            comment.voteCount--;
        } else if(vote==-1 && comment.voteCount==0){
            comment.voteCount--;
        }
        return true;
      }
  
      if (comment.replies && comment.replies.length > 0) {
        const found = this.findAndUpdateVote(comment.replies, commentID, vote);
        if (found) return true;
      }
    }
  
    return false;
  }

  getCommentVoteCountByUsername(commentVoteData:{commentID:string, username:string}){
    
    this.blogPostService.getCommentVoteCountByUsernameService(commentVoteData).subscribe({
      next: (response:ICommentVoteCountByUsernameResponseDto) => {
        this.commentVotedControl=response.data;
        this.updateCommentVoteButtonLoading=false;
        this.findAndUpdateVote([this.comment], commentVoteData.commentID, response.data);
      },
      error: (error:any) => {
        this.messageService.add({severity:'error', summary:'Error!', detail:'Error getting comment vote count.'});
        if(error.status==401 || this.sessionUsername=="" || this.sessionUsername==null || this.sessionUsername==undefined){
          this.authCrudService.returnUrl = this.location.path();
          this.router.navigateByUrl('/auth/login');
        }
      }
    });
  }
}
