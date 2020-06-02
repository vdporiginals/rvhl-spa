import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from '../shared/pipe/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { EstateRoutingModule } from './estate-routing.module';
import { EstateComponent } from './estate.component';
import { HomestayDetailComponent } from './homestay-detail/homestay-detail.component';
import { HomestayComponent } from './homestay/homestay.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelComponent } from './hotel/hotel.component';
import { RightSideFilterComponent } from './right-side-filter/right-side-filter.component';
import { SearchEstateComponent } from './search/search-estate.component';
import { VillaDetailComponent } from './villa-detail/villa-detail.component';
import { VillaComponent } from './villa/villa.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        EstateRoutingModule,
        FontAwesomeModule,
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
    declarations: [
        EstateComponent,
        VillaComponent,
        HomestayComponent,
        HotelComponent,
        HotelDetailComponent,
        VillaDetailComponent,
        HomestayDetailComponent,
        SearchEstateComponent,
        RightSideFilterComponent,
    ],
    providers: []
})
export class EstateModule { }
