import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppConfigurator } from './app/layout/component/app.configurator';
import { CookieService } from 'ngx-cookie-service';
import { CookieConsentComponent } from "./app/pages/cookie-consent/cookie-consent.component";
import { filter } from 'rxjs';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ScrollTopModule, RouterModule, ToastModule, AppConfigurator, CookieConsentComponent],
    template: `<app-configurator></app-configurator><p-toast /> <router-outlet></router-outlet>
    @if (showCookieConsent) {
        <app-cookie-consent></app-cookie-consent>
    }<p-scrollTop icon="pi pi-arrow-up"/>`,

    providers: [MessageService, CookieService],
})
export class AppComponent {
    showCookieConsent = true;

    constructor(private router: Router) {
        this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
        // Route'a göre gösterme kararını burada ver
        const hiddenRoutes = ['/privacy-policy', '/terms-of-use', '/cookie-policy']; // Gerekirse diğer sayfaları da ekle
        this.showCookieConsent = !hiddenRoutes.includes(event.urlAfterRedirects);
        });
    }
}
