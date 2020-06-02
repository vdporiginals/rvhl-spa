import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipeModule } from '../shared/pipe/pipe.module';
import { SharedModule } from '../shared/shared.module';
import { UserReviewCommentComponent } from './user-review-comment/user-review-comment.component';
import { UserReviewDetailComponent } from './user-review-detail/user-review-detail.component';
import { UserReviewFilterComponent } from './user-review-filter/user-review-filter.component';
import { UserReviewListComponent } from './user-review-list/user-review-list.component';
import { UserReviewRoutingModule } from './user-review-routing.module';
import { UserReviewComponent } from './user-review.component';


@NgModule({
    imports: [
        UserReviewRoutingModule,
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
