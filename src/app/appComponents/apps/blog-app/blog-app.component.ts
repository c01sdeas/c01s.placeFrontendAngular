import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-blog-app',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './blog-app.component.html',
  styleUrl: './blog-app.component.scss'
})
export class BlogAppComponent {

}
