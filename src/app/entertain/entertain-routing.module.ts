import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntertainResolve } from './entertain.resolver';
import { EntertainDetailResolve } from './entertain-detail.resolver';
import { EntertainListComponent } from './entertain-list/entertain-list.component';
import { EntertainDetailComponent } from './entertain-detail/entertain-detail.component';
import { EntertainComponent } from './entertain.component';
const routes: Routes = [
    {
        path: '',
        component: EntertainComponent,
        children: [
            {
                path: '',
                component: EntertainListComponent,
                pathMatch: 'full',
                resolve: {
                    entertainCategory: EntertainResolve
                },
                data: {
                    queryBanner: 'EntertainPage',
                },
            },
            {
                path: ':id/:seo',
                pathMatch: 'full',
                component: EntertainDetailComponent,
                data: { breadcrumb: '' },
                resolve: {
                    entertainDetail: EntertainDetailResolve
                },
            },

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [EntertainResolve, EntertainDetailResolve]
})
export class EntertainRoutingModule { }
