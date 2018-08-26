import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerApp } from 'app/shared/model/customer-app.model';
import { CustomerAppService } from './customer-app.service';
import { CustomerAppComponent } from './customer-app.component';
import { CustomerAppDetailComponent } from './customer-app-detail.component';
import { CustomerAppUpdateComponent } from './customer-app-update.component';
import { CustomerAppDeletePopupComponent } from './customer-app-delete-dialog.component';
import { ICustomerApp } from 'app/shared/model/customer-app.model';

@Injectable({ providedIn: 'root' })
export class CustomerAppResolve implements Resolve<ICustomerApp> {
    constructor(private service: CustomerAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((customer: HttpResponse<CustomerApp>) => customer.body));
        }
        return of(new CustomerApp());
    }
}

export const customerRoute: Routes = [
    {
        path: 'customer-app',
        component: CustomerAppComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prestigeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-app/:id/view',
        component: CustomerAppDetailComponent,
        resolve: {
            customer: CustomerAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-app/new',
        component: CustomerAppUpdateComponent,
        resolve: {
            customer: CustomerAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-app/:id/edit',
        component: CustomerAppUpdateComponent,
        resolve: {
            customer: CustomerAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-app/:id/delete',
        component: CustomerAppDeletePopupComponent,
        resolve: {
            customer: CustomerAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
