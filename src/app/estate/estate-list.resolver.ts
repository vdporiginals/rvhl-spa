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
        let position = route.data.position;

        // console.log(route.firstChild.data.position);
        // if (route.data.position === undefined) {
        //     position = route.data.position;
        // } else {
        //     position = route.firstChild.data.position;
        // }
        return isPlatformBrowser(this.platformId) ?
            this.http.get(`${environment.apiUrl}/estates/${position}`,
                { params: { select: 'name,phone,description,price,roomNum,seo,views,images' } })
                .pipe(map((res: any) => {
                    const result = res.data.map((val) => {
                        const images = val.images.map(res => {
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
                            price: val.price,
                            roomNum: val.roomNum,
                            seo: val.seo,
                            views: val.views,
                            images,
                        };
                    });
                    return result;
                })) : null;
    }
}
