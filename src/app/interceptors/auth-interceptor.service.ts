import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  const token = localStorage.getItem('authorization');
  const messageService = inject(MessageService)

  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('authorization', token),
    });

    return next(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        if (!router.url.includes('/blog/detail') && !router.url.includes('/blog/list')) {
          // messageService.add({severity:'error', summary: 'Error', detail: error.error.message});
          throwError(() => errorMessage);
        }

        if (!router.url.includes('/blog/detail') && !router.url.includes('/blog/list') && error.status === 401) {
          // messageService.add({severity:'error', summary: 'Error', detail: 'Unauthorized!'});
          throwError(() => errorMessage);
        }        
        return throwError(() => errorMessage);
      })
    );
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    })
  );
};