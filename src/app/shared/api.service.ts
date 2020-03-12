import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  pager: string;

  constructor(private http: HttpClient) {}

  getContentHomepage(): Observable<any> {
    const sliderArea = this.http.get(
      `${environment.apiUrl}/advertises?select=title,description,image&limit=3`
    );
    const popularSchedule = this.http.get(
      `${environment.apiUrl}/blogs?select=seo,title,image,createdAt&limit=6&tags=schedule`
    );
    const popularPlace = this.http.get(
      `${environment.apiUrl}/blogs?select=title,description,image,seo,address&limit=3&tags=place`
    );
    const popularRestaurant = this.http.get(
      `${environment.apiUrl}/blogs?select=title,description,image,seo,address&limit=3&tags=restaurant`
    );
    const recentBlogs = this.http.get(
      `${environment.apiUrl}/blogs?select=title,description,image,seo,address&limit=3`
    );
    return forkJoin([
      sliderArea,
      popularSchedule,
      popularPlace,
      popularRestaurant,
      recentBlogs
    ]);
  }

  getBlogs(): Observable<any> {
    const allBlogs = this.http.get(
      `${
        environment.apiUrl
      }/blogs?select=title,description,image,seo,address,createdAt&page=${this
        .pager || '1'}&limit=5`
    );
    // const typeBlogs = this.http.get(`${this.apiUrl}/blogs?select=title,description,image,seo,address,createdAt&tags=`);
    return forkJoin([allBlogs]);
  }
}
