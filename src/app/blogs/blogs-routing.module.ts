import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostResolve } from './blog-detail/blog-post.resolver';
import { BlogResolve } from './blog.resolver';
const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    data: { categoryId: '' },
    children: [
      {
        path: 'lich-trinh',
        component: BlogListComponent,
        data: { category: 'Schedule', categoryId: '' },

        resolve: {
          blogCategory: BlogResolve
        },
      },
      {
        path: 'an-gi',
        component: BlogListComponent,
        data: { category: 'Food', categoryId: '' },
        resolve: {
          blogCategory: BlogResolve
        },
      },
      {
        path: '',
        component: BlogListComponent,
        resolve: {
          blogCategory: BlogResolve
        },
      },
      {
        path: ':id/:seo',
        component: BlogDetailComponent,
        data: {
          breadcrumb: '',
        },
        resolve: {
          blogpost: BlogPostResolve
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [BlogPostResolve, BlogResolve]
})
export class BlogsRoutingModule { }
