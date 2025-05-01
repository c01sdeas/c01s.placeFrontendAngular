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
      // let errorMessage = 'An unknown error occurred!';

      // if (error.error instanceof ErrorEvent) {
      //   // Client-side error
      //   errorMessage = `Client-side error: ${error.error.message}`;  
      //   console.log(error);
        
      // } else {
      //   // Server-side error
      //   // console.log('server side'+error);
        
      //   // messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });

      //   // if (error.error) {
      //   //   // error.error.errors.forEach(element => {
      //   //   //   messageService.add({severity: 'error', summary: 'Error', detail: element.message});
      //   //   // });

      //   //   console.log(error.error);
          
      //   // }
        
      //   // errorMessage = `Server-side error: ${error.status} - ${error.error.errors[0].message}`;

      //   // errorMessage = `Server-side error: ${error.status} - ${error.message}`;
        
        
      // }

      

      // console.error(errorMessage); // Hataları konsola yaz
      

      // console.log(error);

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