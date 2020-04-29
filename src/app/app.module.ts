import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerModule
} from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from './layout/layout.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HeaderModule } from './layout/header/header.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomepageModule } from './homepage/homepage.module';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ApiAuthInterceptor } from './shared/interceptors/api-auth.interceptor';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavItemComponent } from './layout/header/nav-item/nav-item.component';
import { NavSocialComponent } from './layout/header/nav-social/nav-social.component';
import { NavLogoComponent } from './layout/header/nav-logo/nav-logo.component';
import { NavMobileComponent } from './layout/header/nav-mobile/nav-mobile.component';
import { SubMobileComponent } from './layout/header/nav-mobile/sub-menu/sub-menu.component';
import { SubMenuComponent } from './layout/header/nav-item/sub-menu/sub-menu.component';
import { LocalStorageService } from './shared/services/local-storage.service';
import { ContactPageComponent } from './layout/contact-page/contact-page.component';
import { MyLoaderComponent } from './layout/my-loader/my-loader.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookId)
  }
]);
export function provideConfig() {
  return config;
}

export function initApp(http: HttpClient, localStorage: LocalStorageService) {
  return () => {
    if (localStorage.getItem('api_token') === null || localStorage.getItem('api_token') === undefined) {
      return http.get(`${environment.apiUrl}/auth-app`, {
        params: {
          appId: environment.appId,
          email: environment.userName,
          password: environment.password
        }
      })
        .toPromise()
        .then((res: any) => {
          localStorage.setItem('api_token', res.token);
        });
    } else {
      return localStorage.getItem('api_token');
    }

  };
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavItemComponent,
    NavSocialComponent,
    NavLogoComponent,
    NavMobileComponent,
    SubMobileComponent,
    SubMenuComponent,
    ContactPageComponent,
    MyLoaderComponent
  ],
  imports: [
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LocalStorageService]
      },
      config: {
        whitelistedDomains: ['localhost:5001'],
        blacklistedRoutes: ['http://localhost:5001/auth/login']
      }
    }),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HammerModule,
    MatMenuModule,
    MatSidenavModule,
    LayoutModule,
    HeaderModule,
    HomepageModule,
    SocialLoginModule,
    MatProgressBarModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
    }),
    FlexLayoutModule.withConfig({ ssrObserveBreakpoints: ['xs', 'lt-md'] })
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiAuthInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [HttpClient, LocalStorageService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function jwtOptionsFactory(localService) {
  return {
    tokenGetter: () => {
      return localService.getItem('api_token');
    }
  }
}
