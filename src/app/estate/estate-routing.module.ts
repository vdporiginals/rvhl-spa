import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstateDetailResolve } from './estate-detail.resolver';
import { EstateListResolve } from './estate-list.resolver';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HomestayDetailComponent } from './homestay-detail/homestay-detail.component';
import { VillaDetailComponent } from './villa-detail/villa-detail.component';
import { HotelComponent } from './hotel/hotel.component';
import { HomestayComponent } from './homestay/homestay.component';
import { VillaComponent } from './villa/villa.component';
import { EstateComponent } from './estate.component';


const routes: Routes = [
    {
        path: '',
        component: EstateComponent,
        children: [
            {
                path: '',
                redirectTo: 'khach-san',
            },
            {
                path: 'khach-san',
                resolve: {
                    estateList: EstateListResolve
                },
                // pathMatch: 'full',
                data: { categoryId: '', breadcrumb: 'Khách sạn', position: 'hotel', queryBanner: 'HotelPage' },
                children: [
                    {
                        path: '',
                        component: HotelComponent,
                    },
                    {
                        path: ':id/:seo',
                        component: HotelDetailComponent,
                        pathMatch: 'full',
                        // resolve: {
                        //     estateDetail: EstateDetailResolve
                        // },
                        data: { breadcrumb: '' },
                    },
                ]
            },
            {
                path: 'homestay',
                resolve: {
                    estateList: EstateListResolve
                },
                data: { categoryId: '', breadcrumb: 'Homestay', queryBanner: 'HomestayPage', position: 'homestay' },
                children: [
                    {
                        path: '',
                        component: HomestayComponent,
                    },
                    {
                        path: ':id/:seo',
                        component: HomestayDetailComponent,
                        pathMatch: 'full',
                        resolve: {
                            estateDetail: EstateDetailResolve
                        },
                        data: { breadcrumb: '' },
                    },
                ]
            },
            {
                path: 'villa',
                resolve: {
                    estateList: EstateListResolve
                },
                data: { categoryId: '', position: 'villa', breadcrumb: 'Villa', queryBanner: 'VillaPage' },
                children: [
                    {
                        path: '',
                        component: VillaComponent,
                    },
                    {
                        path: ':id/:seo',
                        component: VillaDetailComponent,
                        pathMatch: 'full',
                        resolve: {
                            estateDetail: EstateDetailResolve
                        },
                        data: { breadcrumb: '' },
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
    providers: [EstateDetailResolve, EstateListResolve]
})
export class EstateRoutingModule { }
