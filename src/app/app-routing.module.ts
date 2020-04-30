import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProfileComponent } from './layout/user/profile/profile.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'reviews', loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule),

    data: {
      breadcrumb: 'Review',
      queryBanner: 'bannerReview'
    },
  },
  {
    path: 'tour', loadChildren: () => import('./tour/tour.module').then(m => m.TourModule),
    data: {
      breadcrumb: 'tour',
      queryBanner: 'bannerTour'
    },
  },
  { path: 'profile', component: ProfileComponent, data: { userId: '' }, canActivate: [AuthGuard] },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
