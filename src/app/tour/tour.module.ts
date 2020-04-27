import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { ShortNumberPipe } from '../shared/pipe/short-num.pipe';

import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';
import { PipeModule } from '../shared/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    TourRoutingModule,
    FontAwesomeModule,
    NgxPaginationModule,
    SharedModule,
    PipeModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
  ],
  declarations: [
    TourComponent,
    TourDetailComponent,
    ListSingleTourComponent
  ],
  providers: []
})
export class TourModule { }
