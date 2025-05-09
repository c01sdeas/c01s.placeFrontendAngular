import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-cookie-policy',
  imports: [ButtonModule, RouterModule, PanelModule],
  templateUrl: './cookie-policy.component.html',
  styleUrl: './cookie-policy.component.scss'
})
export class CookiePolicyComponent {
  lastUpdatedDate: string = 'May 8, 2025';
}
