import { Component, HostListener } from '@angular/core';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { AuthCrudService } from '../../services/users/auths/auth-crud.service';
import { ILoggedUserDataRequestModel, ILoggedUserDataResponseModel, IUserLoginResponseModel, IUserRolesRequestModel, IUserRolesResponseModel, IUserTokenResponseModel } from '../../services/apps/models/auths/authCrudModel';
import { UserCrudService } from '../../services/users/user-crud.service';
import { userThemeData } from '../../services/apps/models/users/userCrudModel';
import { jwtDecode } from 'jwt-decode';
import { MegaMenuModule } from 'primeng/megamenu';
import { ButtonModule } from 'primeng/button';
import { MenuItemContent, MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CookieService } from 'ngx-cookie-service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, MegaMenuModule, ButtonModule, MenuModule, DialogModule, FormsModule, ReactiveFormsModule, PasswordModule, InputTextModule, DividerModule, TooltipModule],
    templateUrl: './app.topbar.html'
})
export class AppTopbar {
    items!: MenuItem[];
    
    constructor(public layoutService: LayoutService, private authCrudService:AuthCrudService, private userCrudService:UserCrudService, private router:Router, private messageService:MessageService, private formBuilder:FormBuilder, private cookieService:CookieService) { }
    token : any = '';
    decodedToken : IUserTokenResponseModel = {} as IUserTokenResponseModel;
    loggedUserRequestData : ILoggedUserDataRequestModel = {} as ILoggedUserDataRequestModel;
    ngOnInit(): void {
        if (localStorage.getItem('authorization')) {
            this.token = localStorage.getItem('authorization');
            this.decodedToken = jwtDecode(this.token);
            
            if (this.decodedToken) {
                this.loggedUserRequestData.username = this.decodedToken.username;                
                this.getUserData();
            }
        } else {
            if (!this.router.url.includes('blog') && !this.router.url.includes('tag') && !this.router.url.includes('user')) {
                localStorage.removeItem('authorization');
                this.router.navigateByUrl('/');
            }

            
        }

    }

    loggedUserData : ILoggedUserDataResponseModel = {} as ILoggedUserDataResponseModel;
    
    loadingUserDataButton : boolean = false;
    
    signedInDataMenuIitems : MenuItem[] = [];
    getUserData() {
        if (this.decodedToken.username) {
            this.loadingUserDataButton = true;
        }
        this.authCrudService.getLoggedUserData(this.loggedUserRequestData).subscribe({

            next: response => {                
                this.loggedUserData = response;
                this.authCrudService._signedInData.subscribe(response => {
                    if (response) {
                        this.getUserThemeData();
                        this.loggedUserData = response;

                        this.signedInDataMenuIitems = [
                            {
                                label: '@'+response.data.username,
                                items: [
                                    { label: 'Account', icon: 'pi pi-fw pi-cog', routerLink: '/user/profile' }, 
                                    { label: 'Sign Out', icon: 'pi pi-fw pi-sign-out', command: () => this.signOut() }
                                ]
                            }   
                            
                        ];

                        this.loadingUserDataButton=false;

                        this.getUserRolesData();
                    }
                });
            },
            error: () => {
                localStorage.removeItem('authorization');
                location.reload();
            }

            
        });
    }

    sidebarForSettings : boolean = false;
    showSidebarForSettings(){
        this.sidebarForSettings = true;
    }
    hideSidebarForSettings(){
        this.sidebarForSettings = false;
    }


    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
        if (localStorage.getItem('authorization')) {
            this.changeUserThemeData();
        }
    }

    lightsSwitch:boolean = false;
    signOut(){
        this.lightsSwitch = false;
        this.authCrudService.userLogout();
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: true }));
        // if (!this.router.url.includes('blog/detail') && !this.router.url.includes('blog/list')) this.router.navigate(['/auth/login']);
        // else location.reload();
        location.reload();
    }

    userThemeData : userThemeData = {} as userThemeData;
    getUserThemeData() {
        const userThemeRequestData : ILoggedUserDataRequestModel = {} as ILoggedUserDataRequestModel;
        userThemeRequestData.username = this.decodedToken.username;
        this.userCrudService.getUserThemeData(userThemeRequestData).subscribe(response => {            
            if(response === true){
                this.lightsSwitch = true;
                this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: response }));
            } else {
                this.lightsSwitch = false;
                this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: response }));
            }
        });
    }

    changeUserThemeData(){
        const changeUserDataRequestData : ILoggedUserDataRequestModel = {} as ILoggedUserDataRequestModel;
        changeUserDataRequestData.username = this.decodedToken.username;
        this.userCrudService.changeUserTheme(changeUserDataRequestData).subscribe();
    }

    userRolesData : string[] = [];
    getUserRolesData(){
        const userRolesRequestData : IUserRolesRequestModel = {} as IUserRolesRequestModel;
        userRolesRequestData.username = this.decodedToken.username;
        this.userCrudService.getUserRolesData(userRolesRequestData).subscribe(response => {
            this.userRolesData = response.data;
        });
    }

    authControlDialogVisible : boolean = false;
    showAuthControlDialog(){
        this.authControlDialogVisible = true;
    }
    hideAuthControlDialog(){
        this.authControlDialogVisible = false;
    }

    signInDialogVisible:boolean=false;
    showSignInDialog(){
        this.signInDialogVisible = true;
    }
    hideSignInDialog(){
        this.signInDialogVisible = false;
    }
    goToSignIn(){
        this.saveReturnUrl();
        this.router.navigateByUrl('/auth/login');
    }


    saveReturnUrl(){
        this.authCrudService.returnUrl = this.router.url;
    }

    //scroll-control
    topbarIsHidden = false;
    lastScrollTop = 0;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > this.lastScrollTop && st > 0) {
        this.topbarIsHidden = true;
        } else {
        this.topbarIsHidden = false;
        }
        this.lastScrollTop = st <= 0 ? 0 : st;
    }
}
