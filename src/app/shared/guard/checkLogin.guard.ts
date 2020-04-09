import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthClientService } from '../services/auth-client.service';

@Injectable({ providedIn: 'root' })
export class AnonymousGuard implements CanActivate {

  constructor(private authClientService: AuthClientService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authClientService.isLoggedIn().then(() => {
        this.router.navigate(['/dashboard']);
        reject(false);
      }).catch(() => {
        resolve(true);
      });
    });
  }
}
