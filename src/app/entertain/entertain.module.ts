import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSelectModule } from '@angular/material/select';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../shared/pipe/pipe.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { EntertainComponent } from './entertain.component';
import { EntertainListComponent } from './entertain-list/entertain-list.component';
import { EntertainDetailComponent } from './entertain-detail/entertain-detail.component';
import { EntertainFilterComponent } from './entertain-filter/entertain-filter.component';
import { EntertainRoutingModule } from './entertain-routing.module';
import { EntertainVideoComponent } from './entertain-detail/entertain-video/entertain-video.component';
import { EntertainSearchComponent } from './entertain-search/entertain-search.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        EntertainRoutingModule,
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
    ],
    declarations: [
        EntertainComponent,
        EntertainListComponent,
        EntertainDetailComponent,
        EntertainFilterComponent,
        EntertainVideoComponent,
        EntertainSearchComponent],
})
export class EntertainModule { }

