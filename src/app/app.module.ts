import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { NavItemComponent } from './header/nav-item/nav-item.component';
import { NavSocialComponent } from './header/nav-social/nav-social.component';
import { NavLogoComponent } from './header/nav-logo/nav-logo.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SliderAreaComponent } from './homepage/slider-area/slider-area.component';
import { TransferComponent } from './homepage/transfer/transfer.component';
import { PopularScheduleComponent } from './homepage/popular-schedule/popular-schedule.component';
import { PopularPlaceComponent } from './homepage/popular-place/popular-place.component';
import { IntroServiceComponent } from './homepage/intro-service/intro-service.component';

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
    HomepageComponent,
    BlogsComponent,
    SliderAreaComponent,
    TransferComponent,
    PopularScheduleComponent,
    PopularPlaceComponent,
    IntroServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    HttpClientModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
