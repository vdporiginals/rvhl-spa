import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantListResolve } from './restaurant-list.resolver';
import { RestaurantDetailResolve } from './restaurant-detail.resolver';

const routes: Routes = [
    {
        path: '',
        component: RestaurantComponent,
        children: [
            {
                path: '',
                component: RestaurantListComponent,
                pathMatch: 'full',
                resolve: {
                    restaurantList: RestaurantListResolve
                },
            },
            {
                path: ':id/:seo',
                pathMatch: 'full',
                component: RestaurantDetailComponent,
                data: { breadcrumb: '' },
                resolve: {
                    restaurantDetail: RestaurantDetailResolve
                },
            },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [RestaurantListResolve, RestaurantDetailResolve]
})
export class RestaurantRoutingModule { }
