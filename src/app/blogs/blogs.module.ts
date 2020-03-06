import { NgModule } from '@angular/core';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { BlogFilterComponent } from './blog-filter/blog-filter.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';
import { BlogBannerComponent } from './blog-banner/blog-banner.component';
import { BlogListComponent } from './blog-list/blog-list.component';

@NgModule({
  imports: [],
  exports: [],
  declarations: [BlogSingleComponent, BlogFilterComponent, BlogCommentComponent, BlogBannerComponent, BlogListComponent]
})
export class BlogsModule {}
