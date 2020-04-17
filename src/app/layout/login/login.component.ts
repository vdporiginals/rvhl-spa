
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AuthClientService } from 'src/app/shared/services/auth-client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

interface DataLogin {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: DataLogin = {};
  faGoogle = faGoogle;
  faFacebook = faFacebook;
  signinForm: FormGroup;
  title = 'angular-fblogin';
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    public fb: FormBuilder,
    public jwtHelper: JwtHelperService,
    public authService: AuthClientService,
    private authSocialService: AuthService,
    public router: Router,
    public localStorage: LocalStorageService
  ) {

    this.signinForm = this.fb.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
    if (this.jwtHelper.isTokenExpired()) {
      this.localStorage.removeItem('access_token');
    }

    // if (localStorage.fbToken) {
    //   this.loggedIn = true;
    // }
    // this.authSocialService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   console.log(this.user);
    // });
  }

  signInWithFB(): void {
    this.authSocialService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (userData) => {
        this.authService.sendToRestApiMethod(userData.authToken, userData.facebook, 'facebook');
      });
  }

  signInWithGG(): void {
    this.authSocialService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (userData) => {
        console.log(userData);
        this.authService.sendToRestApiMethod(userData.idToken, {
          google: {
            id: userData.id,
            name: userData.name,
            avatar: userData.photoUrl,
            email: userData.email
          }
        }, 'google');
      });
  }

  public closeMe() {
    this.dialogRef.close();
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value);
    if (this.localStorage.getItem('access_token') !== undefined || this.localStorage.getItem('access_token') !== null) {
      this.closeMe();
    }
    // this.closeMe();
  }
}
