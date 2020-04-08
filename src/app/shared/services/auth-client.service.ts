import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('ApiToken')
  })
};

@Injectable({ providedIn: 'root' })
export class AuthClientService {

  constructor(private http: HttpClient) { }

  async localLogin(data) {
    const loginLocal = await this.http.post(`${environment.apiUrl}/api/auth/login`, data);
    return loginLocal;
  }

  async fbLogin() {
    const loginFb = await this.http.get(`${environment.apiUrl}/api/auth/facebook`);
    return loginFb;
  }

  async googleLogin() {
    const loginGG = await this.http.get(`${environment.apiUrl}/api/auth/google`);
    return loginGG;
  }

  logout() {
    localStorage.removeItem('ApiToken');
  }

  async isLoggedIn() {
    const isLogin = await JSON.parse(localStorage.getItem('ApiToken'));
    if (isLogin === null || isLogin === undefined) {
      return 'Bạn chưa đăng nhập';
    } else {
      return isLogin;
    }
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`${environment.apiUrl}/auth/facebook`).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }
}
