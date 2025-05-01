import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent {

  constructor (private router:Router) { }

  goToBlogDetail() {
    this.router.navigate(['/app/blog/detail']);
  }


  blogList = [{
    title: 'test blog header1',
    image: 'https://i.imgur.com/PZcBZJu.jpeg',
    summary: 'text blog summary text blog summary text blog summary text blog summary text blog summary text blog summary text blog summary text blog summary text blog summary text blog summary text blog summary ',
    meta: 'meta text test bla bla',
    readingTime: '20min',
    writer: 'c01sdeants'
  }, {
    title: 'test blog header2',
    image: '',
    summary: 'text blog summary2',
    readingTime: '35min',
    meta: 'meta text test bla bla',
    writer: 'c01sdeants'
  },{
    title: 'test blog header2',
    image: 'https://i.imgur.com/PZcBZJu.jpeg',
    summary: 'text blog summary2',
    readingTime: '35min',
    meta: 'meta text test bla bla',
    writer: 'c01sdeants'
  },{
    title: 'test blog header2',
    image: 'https://i.imgur.com/PZcBZJu.jpeg',
    summary: 'text blog summary2',
    readingTime: '35min',
    meta: 'meta text test bla bla',
    writer: 'c01sdeants'
  }];

  
}
