import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getContentHomepage(): Observable<any> {
    const sliderArea = this.http.get(`${environment.apiUrl}/advertises`, {
      params: {
        select: 'title,description,image',
        limit: '3',
        category: 'slider'
      }
    });
    const popularSchedule = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'seo,title,images,createdAt',
        limit: '6',
        category: 'schedule'
      }
    });
    const popularPlace = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,description,images,seo,address',
        limit: '3',
        category: 'food'
      }
    });
    const popularRestaurant = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,description,images,seo,address',
        limit: '3',
        category: 'other'
      }
    });
    const recentBlogs = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,description,images,seo,address',
        limit: '3'
      }
    });
    return forkJoin([
      sliderArea,
      popularSchedule,
      popularPlace,
      popularRestaurant,
      recentBlogs
    ]);
  }

  getBlogs(page, limit): Observable<any> {
    const allBlogs = this.http.get(`${environment.apiUrl}/blogs`, {
      params: {
        select: 'title,description,images,seo,address,createdAt',
        page,
        limit
      }
    });
    // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
    return forkJoin([allBlogs]);
  }

  getBannerPage(queryParams): Observable<any> {
    const bannerPage = this.http.get(`${environment.apiUrl}/advertises`, {
      params: {
        category: queryParams,
        limit: '1'
      }
    });
    return bannerPage;
  }
}
