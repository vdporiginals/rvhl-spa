import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class EstateListResolve implements Resolve<any> {
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const position = route.data.position;
        return isPlatformBrowser(this.platformId) ?
            this.http.get(`${environment.apiUrl}/estates/${position}`,
                {
                    params: {
                        select: 'name,phone,description,price,address,roomNum,seo,views,image',
                        status: 'true',
                        sort: '-isPopular,-updatedAt',
                        limit: '8',
                        page: '1'
                    }
                })
                .pipe(map((res: any) => {
                    return { count: res.count, numRecord: res.numRecord, pagination: res.pagination, data: res.data };
                })) : null;
    }
}
