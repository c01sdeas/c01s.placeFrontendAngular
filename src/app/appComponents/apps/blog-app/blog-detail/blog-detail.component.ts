import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    DividerModule,
    ButtonModule,
    RouterModule,
    DialogModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent {

  imageContentDialogVisible:boolean=false;
  imageContentDialogData:string="";
  showImageContentDialog(data:string){
    this.imageContentDialogData=data;
    this.imageContentDialogVisible = true;
  }
  hideImageContentDialog(){
    this.imageContentDialogVisible = false;
    this.imageContentDialogData="";
  }

}
