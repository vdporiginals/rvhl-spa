import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { delay } from 'rxjs/operators';

@Injectable()
export class TransferDetailResolve implements Resolve<any> {
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private localStorage: LocalStorageService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.params.id;
        return isPlatformBrowser(this.platformId) ? this.http
            .get<any>(`${environment.apiUrl}/transfers/${id}`, {
                params: {
                    select: 'name,description,images,seo,timePerTrip,content,chairNum,locationStart,locationEnd,keywords,schedule,phone',
                    status: 'true'
                }
            }).pipe() : null;
    }
}
