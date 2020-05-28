import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { PipeModule } from '../shared/pipe/pipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

import { RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantRightComponent } from './restaurant-right/restaurant-right.component';
import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RestaurantRoutingModule,
        FontAwesomeModule,
        MatDividerModule,
        NgxImageGalleryModule,
        NgxPaginationModule,
        SharedModule,
        FormsModule,
        FlexLayoutModule,
        MatInputModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSelectModule,
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
    declarations: [RestaurantComponent, RestaurantListComponent, RestaurantDetailComponent, RestaurantRightComponent, RestaurantSearchComponent],
    providers: []
})
export class RestaurantModule { }
