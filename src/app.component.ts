import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppConfigurator } from './app/layout/component/app.configurator';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule, AppConfigurator],
    template: `<app-configurator></app-configurator><p-toast /><router-outlet></router-outlet>`,

    providers: [MessageService],
})
export class AppComponent {}
