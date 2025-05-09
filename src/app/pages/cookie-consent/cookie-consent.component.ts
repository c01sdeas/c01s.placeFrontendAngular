import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-cookie-consent',
  imports: [RouterModule, ButtonModule, DialogModule, CardModule, CheckboxModule, FormsModule, ToggleSwitchModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss'
})
export class CookieConsentComponent implements OnInit {
  // display = false;

  // constructor(private cookieService: CookieService, private router:Router) {}

  // ngOnInit(): void {
  //   console.log(this.router.url);
    
  //   const currentUrl = this.router.url;
  //   const consent = this.cookieService.get('site_consent');

  //   // Eğer privacy-policy sayfasındaysa veya çerez izni verilmişse gösterme
  //   if (!consent && !currentUrl.includes('privacy-policy')) {
  //     this.display = true;
  //   }
  // }

  // acceptAll() {
  //   this.cookieService.set('site_consent', 'full');
  //   this.display = false;
  //   window.location.reload();
  // }

  // acceptEssentialOnly() {
  //   this.cookieService.set('site_consent', 'essential');
  //   this.display = false;
  //   window.location.reload();
  // }

  showBanner = false;
  showPreferencesDialog = false;

  preferences = {
    essential: true, // Her zaman açık
    analytics: true,
    ads: true
  };

  constructor(private cookieService: CookieService) {}

  ngOnInit() {
    const consent = this.cookieService.get('cookieConsent');
    if (!consent) {
      this.showBanner = true;
    }
  }

  acceptAll() {
    this.preferences = {
      essential: true,
      analytics: true,
      ads: true
    };
    this.savePreferences();
  }

  acceptEssentialOnly() {
    this.preferences = {
      essential: true,
      analytics: false,
      ads: false
    };
    this.savePreferences();
  }

  savePreferences() {
    this.cookieService.set('cookieConsent', JSON.stringify(this.preferences), 365);
    this.showBanner = false;
    this.showPreferencesDialog = false;
    // Burada tercihlere göre script yükleyebilirsin
    this.loadOrRemoveAnalyticsScripts();
    this.loadOrRemoveAdScripts();
    
  }

  loadOrRemoveAnalyticsScripts() {
    if (this.preferences.analytics) {
      // Google Analytics kodunu yükle
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y';
      document.head.appendChild(script);
      // ... diğer analitik kodları
    } else {
      // Google Analytics veya ilgili çerezleri sil
      // ...
    }
  }

  loadOrRemoveAdScripts() {
    if (this.preferences.ads) {
      // Reklam scriptlerini yükle
      // ...
    } else {
      // Reklam çerezlerini sil
      // ...
    }
  }

  openPreferences() {
    this.showPreferencesDialog = true;
  }
}
