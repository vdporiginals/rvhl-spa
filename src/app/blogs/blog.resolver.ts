import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { delay } from 'rxjs/operators';

@Injectable()
export class BlogResolve implements Resolve<any> {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private localStorage: LocalStorageService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;
    const authUserToken = this.localStorage.getItem('api_token');
    console.log(authUserToken);
    return isPlatformBrowser(this.platformId) ?
      this.http.get(`${environment.apiUrl}/blogs/category`).pipe(delay(0)) : null;
  }
}
