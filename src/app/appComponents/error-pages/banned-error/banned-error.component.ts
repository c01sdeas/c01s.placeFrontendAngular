import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-banned-error',
  imports: [ButtonModule, RouterModule],
  templateUrl: './banned-error.component.html',
  styleUrl: './banned-error.component.scss'
})
export class BannedErrorComponent {

}
