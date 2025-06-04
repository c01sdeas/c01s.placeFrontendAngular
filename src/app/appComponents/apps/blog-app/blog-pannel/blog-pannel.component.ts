import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-blog-pannel',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CardModule
  ],
  templateUrl: './blog-pannel.component.html',
  styleUrl: './blog-pannel.component.scss'
})
export class BlogPannelComponent {

}
