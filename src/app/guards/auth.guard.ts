import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { AuthCrudService } from '../services/users/auths/auth-crud.service';
import { map } from 'rxjs';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {

  const authCrudService = inject(AuthCrudService);
  const router = inject(Router);
  const authToken = localStorage.getItem('authorization');
  let decodedToken: any = undefined;
  const messageService = inject(MessageService);

  return authCrudService.isLoggedIn().pipe(
    map((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        if (authToken) {
          decodedToken = jwtDecode(authToken);
        }

        if (decodedToken && decodedToken.exp) {
          const expirationDate = new Date(decodedToken.exp * 1000);
          const isTokenExpired = expirationDate < new Date();

          if (isTokenExpired) {
            localStorage.removeItem('authorization');
            authCrudService.userLogout().subscribe({
              next: (res:{message:string}) => {
                messageService.add({ severity: 'info', detail: 'Session expired.' });
                router.navigate(['/error/notfound']);
              },
              complete: () => {
                return false;
              }
            });
          }
          return true;
        }
      }
      
      localStorage.removeItem('authorization');
      
      if (decodedToken && decodedToken.username) {
        authCrudService.userLogout().subscribe({
          next: (res:{message:string}) => {
            messageService.add({ severity: 'info', detail: 'Session expired.' });
            router.navigate(['/error/notfound']);
          },
          complete: () => {
            return false;
          }
        });
      }
      router.navigate(['/error/notfound']);
      return false;
    })
  );

};
