import { Component } from '@angular/core';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { AuthCrudService } from '../../services/users/auths/auth-crud.service';
import { ILoggedUserDataRequestModel, ILoggedUserDataResponseModel, IUserLoginResponseModel, IUserTokenResponseModel } from '../../services/apps/models/auths/authCrudModel';
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

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, MegaMenuModule, ButtonModule, MenuModule, DialogModule, FormsModule, ReactiveFormsModule, PasswordModule, InputTextModule],
    templateUrl: './app.topbar.html'
})
export class AppTopbar {
    items!: MenuItem[];
    
    constructor(public layoutService: LayoutService, private authCrudService:AuthCrudService, private userCrudService:UserCrudService, private router:Router, private messageService:MessageService, private formBuilder:FormBuilder) { }
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
            if (!this.router.url.includes('blog')) {
                localStorage.removeItem('authorization');
                this.router.navigateByUrl('/');
            }

            
        }

        this.userLoginFormData = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(1)]],
            password: ['', [Validators.required, Validators.minLength(1)]]
        });
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
        if (!this.router.url.includes('blog/detail') && !this.router.url.includes('blog/list')) this.router.navigate(['/auth/login']);
        else location.reload();
        
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
        this.userCrudService.changeUserTheme(changeUserDataRequestData).subscribe({
            next: response => {
                console.log(response);
            }
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
        if (this.router.url.includes('blog')) {
            this.showSignInDialog();
        } else {
            this.router.navigateByUrl('/auth/login');
        }
    }

    valCheck: string[] = ['remember'];

    password!: string;
    userLoginFormData!: FormGroup;
    
    userLoginResponse : IUserLoginResponseModel | undefined;
    signInButtonSpam : boolean = false;
    login(){
        this.signInButtonSpam = true;
        setTimeout(() => {
        this.signInButtonSpam = false;
        }, 3000);
        this.authCrudService.login(this.userLoginFormData.value).subscribe({

        next: response => {
            
            this.userLoginResponse = response;
            
            if (response.data) {
                localStorage.setItem('authorization', response.data.token);
                this.hideSignInDialog();
                this.authCrudService.loggedInStatus.next(true);
                this.token = localStorage.getItem('authorization');
                this.decodedToken = jwtDecode(this.token);
                this.loggedUserRequestData.username = this.decodedToken.username;
                this.getUserData();
                this.getUserThemeData();
                this.messageService.add({ severity: 'success', summary: 'Welcome!', detail: 'Signed in as '+response.data.username+'.' });
            }
            
        }, error: err => {    
                
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            
        }
        
        });
    }

    saveReturnUrl(){
        this.authCrudService.returnUrl = this.router.url;        
    }
}
