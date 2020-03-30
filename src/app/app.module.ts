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
import { FlexLayoutModule } from '@angular/flex-layout';
import { TourModule } from './tour/tour.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { SubMenuComponent } from './header/nav-item/sub-menu/sub-menu.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { NavItemComponent } from './header/nav-item/nav-item.component';
import { NavSocialComponent } from './header/nav-social/nav-social.component';
import { NavLogoComponent } from './header/nav-logo/nav-logo.component';
import { FooterComponent } from './footer/footer.component';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    NavItemComponent,
    NavSocialComponent,
    NavLogoComponent,
    FooterComponent,
    NavMobileComponent,
    SubMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HammerModule,
    TourModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatListModule
  ],

  // tslint:disable-next-line: deprecation
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
