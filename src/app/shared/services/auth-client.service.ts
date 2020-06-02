import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../user';
import { LocalStorageService } from './local-storage.service';
import { NotificationService } from './notification.service';
import { SharedDataService } from './shared-data.service';
@Injectable({
  providedIn: 'root'
})

export class AuthClientService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private _currentUser: BehaviorSubject<any> = new BehaviorSubject<any>({});
  currentUser = this._currentUser.asObservable();
  constructor(
    private noti: NotificationService,
    private http: HttpClient,
    private sharedData: SharedDataService,
    public router: Router,
    public localStorage: LocalStorageService
  ) { }

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
    const promise = new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiUrl}/auth/login`, user).toPromise().then((res: any) => {
        // Success
        this.localStorage.setItem('access_token', JSON.stringify({ token: res.token, user: res.user }));
        if (this.localStorage.getItem('access_token') !== null) {
          this.sharedData.setLogged(true);
        }
        resolve();
      },
        err => {
          // Error
          reject(err);
        }
      );
    });
    return promise;
  }

  sendToRestApiMethod(token: string, socialData, type: string): void {
    this.http.post(`${environment.apiUrl}/auth/${type}`, { token, socialData })
      .subscribe((res: { token, success, user }) => {
        this.localStorage.setItem('access_token', JSON.stringify({ token: res.token, user: res.user }));
        if (this.localStorage.getItem('access_token') !== null) {
          this.sharedData.setLogged(true);
        }
      }, error => {
        this.noti.showError('Đăng nhập thất bại', error.error.error);
      }, () => {
        this.noti.showSuccess('Đăng nhập Thành công', '');
      });
  }

  getUserToken() {
    return this.localStorage.getItem('access_token');
  }

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
