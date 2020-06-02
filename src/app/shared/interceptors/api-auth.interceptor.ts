import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private localStorage: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authUserToken = this.localStorage.getItem('access_token');
    console.log(typeof (authUserToken));
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authUserToken
      }
    });
    return next.handle(req).pipe(tap(() => { },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          console.log(err);
        }
      }));
  }
}
