import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module';
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
import { SanitizeHtmlPipe } from '../shared/pipe/sanitize-html.pipe';
import { TextOverflowPipe } from '../shared/pipe/text-overflow.pipe';

import { BlogsComponent } from './blogs.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogFilterComponent } from './blog-filter/blog-filter.component';
import { SharedModule } from '../shared/shared.module';
import { ShareButtonComponent } from './blog-detail/share-facebook.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { PipeModule } from '../shared/pipe/pipe.module';

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
    ShareButtonComponent,
    BlogCommentComponent,
    BlogDetailComponent,
    BlogFilterComponent,
  ],
  exports: [
    FlexLayoutModule
  ],
})
export class BlogsModule { }
