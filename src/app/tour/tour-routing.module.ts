import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TourComponent,
    children: [{ path: ':id/:seo', component: TourDetailComponent }]
  },
  {
    path: 'di-chuyen',
    component: ListSingleTourComponent,
    data: { category: 'Transfer' }
  },
  {
    path: 'khach-san',
    component: ListSingleTourComponent,
    data: { category: 'Hotel' }
  },
  {
    path: 'ha-long-bay-tour',
    component: ListSingleTourComponent,
    data: { category: 'BayTour' }
  },
  {
    path: 'tron-goi',
    component: ListSingleTourComponent,
    data: { category: 'AllInOne' }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TourRoutingModule { }
