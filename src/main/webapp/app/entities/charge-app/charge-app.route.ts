import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChargeApp } from 'app/shared/model/charge-app.model';
import { ChargeAppService } from './charge-app.service';
import { ChargeAppComponent } from './charge-app.component';
import { ChargeAppDetailComponent } from './charge-app-detail.component';
import { ChargeAppUpdateComponent } from './charge-app-update.component';
import { ChargeAppDeletePopupComponent } from './charge-app-delete-dialog.component';
import { IChargeApp } from 'app/shared/model/charge-app.model';

@Injectable({ providedIn: 'root' })
export class ChargeAppResolve implements Resolve<IChargeApp> {
    constructor(private service: ChargeAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((charge: HttpResponse<ChargeApp>) => charge.body));
        }
        return of(new ChargeApp());
    }
}

export const chargeRoute: Routes = [
    {
        path: 'charge-app',
        component: ChargeAppComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prestigeApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'charge-app/:id/view',
        component: ChargeAppDetailComponent,
        resolve: {
            charge: ChargeAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'charge-app/new',
        component: ChargeAppUpdateComponent,
        resolve: {
            charge: ChargeAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'charge-app/:id/edit',
        component: ChargeAppUpdateComponent,
        resolve: {
            charge: ChargeAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chargePopupRoute: Routes = [
    {
        path: 'charge-app/:id/delete',
        component: ChargeAppDeletePopupComponent,
        resolve: {
            charge: ChargeAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
