import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authUserToken = environment.apiToken;
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
