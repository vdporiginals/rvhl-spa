import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) { }

  getContentHomepage(): Observable<any> {
    const sliderArea = this.http.get(`${environment.apiUrl}/homepage/slider`, {
      params: {
        select: 'title,description,image',
        // sort: '-isPopular,-createdAt',
        limit: '3',
        status: 'true'
      }
    });
    const popularFood = this.http.get(`${environment.apiUrl}/restaurants`, {
      params: {
        select: 'seo,name,image,createdAt',
        sort: '-isPopular,-updatedAt',
        limit: '6',
        status: 'true',
      }
    });
    const popularHotel = this.http.get(`${environment.apiUrl}/homepage/popular-estates`, {
      params: {
        select: 'name,address,image,phone,seo,time,price',
        sort: '-isPopular,-updatedAt',
        limit: '6',
        status: 'true'
      }
    });
    const popularCruise = this.http.get(`${environment.apiUrl}/tours`, {
      params: {
        select: 'title,address,image,phone,seo,time,price',
        limit: '6',
        sort: '-isPopular,-updatedAt',
        status: 'true'
      }
    });
    const recentBlogs = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,description,image,seo,address,createdAt',
        limit: '4',
        sort: '-isPopular,-updatedAt',
        status: 'true'
      }
    });
    const videoBg = this.http.get(`${environment.apiUrl}/homepage/video-banner`, {
      params: {
        select: 'image,seo,image,link',
        status: 'true'
      }
    });
    const advertiseHomepage = this.http.get(`${environment.apiUrl}/homepage/advertise-banner`, { params: { status: 'true' } });
    return forkJoin([
      sliderArea,
      popularFood,
      popularHotel,
      popularCruise,
      recentBlogs,
      videoBg,
      advertiseHomepage,
    ]);
  }

  // getBlogs(page, limit): Observable<any> {
  //   const allBlogs = this.http.get(`${environment.apiUrl}/blogs`, {
  //     params: {
  //       select: 'title,description,image,seo,address,createdAt',
  //       page,
  //       limit,
  //       status: 'true'
  //     }
  //   });
  //   // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
  //   return allBlogs;
  // }

  getFilter(): Observable<any> {
    const recentBlogs = this.http.get<any>(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,image,seo,createdAt',
        limit: '5',
        status: 'true'
      }
    });
    const blogCategory = this.http.get<any>(`${environment.apiUrl}/blogs/category`);
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select: 'fbPage,fbGroup'
      }
    });
    // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
    return forkJoin([recentBlogs, blogCategory, fbPlugin]);
  }

  getFilterReview(): Observable<any> {
    const recentBlogs = this.http.get<any>(`${environment.apiUrl}/user-reviews`, {
      params: {
        select: 'title,image,seo,createdAt',
        limit: '5',
        status: 'true'
      }
    });
    const blogCategory = this.http.get<any>(`${environment.apiUrl}/user-reviews/category`);
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select: 'fbPage,fbGroup'
      }
    });
    // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
    return forkJoin([recentBlogs, blogCategory, fbPlugin]);
  }

  getFilterTour(type?): Observable<any> {
    const recentTours = this.http.get<any>(`${environment.apiUrl}/tours`, {
      params: {
        select: 'title,image,seo,price,createdAt',
        limit: '3',
        status: 'true'
      }
    });
    const tourCategory = this.http.get<any>(`${environment.apiUrl}/${type}/category`);
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select: 'fbPage,fbGroup'
      }
    });

    // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
    return forkJoin([recentTours, tourCategory, fbPlugin]);
  }

  getFilterEntertain(type?): Observable<any> {
    const recentEntertains = this.http.get<any>(`${environment.apiUrl}/${type}`, {
      params: {
        select: 'name,image,seo,price,createdAt',
        limit: '3',
        status: 'true'
      }
    });
    const entertainCategory = this.http.get<any>(`${environment.apiUrl}/${type}/category`);
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select: 'fbPage,fbGroup'
      }
    });

    // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
    return forkJoin([recentEntertains, entertainCategory, fbPlugin]);
  }

  getBannerPage(queryParams): Observable<any> {
    const bannerPage = this.http.get(`${environment.apiUrl}/advertises`, {
      params: {
        pagePosition: queryParams,
        typeAdvertise: 'BannerPage',
        limit: '1',
        select: 'image,title',
        status: 'true'
      }
    });
    return bannerPage;
  }

  searchByName(text, apiName) {
    return this.http.get(`${environment.apiUrl}/${apiName}`, {
      params: {
        select: 'seo,title',
        title: text,
        limit: '10',
        status: 'true'
      }
    });
  }

  getFilterEstate(type): Observable<any> {
    const recentPost = this.http.get<any>(`${environment.apiUrl}/estates/${type}`, {
      params: {
        select: 'name,image,seo,price,createdAt',
        limit: '3',
        status: 'true'
      }
    });
    const estateCategory = this.http.get<any>(`${environment.apiUrl}/estates/category/${type}`);
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select: 'fbPage,fbGroup'
      }
    });
    // const recentReviews = this.http.get<any>(`${environment.apiUrl}/blogs`, {
    //   params: {
    //     select: 'title,images,seo,createdAt',
    //     limit: '3',
    //     // status: 'true'
    //   }
    // });
    return forkJoin([recentPost, estateCategory, fbPlugin]);
  }

  getFilterRestaurant(): Observable<any> {
    const recentPost = this.http.get<any>(`${environment.apiUrl}/restaurants`, {
      params: {
        select: 'name,image,seo,price,createdAt',
        limit: '3',
        status: 'true'
      }
    });
    const restaurantCategory = this.http.get<any>(`${environment.apiUrl}/restaurants/category`);
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select: 'fbPage,fbGroup'
      }
    });
    return forkJoin([recentPost, restaurantCategory, fbPlugin]);
  }

  getFbPlugin(select): Observable<any> {
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select
      }
    });
    return fbPlugin;
  }

  postCheckRoom(data, token): Observable<any> {
    const api = `${environment.apiUrl}/estates/check-room`;
    return this.http.post(api, data, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAdvertisePage(page): Observable<any> {
    const advPage = this.http.get<any>(`${environment.apiUrl}/advertises`, {
      params: {
        pagePosition: 'SchedulePage',
        typeAdvertise: 'Advertise'
      }
    });
    return advPage;
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.message;
    } else {
      // server-side error
      if (error.status === 429) {
        msg = 'Bạn gửi quá nhiều yêu cầu! Xin hãy đợi ít phút để gửi lại';
      } else {

        msg = `Error Code: ${error.status}\nMessage: ${error.error.error}`;
      }
    }
    return throwError(msg);
  }
}
