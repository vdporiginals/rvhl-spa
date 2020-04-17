import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})

export class AuthClientService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: any = {};
  constructor(
    private http: HttpClient,
    public router: Router,
    public localStorage: LocalStorageService
  ) { }

  // signInApi() {
  //   return this.httpApi.post<any>(`${environment.apiUrl}/auth/login`,
  //     { email: environment.apiAccount, password: environment.apiPassword }).subscribe((res: any) => {
  //       localStorage.setItem('access_token', res.token);
  //     }, error => {
  //       console.log(error.error);
  //     });
  // }

  // Sign-up
  signUp(user: User): Observable<any> {
    const api = `${environment.apiUrl}/auth/register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Sign-in
  signIn(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, user).subscribe((res: any) => {
      const token = res.token;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      this.localStorage.setItem('access_token', token);
      this.getUserProfile(JSON.parse(jsonPayload).id).subscribe((res) => {
        this.currentUser = res;
      });
    }, error => {
      console.log(error.error);
    });
  }

  sendToRestApiMethod(token: string, socialData, type: string): void {
    console.log(socialData);
    this.http.post(`${environment.apiUrl}/auth/${type}`, { token, socialData })
      .subscribe(success => {
        console.log(success);
        // login was successful
      }, error => {
        console.log(error);
        // login was unsuccessful
        // show an error message
      });
  }

  getUserToken() {
    return this.localStorage.getItem('access_token');
  }

  // getApiToken() {
  //   return localStorage.getItem('api_token');
  // }

  get isLoggedIn(): boolean {
    const authToken = this.localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    const removeToken = this.localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/home']);
    }
  }

  // User profile
  getUserProfile(id): Observable<any> {
    const api = `${environment.apiUrl}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
