import { Component, OnInit } from '@angular/core';
import { NavItem } from 'src/app/shared/nav-item';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../user/login/login.component';
import { RegisterComponent } from '../../user/register/register.component';
import { AuthClientService } from 'src/app/shared/services/auth-client.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss']
})
export class NavMobileComponent implements OnInit {
  navItems = NavItem;
  isLoggin: boolean;
  userName;

  constructor(
    private dialog: MatDialog,
    public auth: AuthClientService,
    private sharedData: SharedDataService,
    private localStorage: LocalStorageService) { }
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
}
