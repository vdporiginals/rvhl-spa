
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AuthClientService } from 'src/app/shared/services/auth-client.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

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
    private noti: NotificationService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private authSocialService: AuthService,
    private sharedData: SharedDataService,
    public fb: FormBuilder,
    public jwtHelper: JwtHelperService,
    public authService: AuthClientService,
    public router: Router,
    public localStorage: LocalStorageService
  ) {

  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    });

    this.sharedData.isLogged.subscribe((isLogged) => {
      if (isLogged === true) {
        this.closeMe();
      } else {
        console.log(isLogged);
      }
    });

    if (this.jwtHelper.isTokenExpired()) {
      this.localStorage.removeItem('access_token');
    }
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

  private closeMe() {
    this.dialogRef.close();
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value).then(res => {
      this.noti.showSuccess('Đăng nhập Thành công', '');
    }).catch(error => {
      this.noti.showError('Đăng nhập Thất bại', error.error.error);
    });
  }
}
