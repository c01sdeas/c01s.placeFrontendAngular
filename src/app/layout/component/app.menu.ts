import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AuthCrudService } from '../../services/users/auths/auth-crud.service';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { BlogPostsCrudService } from '../../services/apps/blogApp/blog-posts-crud.service';
import { ISubscribeToNewsRequestData } from '../../services/apps/models/apps/blogApp/blogPostsCrudModel';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, ToggleSwitchModule, ButtonModule, FormsModule, DialogModule, InputTextModule],
    templateUrl: './app.menu.html',
})
export class AppMenu {
    constructor (private cookieService:CookieService, private authCrudService:AuthCrudService, private router:Router, private messageService:MessageService, private blogPostsCrudService:BlogPostsCrudService){}

    currentYear: number = new Date().getFullYear();

    model: MenuItem[] = [];

    ngOnInit() {
        const cookieConsent = this.cookieService.get('cookieConsent');
        this.preferences = JSON.parse(cookieConsent);
        this.model = [
            // {
            //     label: 'authentication',
            //     items: [
            //         { label: 'Sign In', styleClass: 'font-bold', icon: 'pi pi-fw pi-sign-in', routerLink: ['/auth/login'], command: _ => this.authCrudService.returnUrl = this.router.url },
            //     ]
            // },
            {
                label: 'Home',
                items: [
                    { label: 'News', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Tags', icon: 'pi pi-fw pi-tag', routerLink: ['/tag/list'] },
                    // { label: 'Blog', icon: 'pi pi-fw pi-home', routerLink: ['/blog/list'] },
                    // { label: 'News', icon: 'pi pi-fw pi-home', routerLink: ['/news/list'] }
                ]
            },
            {
                label: 'Updates',
                items: [
                    {
                        label: 'Subscribe to our news...',
                        icon: 'pi pi-fw pi-bell',
                        command: _ => this.showSubscribeToNewsDialog()
                    }

                ]
            },
            {
                label: 'Other platforms',
                items: [
                    { label: 'Pinterest', icon: 'pi pi-fw pi-pinterest', url: 'https://www.pinterest.com/c01splace', target: '_blank' },
                    { label: 'Instagram', icon: 'pi pi-fw pi-instagram', url: 'https://www.instagram.com/c01splace', target: '_blank' },
                    { label: 'X', icon: 'pi pi-fw pi-twitter', url: 'https://www.x.com/c01splace', target: '_blank' },
                    // { label: 'Blog', icon: 'pi pi-fw pi-home', routerLink: ['/blog/list'] },
                    // { label: 'News', icon: 'pi pi-fw pi-home', routerLink: ['/news/list'] }
                ]
            },
            // {
            //     label: 'UI Components',
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
            //         { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
            //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
            //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
            //         { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
            //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
            //     ]
            // },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Privacy Policy',
                        icon: 'pi pi-fw pi-shield',
                        routerLink: ['/privacy-policy']
                    },
                    {
                        label: 'Cookie Policy',
                        icon: 'pi pi-fw pi-lock',
                        routerLink: ['/cookie-policy']
                    },
                    {
                        label: 'Terms Of Use',
                        icon: 'pi pi-fw pi-file',
                        routerLink: ['/terms-of-use']
                    },
                    // {
                    //     label: 'Landing',
                    //     icon: 'pi pi-fw pi-globe',
                    //     routerLink: ['/landing']
                    // },
                    // {
                    //     label: 'Auth',
                    //     icon: 'pi pi-fw pi-user',
                    //     items: [
                    //         {
                    //             label: 'Login',
                    //             icon: 'pi pi-fw pi-sign-in',
                    //             routerLink: ['/auth/login']
                    //         },
                    //         {
                    //             label: 'Error',
                    //             icon: 'pi pi-fw pi-times-circle',
                    //             routerLink: ['/auth/error']
                    //         },
                    //         {
                    //             label: 'Access Denied',
                    //             icon: 'pi pi-fw pi-lock',
                    //             routerLink: ['/auth/access']
                    //         }
                    //     ]
                    // },
                    // {
                    //     label: 'Crud',
                    //     icon: 'pi pi-fw pi-pencil',
                    //     routerLink: ['/pages/crud']
                    // },
                    // {
                    //     label: 'Not Found',
                    //     icon: 'pi pi-fw pi-exclamation-circle',
                    //     routerLink: ['/pages/notfound']
                    // },
                    // {
                    //     label: 'Empty',
                    //     icon: 'pi pi-fw pi-circle-off',
                    //     routerLink: ['/pages/empty']
                    // }
                ]
            },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2',
            //             icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2',
            //                     icon: 'pi pi-fw pi-bookmark',
            //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
            //                 }
            //             ]
            //         }
            //     ]
            // },
            {
                label: 'Project Sources',
                items: [
                    // {
                    //     label: 'Documentation',
                    //     icon: 'pi pi-fw pi-book',
                    //     routerLink: ['/documentation']
                    // },
                    {
                        label: 'Clean Frontend Template',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/primefaces/sakai-ng',
                        target: '_blank'
                    },
                    {
                        label: 'Backend Project',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/c01sdeas/c01s.placeBackendAPI/tree/master',
                        target: '_blank'
                    },
                    {
                        label: 'Frontend Project',
                        icon: 'pi pi-fw pi-github',
                        url: 'https://github.com/c01sdeas/c01s.placeFrontendAngular/tree/master',
                        target: '_blank'
                    },
                ]
            },
            {
                label: 'Contact',
                items: [
                    {
                        label: 'c01splaceproject@gmail.com',
                        icon: 'pi pi-fw pi-envelope',
                        url: 'mailto:c01splaceproject@gmail.com',
                    }

                ]
            },
            {
                label: 'Cookies',
                items: [
                    {
                        label: 'Preferences',
                        command: _ => this.openPreferences(),
                        icon: 'pi pi-fw pi-unlock'
                    }
                ]
            }
        ];
    }

    //cookies
    acceptAll() {
        this.preferences = {
        essential: true,
        analytics: true,
        ads: true
        };
        this.savePreferences();
    }

    showPreferencesDialog = false;

    preferences = {
        essential: true, // always active
        analytics: true,
        ads: true
    };
    savePreferences() {
        this.cookieService.set('cookieConsent', JSON.stringify(this.preferences), 365);
        const cookieConsent = this.cookieService.get('cookieConsent');
        this.preferences = JSON.parse(cookieConsent);
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

    goToSignInPage(){
        this.authCrudService.returnUrl = this.router.url;
        this.router.navigateByUrl('/auth/login');
    }


    subscribeToNewsDialogVisible:boolean=false;
    showSubscribeToNewsDialog(){
        this.subscribeToNewsDialogVisible=true;
    }
    hideSubscribeToNewsDialog(){
        this.subscribeToNewsDialogVisible=false;
    }
    emailForSubscribeToNews:string='';
    loadingSubscribeToNewsButton:boolean=false;
    subscribeToNews(){
        this.loadingSubscribeToNewsButton=true;
        const data : ISubscribeToNewsRequestData={} as ISubscribeToNewsRequestData;
        data.email=this.emailForSubscribeToNews;
        this.blogPostsCrudService.subscribeToNews(data).subscribe({
            next: (response:any) => {
                if(response.success){
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have successfully subscribed to our news.' });
                    this.hideSubscribeToNewsDialog();
                }
            },
            error: (error:any) => {
                this.messageService.add({ severity: 'info', summary: 'Info', detail: 'You have already subscribed to our news.' });
                this.hideSubscribeToNewsDialog();
            },
            complete: () => {
                this.loadingSubscribeToNewsButton=false;
                this.emailForSubscribeToNews='';
            }
        });
    }
}
