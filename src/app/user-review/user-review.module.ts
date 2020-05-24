import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { PipeModule } from '../shared/pipe/pipe.module';
import { UserReviewComponent } from './user-review.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        FontAwesomeModule,
        NgxPaginationModule,
        SharedModule,
        PipeModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatCarouselModule.forRoot(),
    ],
    declarations: [UserReviewComponent],
    exports: [
        FlexLayoutModule
    ],
})
export class UserReviewModule { }
