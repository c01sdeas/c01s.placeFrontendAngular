import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCrudService } from '../services/users/auths/auth-crud.service';
import { UserCrudService } from '../services/users/user-crud.service';
import { Observable } from 'rxjs';
import { take, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state): Observable<boolean> => { // <-- Return type Observable<boolean>
  const authCrudService = inject(AuthCrudService);
  const userCrudService = inject(UserCrudService);
  const router = inject(Router);

  return authCrudService.signedInData$.pipe( // <-- use signedInData$ instead of _signedInData
    take(1), // Only take one value and unsubscribe (good practice for guards)
    switchMap(signedInUser => { // signedInUser changes or first time it's called
      if (!signedInUser || !signedInUser.data.username) {
        // User is not logged in or username is missing
        router.navigate(['/error/notfound']); // Or '/login'
        return of(false); // Observable<false> return
      }

      // User is logged in, now check roles
      return userCrudService.getUserRolesData({ username: signedInUser.data.username }).pipe(
        map(response => { // Role data received
          // Check response structure (is response.data an array?)
          if (response.data && (response.data.includes("admin") || response.data.includes("moderator"))) {
            return true; // Observable<true> return
          } else {
            router.navigate(['/error/notfound']);
            return false; // Observable<false> return
          }
        }),
        catchError(error => { // API call error
          console.error('Roles fetching error:', error);
          router.navigate(['/error/notfound']);
          return of(false); // Observable<false> return
        })
      );
    }),
    catchError(error => { // signedInData$ observable error
      console.error('Auth status check error:', error);
      router.navigate(['/error/notfound']);
      return of(false); // Observable<false> return
    })
  );
};