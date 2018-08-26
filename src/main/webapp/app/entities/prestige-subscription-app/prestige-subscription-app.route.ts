import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrestigeSubscriptionApp } from 'app/shared/model/prestige-subscription-app.model';
import { PrestigeSubscriptionAppService } from './prestige-subscription-app.service';
import { PrestigeSubscriptionAppComponent } from './prestige-subscription-app.component';
import { PrestigeSubscriptionAppDetailComponent } from './prestige-subscription-app-detail.component';
import { PrestigeSubscriptionAppUpdateComponent } from './prestige-subscription-app-update.component';
import { PrestigeSubscriptionAppDeletePopupComponent } from './prestige-subscription-app-delete-dialog.component';
import { IPrestigeSubscriptionApp } from 'app/shared/model/prestige-subscription-app.model';

@Injectable({ providedIn: 'root' })
export class PrestigeSubscriptionAppResolve implements Resolve<IPrestigeSubscriptionApp> {
    constructor(private service: PrestigeSubscriptionAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((prestigeSubscription: HttpResponse<PrestigeSubscriptionApp>) => prestigeSubscription.body));
        }
        return of(new PrestigeSubscriptionApp());
    }
}

export const prestigeSubscriptionRoute: Routes = [
    {
        path: 'prestige-subscription-app',
        component: PrestigeSubscriptionAppComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prestigeApp.prestigeSubscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestige-subscription-app/:id/view',
        component: PrestigeSubscriptionAppDetailComponent,
        resolve: {
            prestigeSubscription: PrestigeSubscriptionAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.prestigeSubscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestige-subscription-app/new',
        component: PrestigeSubscriptionAppUpdateComponent,
        resolve: {
            prestigeSubscription: PrestigeSubscriptionAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.prestigeSubscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'prestige-subscription-app/:id/edit',
        component: PrestigeSubscriptionAppUpdateComponent,
        resolve: {
            prestigeSubscription: PrestigeSubscriptionAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.prestigeSubscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const prestigeSubscriptionPopupRoute: Routes = [
    {
        path: 'prestige-subscription-app/:id/delete',
        component: PrestigeSubscriptionAppDeletePopupComponent,
        resolve: {
            prestigeSubscription: PrestigeSubscriptionAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.prestigeSubscription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
