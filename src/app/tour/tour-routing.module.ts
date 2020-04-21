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
    data: { category: 'Transfer', breadcrumb: 'Di chuyển', queryBanner: 'bannerTransfer' }
  },
  {
    path: 'khach-san',
    component: ListSingleTourComponent,
    data: { category: 'Hotel', breadcrumb: 'Khách sạn', queryBanner: 'bannerHotel' }
  },
  {
    path: 'ha-long-bay-tour',
    component: ListSingleTourComponent,
    data: { category: 'BayTour', breadcrumb: 'Vịnh', queryBanner: 'bannerBay' }
  },
  {
    path: 'tron-goi',
    component: ListSingleTourComponent,
    data: { category: 'AllInOne', breadcrumb: 'Trọn gói', queryBanner: 'bannerTour' }
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TourRoutingModule { }
