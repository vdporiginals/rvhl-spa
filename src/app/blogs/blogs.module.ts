import { NgModule } from '@angular/core';
import { BlogSingleComponent } from './blog-single/blog-single.component';
import { BlogFilterComponent } from './blog-filter/blog-filter.component';
import { BlogCommentComponent } from './blog-comment/blog-comment.component';

@NgModule({
  imports: [],
  exports: [],
  declarations: [BlogSingleComponent, BlogFilterComponent, BlogCommentComponent]
})
export class BlogsModule {}
