import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog-pannel',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './blog-pannel.component.html',
  styleUrl: './blog-pannel.component.scss'
})
export class BlogPannelComponent {

}
