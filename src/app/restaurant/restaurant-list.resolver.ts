import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { delay, map } from 'rxjs/operators';

@Injectable()
export class RestaurantListResolve implements Resolve<any> {
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return isPlatformBrowser(this.platformId) ?
            this.http.get(`${environment.apiUrl}/restaurants`,
                {
                    params: {
                        select: 'name,phone,description,price,address,seo,views,images',
                        status: 'true',
                        limit: '8',
                        sort: '-isPopular,-updatedAt',
                        page: '1'
                    }
                })
                .pipe(map((res: any) => {
                    const result = res.data.map((val) => {
                        const gallery = val.gallery.map(res => {
                            return {
                                url: res,
                                thumbnailUrl: res
                            }
                        });
                        return {
                            _id: val._id,
                            name: val.name,
                            description: val.description,
                            phone: val.phone,
                            address: val.address,
                            price: val.price,
                            roomNum: val.roomNum,
                            seo: val.seo,
                            views: val.views,
                            gallery,
                        };
                    });
                    return { count: res.count, numRecord: res.numRecord, pagination: res.pagination, data: result };
                })) : null;
    }
}
