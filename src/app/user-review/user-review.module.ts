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
import { UserReviewDetailComponent } from './user-review-detail/user-review-detail.component';
import { UserReviewListComponent } from './user-review-list/user-review-list.component';
import { UserReviewFilterComponent } from './user-review-filter/user-review-filter.component';
import { UserReviewCommentComponent } from './user-review-comment/user-review-comment.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
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
    declarations: [
        UserReviewComponent,
        UserReviewDetailComponent,
        UserReviewListComponent,
        UserReviewFilterComponent,
        UserReviewCommentComponent],
    exports: [
        FlexLayoutModule
    ],
})
export class UserReviewModule { }
