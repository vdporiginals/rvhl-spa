import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class BlogPostResolve implements Resolve<any> {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private localStorage: LocalStorageService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;
    return isPlatformBrowser(this.platformId) ? this.http
      .get<any>(`${environment.apiUrl}/blogs/${id}`, {
        params: {
          select: 'title,description,image,seo,address,content,comments,keywords',
          status: 'true'
        }
      }).pipe() : null;
  }
}
