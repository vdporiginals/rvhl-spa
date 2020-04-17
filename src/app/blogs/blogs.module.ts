import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsRoutingModule } from './blogs-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SanitizeHtmlPipe } from '../shared/pipe/sanitize-html.pipe';
import { TextOverflowPipe } from '../shared/pipe/text-overflow.pipe';

import { BlogsComponent } from './blogs.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogFilterComponent } from './blog-filter/blog-filter.component';
import { BreadcrumbComponent } from '../layout/breadcrumb/breadcrumb.component';

@NgModule({
  imports: [
    BlogsRoutingModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    FontAwesomeModule,
    NgxPaginationModule,
    FlexLayoutModule,
    MatCarouselModule.forRoot(),
  ],
  declarations: [
    BlogsComponent,
    BlogListComponent,
    BlogCommentComponent,
    BlogDetailComponent,
    BlogFilterComponent,
    BreadcrumbComponent,
    SanitizeHtmlPipe,
    TextOverflowPipe
  ],
  providers: [SanitizeHtmlPipe, TextOverflowPipe]
})
export class BlogsModule { }
