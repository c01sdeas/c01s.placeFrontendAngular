import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-not-found-error',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './not-found-error.component.html',
  styleUrl: './not-found-error.component.scss'
})
export class NotFoundErrorComponent {

  constructor (private router:Router) {}

  goToDashboard(){
    this.router.navigateByUrl('/');
  }
}
