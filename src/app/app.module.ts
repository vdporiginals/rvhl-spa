import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from './layout/layout.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderModule } from './layout/header/header.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomepageModule } from './homepage/homepage.module';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MessageComponent } from './message/message.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavItemComponent } from './layout/header/nav-item/nav-item.component';
import { NavSocialComponent } from './layout/header/nav-social/nav-social.component';
import { NavLogoComponent } from './layout/header/nav-logo/nav-logo.component';
import { NavMobileComponent } from './layout/header/nav-mobile/nav-mobile.component';
import { SubMobileComponent } from './layout/header/nav-mobile/sub-menu/sub-menu.component';
import { SubMenuComponent } from './layout/header/nav-item/sub-menu/sub-menu.component';

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

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    MessageComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavItemComponent,
    NavSocialComponent,
    NavLogoComponent,
    NavMobileComponent,
    SubMobileComponent,
    SubMenuComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
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
    FlexLayoutModule.withConfig({ ssrObserveBreakpoints: ['xs', 'lt-md'] })
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
