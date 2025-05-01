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
        // Token varsa decode et
        if (authToken) {
          decodedToken = jwtDecode(authToken);
        }

        // Token geçerli ise kontrol et
        if (decodedToken && decodedToken.exp) {
          const expirationDate = new Date(decodedToken.exp * 1000);
          const isTokenExpired = expirationDate < new Date();

          if (isTokenExpired) {
            // Token süresi dolmuşsa, çıkış yap ve login sayfasına yönlendir
            localStorage.removeItem('authorization');
            router.navigate(['/auth/login']);
            messageService.add({ severity: 'info', detail: 'Session expired.' });
            return false;
          }

          // Token geçerli ise, girişe izin ver
          return true;
        }
      }
      

      // Token yoksa veya geçerli değilse, giriş yapılmamış
      localStorage.removeItem('authorization');
      router.navigate(['/auth/login']);
      return false;
    })
  );
};
