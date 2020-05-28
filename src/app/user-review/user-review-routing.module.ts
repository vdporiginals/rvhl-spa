import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserReviewComponent } from './user-review.component';
import { UserReviewListComponent } from './user-review-list/user-review-list.component';
import { UserReviewDetailComponent } from './user-review-detail/user-review-detail.component';
import { UserResolve } from './user-review.resolver';
import { UserPostResolve } from './user-review-post.resolver';
const routes: Routes = [
    {
        path: '',
        component: UserReviewComponent,
        children: [
            {
                path: '',
                component: UserReviewListComponent,
                pathMatch: 'full',
                resolve: {
                    userCategory: UserResolve
                },
                data: {
                    queryBanner: 'ReviewPage',
                    //   position: 'Schedule'
                },
            },
            {
                path: ':id/:seo',
                pathMatch: 'full',
                component: UserReviewDetailComponent,
                data: { breadcrumb: '' },
                resolve: {
                    userpost: UserPostResolve
                },
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [UserPostResolve, UserResolve]
})
export class UserReviewRoutingModule { }
