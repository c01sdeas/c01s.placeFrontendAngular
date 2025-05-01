import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { MessageService } from 'primeng/api';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CountryService } from './app/pages/service/country.service';
import { CustomerService } from './app/pages/service/customer.service';
import { IconService } from './app/pages/service/icon.service';
import { NodeService } from './app/pages/service/node.service';
import { PhotoService } from './app/pages/service/photo.service';
import { ProductService } from './app/pages/service/product.service';
import { errorInterceptor } from './app/interceptors/error.interceptor';
import { authInterceptor } from './app/interceptors/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(withFetch()),
        provideAnimationsAsync(),
        providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
        
        

        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, IconService, NodeService,
        PhotoService, ProductService,
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true },
        
        provideHttpClient(withInterceptors([errorInterceptor, authInterceptor])),
        MessageService
    ]
};
