import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'blogs',
    loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule)
  },
  { path: '', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) },
  {
    path: 'tour',
    loadChildren: () => import('./tour/tour.module').then(m => m.TourModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
