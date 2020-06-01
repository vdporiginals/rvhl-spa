import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageRoutingModule } from './homepage-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ShortNumberPipe } from '../shared/pipe/short-num.pipe';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';


import { HomepageComponent } from './homepage.component';
import { SliderAreaComponent } from './slider-area/slider-area.component';
import { TransferComponent } from './transfer/transfer.component';
import { PopularScheduleComponent } from './popular-schedule/popular-schedule.component';
import { PopularPlaceComponent } from './popular-place/popular-place.component';
import { IntroServiceComponent } from './intro-service/intro-service.component';
import { VideoAreaComponent } from './video-area/video-area.component';
import { RecentBlogsComponent } from './recent-blogs/recent-blogs.component';
import { VideoDialogComponent } from './video-area/video-dialog/video-dialog.component';
import { PipeModule } from '../shared/pipe/pipe.module';
import { PopularHotelComponent } from './popular-hotel/popular-hotel.component';
@NgModule({
  imports: [
    HomepageRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    FormsModule,
    FlexLayoutModule,
    AnimateOnScrollModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatCarouselModule.forRoot(),
    FontAwesomeModule,
    MatButtonModule,
    MatAutocompleteModule,
    ScrollToModule.forRoot(),
    PipeModule,
    NgxYoutubePlayerModule.forRoot()
  ],
  declarations: [
    HomepageComponent,
    SliderAreaComponent,
    TransferComponent,
    PopularScheduleComponent,
    PopularPlaceComponent,
    IntroServiceComponent,
    VideoAreaComponent,
    RecentBlogsComponent,
    VideoDialogComponent,
    PopularHotelComponent,
  ],
  providers: [ShortNumberPipe]
})
export class HomepageModule { }

// platformBrowserDynamic().bootstrapMod;
