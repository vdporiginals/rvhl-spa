import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
  HammerModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GestureConfig } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from './layout/layout.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderModule } from './layout/header/header.module';
// import { JwtModule } from '@auth0/angular-jwt';

// export function tokenGetter() {
//   return localStorage.getItem('access_token');
// }

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
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HammerModule,
    MatMenuModule,
    MatSidenavModule,
    LayoutModule,
    HeaderModule
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter,
    //     whitelistedDomains: ['localhost:5001'],
    //     throwNoTokenError: true
    //   }
    // })

  ],

  // tslint:disable-next-line: deprecation
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
