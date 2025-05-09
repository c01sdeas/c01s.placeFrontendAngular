import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-privacy-policy',
  imports: [ButtonModule, RouterModule, PanelModule, DividerModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  lastUpdatedDate: string = 'May 8, 2025';
}
