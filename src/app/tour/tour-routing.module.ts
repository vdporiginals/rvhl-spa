import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ListSingleTourComponent } from './list-single-tour/list-single-tour.component';
import { TourComponent } from './tour.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';
import { TourResolve } from './tour.resolver';
import { TourDetailResolve } from './tour-detail/tour-detail.resolver';
import { TransferResolve } from './transfer.resolver';
import { TransferDetailComponent } from './transfer-detail/transfer-detail.component';
import { TransferDetailResolve } from './transfer-detail/transfer-detail.resolver';
import { TransferListComponent } from './transfer-list/transfer-list.component';

const routes: Routes = [
  {
    path: '',
    component: TourComponent,
    children: [
      {
        path: '',
        redirectTo: 'ha-long-bay-tour',
        resolve: {
          tourCategory: TourResolve
        },
      },
      {
        path: 'di-chuyen',
        component: TransferListComponent,
        resolve: {
          transferList: TransferResolve
        },
        data: { category: 'Transfer', categoryId: '', breadcrumb: 'Di chuyển', queryBanner: 'TransferPage' },
        children: [
          {
            path: '',
            component: TransferListComponent
          },
          {
            path: ':id/:seo',
            pathMatch: 'full',
            component: TransferDetailComponent,
            data: { breadcrumb: '' },
            resolve: {
              transferDetail: TransferDetailResolve
            },
          },
        ]
      },
      {
        path: 'ha-long-bay-tour',
        // component: ListSingleTourComponent,
        resolve: {
          tourCategory: TourResolve
        },
        data: { position: 'TourCruise', categoryId: '', breadcrumb: 'Tour vịnh', queryBanner: 'TourCruisePage' },
        children: [
          {
            path: '',
            component: ListSingleTourComponent
          },
          {
            path: ':id/:seo',
            pathMatch: 'full',
            component: TourDetailComponent,
            data: { breadcrumb: '' },
            resolve: {
              tourpost: TourDetailResolve
            },
          },
        ]
      },
      {
        path: 'tron-goi',
        resolve: {
          tourCategory: TourResolve
        },
        data: { position: 'TourAll', categoryId: '', breadcrumb: 'Trọn gói', queryBanner: 'TourAllPage' },
        children: [
          {
            path: '',
            component: ListSingleTourComponent
          },
          {
            path: ':id/:seo',
            component: TourDetailComponent,
            data: { breadcrumb: '' },
            resolve: {
              tourpost: TourDetailResolve
            },
          },
        ]
      },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TourDetailResolve, TourResolve, TransferResolve,
    TransferDetailResolve]
})
export class TourRoutingModule { }
