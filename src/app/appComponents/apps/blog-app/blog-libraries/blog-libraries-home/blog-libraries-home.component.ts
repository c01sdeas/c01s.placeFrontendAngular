import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-blog-libraries-home',
  imports: [CommonModule, RouterModule, ButtonModule, CardModule],
  templateUrl: './blog-libraries-home.component.html',
  styleUrl: './blog-libraries-home.component.scss'
})
export class BlogLibrariesHomeComponent {

  

}
