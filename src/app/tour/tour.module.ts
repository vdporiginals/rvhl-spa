import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { MaterialModule } from '../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';

import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { AllTourComponent } from './all-tour/all-tour.component';
import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';

@NgModule({
  imports: [
    CommonModule,
    TourRoutingModule,
    MaterialModule,
    FontAwesomeModule,
    NgxPaginationModule
  ],
  declarations: [
    TourComponent,
    TourDetailComponent,
    AllTourComponent,
    ListSingleTourComponent
  ],
  exports: [
    MaterialModule,
    FontAwesomeModule,
    NgxPaginationModule,
    TourDetailComponent,
    AllTourComponent,
    ListSingleTourComponent
  ]
})
export class TourModule { }
