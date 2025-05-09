import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-terms-of-use',
  imports: [ButtonModule, RouterModule, PanelModule],
  templateUrl: './terms-of-use.component.html',
  styleUrl: './terms-of-use.component.scss'
})
export class TermsOfUseComponent {
  lastUpdatedDate: string = 'May 8, 2025';
}
