import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blog-categories',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './blog-categories.component.html',
  styleUrl: './blog-categories.component.scss'
})
export class BlogCategoriesComponent {
}
