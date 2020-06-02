import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TransferResolve implements Resolve<any> {
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private localStorage: LocalStorageService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return isPlatformBrowser(this.platformId) ?
            this.http.get(`${environment.apiUrl}/transfers/category`, { params: { select: 'name,description,keywords' } }) : null;
    }
}
