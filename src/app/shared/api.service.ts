import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  apiUrl = 'http://52.230.29.177/api';

  constructor(private http: HttpClient) {}

  getContentHomepage(): Observable<any> {
    const sliderArea = this.http.get(
      `${this.apiUrl}/advertises?select=title,description,image&limit=3`
    );
    const popularSchedule = this.http.get(
      `${this.apiUrl}/blogs?select=seo,title,image,createdAt&limit=6&tags=schedule`
    );
    const popularPlace = this.http.get(
      `${this.apiUrl}/blogs?select=title,description,image,seo,address&limit=3&tags=place`
    );
    const popularRestaurant = this.http.get(
      `${this.apiUrl}/blogs?select=title,description,image,seo,address&limit=3&tags=restaurant`
    );
    // const response4 = this.http.get(apiUrl + '1940345/');
    return forkJoin([
      sliderArea,
      popularSchedule,
      popularPlace,
      popularRestaurant
    ]);
  }
}
