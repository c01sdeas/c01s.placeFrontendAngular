import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-error-pages',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './error-pages.component.html',
  styleUrl: './error-pages.component.scss'
})
export class ErrorPagesComponent {

}
