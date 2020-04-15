import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthClientService } from '../services/auth-client.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthClientService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authUserToken = this.authService.getUserToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authUserToken
      }
    });
    return next.handle(req);
  }
}
