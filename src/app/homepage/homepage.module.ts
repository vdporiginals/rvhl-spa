import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HomepageComponent } from './homepage.component';
import { SliderAreaComponent } from './slider-area/slider-area.component';
import { TransferComponent } from './transfer/transfer.component';
import { PopularScheduleComponent } from './popular-schedule/popular-schedule.component';
import { PopularPlaceComponent } from './popular-place/popular-place.component';
import { IntroServiceComponent } from './intro-service/intro-service.component';
import { VideoAreaComponent } from './video-area/video-area.component';
import { RecentBlogsComponent } from './recent-blogs/recent-blogs.component';
@NgModule({
  imports: [
    HomepageRoutingModule,
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCarouselModule.forRoot(),
    FontAwesomeModule,
    MatButtonModule
  ],
  declarations: [
    HomepageComponent,
    SliderAreaComponent,
    TransferComponent,
    PopularScheduleComponent,
    PopularPlaceComponent,
    IntroServiceComponent,
    VideoAreaComponent,
    RecentBlogsComponent
  ],
  providers: []
})
export class HomepageModule { }
