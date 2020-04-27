import { Component, OnInit } from '@angular/core';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../user/login/login.component';
import { RegisterComponent } from '../../user/register/register.component';
import { AuthClientService } from 'src/app/shared/services/auth-client.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
@Component({
  selector: 'app-nav-social',
  templateUrl: './nav-social.component.html',
  styleUrls: ['./nav-social.component.scss']
})
export class NavSocialComponent implements OnInit {
  faFacebookMessenger = faFacebookMessenger;
  faEnvelope = faEnvelope;
  faFacebook = faFacebook;
  isLoggin: boolean;
  userName;

  constructor(
    private dialog: MatDialog,
    public auth: AuthClientService,
    private localStorage: LocalStorageService,
    public router: Router,
    private sharedData: SharedDataService) { }

  loginDialog() {
    this.dialog.open(LoginComponent);
  }

  registerDialog() {
    this.dialog.open(RegisterComponent);
  }

  logout() {
    this.auth.doLogout();
    this.isLoggin = false;
    this.sharedData.setLogged(false);
  }

  ngOnInit(): void {
    this.sharedData.isLogged.subscribe((isLogged) => {
      const hasLogin = this.localStorage.getItem('access_token');
      if (hasLogin === null || hasLogin === undefined) {
        this.isLoggin = isLogged;
      } else {
        this.isLoggin = true;
        this.userName = JSON.parse(hasLogin).user;
      }
    });
  }
}
