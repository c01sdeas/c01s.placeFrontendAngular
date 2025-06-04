import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status)
        switch (error.status) {
          case 0:
            messageService.add({severity: 'error', summary: 'Server error', detail: 'Connection to the server could not be established.'});
            localStorage.removeItem('authorization');
            router.navigateByUrl('/auth/login');
            break;

          case 400:
            messageService.add({severity: 'error', summary: 'Error', detail: 'Bad request.'});
            break;

          case 401:
            messageService.add({severity: 'error', summary: 'Error', detail: 'Unauthorized request.'});
            if (!router.url.includes('/auth/login') && !router.url.includes('/auth/register')) {
              router.navigateByUrl('/error/unauthorized');
            }
            break;
          
          case 404:
            messageService.add({severity: 'error', summary: 'Error', detail: 'Not found.'});
            router.navigateByUrl('/error/not-found');
            break;

          case 500:
            messageService.add({severity: 'error', summary: 'Error', detail: 'Internal server error.'});
            break;

          case undefined:
            messageService.add({severity: 'error', summary: 'Server error', detail: 'Connection to the server could not be established.undfeined'});
            localStorage.removeItem('authorization');
            router.navigateByUrl('/auth/login');
            break;
        
          default:
            messageService.add({severity: 'error', summary: 'Error', detail: 'Unknown error.'});
            break;
        }

      return throwError(() => error);
    })
  );
};