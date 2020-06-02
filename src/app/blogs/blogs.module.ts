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
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogFilterComponent } from './blog-filter/blog-filter.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';

@NgModule({
  imports: [
    BlogsRoutingModule,
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
    BlogsComponent,
    BlogListComponent,
    BlogCommentComponent,
    BlogDetailComponent,
    BlogFilterComponent,
  ],
  exports: [
    FlexLayoutModule
  ],
})
export class BlogsModule { }
