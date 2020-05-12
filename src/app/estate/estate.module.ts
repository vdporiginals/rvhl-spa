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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EstateRoutingModule } from './estate-routing.module';

import { PipeModule } from '../shared/pipe/pipe.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LightboxModule } from 'ngx-lightbox';
import { HotelComponent } from './hotel/hotel.component';
import { VillaComponent } from './villa/villa.component';
import { HomestayComponent } from './homestay/homestay.component';
import { EstateComponent } from './estate.component';
import { RouterModule } from '@angular/router';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { VillaDetailComponent } from './villa-detail/villa-detail.component';
import { HomestayDetailComponent } from './homestay-detail/homestay-detail.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        EstateRoutingModule,
        FontAwesomeModule,
        NgxPaginationModule,
        SharedModule,
        FormsModule,
        FlexLayoutModule,
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
        EstateComponent,
        VillaComponent,
        HomestayComponent,
        HotelComponent,
        HotelDetailComponent,
        VillaDetailComponent,
        HomestayDetailComponent,
    ],
    providers: []
})
export class EstateModule { }
