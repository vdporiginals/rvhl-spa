import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthClientService } from '../services/auth-client.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authUserToken = environment.apiToken;
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authUserToken
      }
    });
    return next.handle(req);
  }
}
