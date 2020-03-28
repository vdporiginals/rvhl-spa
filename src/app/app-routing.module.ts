import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { TourComponent } from './tour/tour.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'tour',
    component: TourComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
