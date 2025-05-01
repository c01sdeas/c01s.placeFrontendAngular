import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { authGuard } from './app/guards/auth.guard';
import { BlogAppComponent } from './app/appComponents/apps/blog-app/blog-app.component';
import { BlogListComponent } from './app/appComponents/apps/blog-app/blog-list/blog-list.component';
import { BlogDetailComponent } from './app/appComponents/apps/blog-app/blog-detail/blog-detail.component';
import { BlogPannelComponent } from './app/appComponents/apps/blog-app/blog-pannel/blog-pannel.component';
import { AddNewBlogComponent } from './app/appComponents/apps/blog-app/blog-pannel/add-new-blog/add-new-blog.component';
import { AuthenticationComponent } from './app/appComponents/authentication/authentication.component';
import { LoginComponent } from './app/appComponents/authentication/login/login.component';
import { RegisterComponent } from './app/appComponents/authentication/register/register.component';
import { PasswordRecoveryComponent } from './app/appComponents/authentication/password-recovery/password-recovery.component';
import { ErrorPagesComponent } from './app/appComponents/error-pages/error-pages.component';
import { NotFoundErrorComponent } from './app/appComponents/error-pages/not-found-error/not-found-error.component';
import { UnauthorizedErrorComponent } from './app/appComponents/error-pages/unauthorized-error/unauthorized-error.component';
import { AppsComponent } from './app/appComponents/apps/apps.component';
import { UserProfileComponent } from './app/appComponents/users/user-profile/user-profile.component';
import { UsersComponent } from './app/appComponents/users/users.component';
import { BannedErrorComponent } from './app/appComponents/error-pages/banned-error/banned-error.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/app/blog/list', // Ana rota doğrudan dashboard'a yönlendirilecek
        pathMatch: 'full',       // Tam path eşleştiğinde yönlendir
    },
    {
        path: '',
        component: AppLayout,

        
        
        children: [
            { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'user', component: UsersComponent, canActivate: [authGuard], children: [
                { path: 'profile', component: UserProfileComponent }
            ]},
            // { path: 'apps', component: AppsComponent },

            {
            path: 'app', component: AppsComponent,
                children: [
                    { path: 'blog', component: BlogAppComponent, children: [
                        { path: 'list', component: BlogListComponent },
                        { path: 'detail', component: BlogDetailComponent },
                        { path: 'pannel', component: BlogPannelComponent, children: [
                            { path: 'add', component: AddNewBlogComponent }
                        ] }
                        
                        //admin-panel
                    ] },
                ]
            },
        ]
    },
    
    { path: 'auth', component: AuthenticationComponent, children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'password-recovery', component: PasswordRecoveryComponent }
    ] },
    {path: 'error', component: ErrorPagesComponent, children: [
        {path: 'notfound', component: NotFoundErrorComponent},
        {path: 'unauthorized', component: UnauthorizedErrorComponent},
        {path: 'banned', component: BannedErrorComponent},
    ]},
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
