import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // localStorage'dan token'ı alın
  const token = localStorage.getItem('authorization');
  const messageService = inject(MessageService)

  // Eğer token varsa, authorization başlığına ekleyin
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
          messageService.add({severity:'error', summary: 'Error', detail: error.error.message});
          
          // localStorage.removeItem('authorization');
          // router.navigate(['/auth/login']);
          throwError(() => errorMessage);
        }

        if (!router.url.includes('/blog/detail') && !router.url.includes('/blog/list') && error.status === 401) {
          messageService.add({severity:'error', summary: 'Error', detail: 'Unauthorized!'});
          
          // localStorage.removeItem('authorization');
          // router.navigate(['/auth/login']);
          throwError(() => errorMessage);
        }
        

        console.log(errorMessage);
        console.log(errorMessage);
        console.log(errorMessage);
        console.log(errorMessage);
        
        return throwError(() => errorMessage);
      })
    );
  }

  // Token yoksa orijinal isteği değişmeden gönderin
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Hata durumunda kullanıcıyı login sayfasına yönlendirmek isteyebilirsiniz.
      // router.navigate(['/auth/login']);      
      return throwError(() => error);
    })
  );
};