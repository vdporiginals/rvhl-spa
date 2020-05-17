import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) { }

  getContentHomepage(): Observable<any> {
    const sliderArea = this.http.get(`${environment.apiUrl}/homepage/slider`, {
      params: {
        select: 'title,description,image',
        limit: '3',
        status: 'true'
      }
    });
    const popularSchedule = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'seo,title,images,createdAt',
        limit: '3',
        position: 'Schedule'
        // status: 'false'
      }
    });
    const popularFood = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'seo,title,images,createdAt',
        limit: '3',
        position: 'Food',
        // status: 'false'
      }
    });
    const popularHotel = this.http.get(`${environment.apiUrl}/homepage/popular-hotel`, {
      params: {
        select: 'name,address,images,phone,seo,time,price',
        limit: '2',
        status: 'true'
      }
    });
    const popularCruise = this.http.get(`${environment.apiUrl}/tours`, {
      params: {
        select: 'title,address,images,phone,seo,time,price',
        limit: '6',
        // status: 'true'
      }
    });
    const recentBlogs = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,description,images,seo,address,createdAt',
        limit: '4',
        status: 'true'
      }
    });
    const videoBg = this.http.get(`${environment.apiUrl}/homepage/video-banner`, {
      params: {
        select: 'images,seo,image,link',
        status: 'true'
      }
    });
    const advertiseHomepage = this.http.get(`${environment.apiUrl}/homepage/advertise-banner`, { params: { status: 'true' } });
    const popularHomestay = this.http.get(`${environment.apiUrl}/estates/homestay`, {
      params: {
        select: 'name,address,images,phone,seo,time,price',
        limit: '2',
        status: 'true',
        isPopular: 'true'
      }
    });
    const popularVilla = this.http.get(`${environment.apiUrl}/estates/villa`, {
      params: {
        select: 'name,address,images,phone,seo,time,price',
        limit: '2',
        status: 'true',
        isPopular: 'true'
      }
    });
    return forkJoin([
      sliderArea,
      popularSchedule,
      popularFood,
      popularHotel,
      popularCruise,
      recentBlogs,
      videoBg,
      advertiseHomepage,
      popularHomestay,
      popularVilla
    ]);
  }

  getBlogs(page, limit): Observable<any> {
    const allBlogs = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,description,images,seo,address,createdAt',
        page,
        limit,
        status: 'true'
      }
    });
    // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
    return forkJoin([allBlogs]);
  }

  getFilter(): Observable<any> {
    const recentBlogs = this.http.get<any>(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,images,seo,createdAt',
        limit: '5',
        status: 'true'
      }
    });
    const blogCategory = this.http.get<any>(`${environment.apiUrl}/blogs/category`);
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`);
    // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
    return forkJoin([recentBlogs, blogCategory, fbPlugin]);
  }

  getFilterTour(type?): Observable<any> {
    const recentTours = this.http.get<any>(`${environment.apiUrl}/tours`, {
      params: {
        select: 'title,images,seo,price,createdAt',
        limit: '3',
        // status: 'true'
      }
    });
    const tourCategory = this.http.get<any>(`${environment.apiUrl}/${type}/category`);
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select: 'fbPage'
      }
    });
    const recentReviews = this.http.get<any>(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,images,seo,createdAt',
        limit: '3',
        // status: 'true'
      }
    });
    // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
    return forkJoin([recentTours, tourCategory, fbPlugin, recentReviews]);
  }

  getBannerPage(queryParams): Observable<any> {
    const bannerPage = this.http.get(`${environment.apiUrl}/advertises`, {
      params: {
        page: queryParams,
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
      }
    });
  }

  getFilterEstate(type): Observable<any> {
    const recentPost = this.http.get<any>(`${environment.apiUrl}/estates/${type}`, {
      params: {
        select: 'name,images,seo,price,createdAt',
        limit: '3',
        // status: 'true'
      }
    });
    const estateCategory = this.http.get<any>(`${environment.apiUrl}/estates/category/${type}`);
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select: 'fbPage'
      }
    });
    const recentReviews = this.http.get<any>(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,images,seo,createdAt',
        limit: '3',
        // status: 'true'
      }
    });
    return forkJoin([recentPost, estateCategory, fbPlugin, recentReviews]);
  }

  getFbPlugin(select): Observable<any> {
    const fbPlugin = this.http.get<any>(`${environment.apiUrl}/web-config`, {
      params: {
        select
      }
    });
    return fbPlugin;
  }
}
