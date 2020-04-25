import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';

import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { AllTourComponent } from './all-tour/all-tour.component';
import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';

@NgModule({
  imports: [
    CommonModule,
    TourRoutingModule,
    FontAwesomeModule,
    NgxPaginationModule,
    SharedModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [
    TourComponent,
    TourDetailComponent,
    AllTourComponent,
    ListSingleTourComponent,
  ],
})
export class TourModule { }
