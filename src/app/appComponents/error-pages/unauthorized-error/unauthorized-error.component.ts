import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-unauthorized-error',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  templateUrl: './unauthorized-error.component.html',
  styleUrl: './unauthorized-error.component.scss'
})
export class UnauthorizedErrorComponent {
  
  constructor (private router:Router) {}

  goToDashboard(){
    this.router.navigateByUrl('/');
  }
}
