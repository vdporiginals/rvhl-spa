import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const FB: any;

@Injectable({ providedIn: 'root' })
export class AuthClientService {
  headers;

  constructor(private http: HttpClient) {
    FB.init({
      appId: 'YOUR-APP-ID',
      status: false, // the SDK will attempt to get info about the current user immediately after init
      cookie: false,  // enable cookies to allow the server to access
      // the session
      xfbml: false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
      version: 'v2.8' // use graph api version 2.5
    });
  }

  fbLogin() {
    return new Promise((resolve, reject) => {
      FB.login(result => {
        if (result.authResponse) {
          return this.http.post(`${environment.apiUrl}/auth/facebook`, { access_token: result.authResponse.accessToken })
            .toPromise()
            .then(response => {
              const token = response.headers.get('x-auth-token');
              if (token) {
                localStorage.setItem('id_token', token);
              }
              resolve(response.json());
            })
            .catch(() => reject());
        } else {
          reject();
        }
      }, { scope: 'public_profile,email' });
    });
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().then(user => resolve(true)).catch(() => reject(false));
    });
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      return this.http.get(`${environment.apiUrl}/auth/facebook`).toPromise().then(response => {
        resolve(response.json());
      }).catch(() => reject());
    });
  }
}
