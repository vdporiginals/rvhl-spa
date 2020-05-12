import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourRoutingModule } from './tour-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';
import { PipeModule } from '../shared/pipe/pipe.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LightboxModule } from 'ngx-lightbox';
@NgModule({
  imports: [
    CommonModule,
    TourRoutingModule,
    FontAwesomeModule,
    NgxPaginationModule,
    SharedModule,
    FormsModule,
    LightboxModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    PipeModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatCarouselModule.forRoot(),
  ],
  declarations: [
    TourComponent,
    TourDetailComponent,
    ListSingleTourComponent
  ],
  providers: []
})
export class TourModule { }
