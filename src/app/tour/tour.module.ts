import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { PipeModule } from '../shared/pipe/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { TourVideoComponent } from './tour-detail/tour-video/tour-video.component';
import { TourRightSideComponent } from './tour-right-side/tour-right-side.component';
import { TourRoutingModule } from './tour-routing.module';
import { TourSearchComponent } from './tour-search/tour-search.component';
import { TourComponent } from './tour.component';
import { TransferDetailComponent } from './transfer-detail/transfer-detail.component';
import { TransferListComponent } from './transfer-list/transfer-list.component';
import { TransferSearchComponent } from './transfer-search/transfer-search.component';

@NgModule({
  imports: [
    CommonModule,
    TourRoutingModule,
    FontAwesomeModule,
    FlexLayoutModule,
    OverlayModule,
    MatSelectModule,
    NgxYoutubePlayerModule.forRoot(),
    NgxImageGalleryModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxPaginationModule,
    SharedModule,
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
    ListSingleTourComponent,
    TransferListComponent,
    TransferDetailComponent,
    TourRightSideComponent,
    TourSearchComponent,
    TransferSearchComponent,
    TourVideoComponent
  ],
  providers: []
})
export class TourModule { }
