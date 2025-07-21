import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-welcomepage',
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.scss'
})
export class WelcomepageComponent {

}
