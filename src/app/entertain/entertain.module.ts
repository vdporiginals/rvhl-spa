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
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { PipeModule } from '../shared/pipe/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { EntertainDetailComponent } from './entertain-detail/entertain-detail.component';
import { EntertainVideoComponent } from './entertain-detail/entertain-video/entertain-video.component';
import { EntertainFilterComponent } from './entertain-filter/entertain-filter.component';
import { EntertainListComponent } from './entertain-list/entertain-list.component';
import { EntertainRoutingModule } from './entertain-routing.module';
import { EntertainSearchComponent } from './entertain-search/entertain-search.component';
import { EntertainComponent } from './entertain.component';

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

