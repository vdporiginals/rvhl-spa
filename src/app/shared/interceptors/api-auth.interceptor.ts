import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private localStorage: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authUserToken = this.localStorage.getItem('api_token');
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
