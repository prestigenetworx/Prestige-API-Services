import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressApp } from 'app/shared/model/address-app.model';
import { AddressAppService } from './address-app.service';
import { AddressAppComponent } from './address-app.component';
import { AddressAppDetailComponent } from './address-app-detail.component';
import { AddressAppUpdateComponent } from './address-app-update.component';
import { AddressAppDeletePopupComponent } from './address-app-delete-dialog.component';
import { IAddressApp } from 'app/shared/model/address-app.model';

@Injectable({ providedIn: 'root' })
export class AddressAppResolve implements Resolve<IAddressApp> {
    constructor(private service: AddressAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((address: HttpResponse<AddressApp>) => address.body));
        }
        return of(new AddressApp());
    }
}

export const addressRoute: Routes = [
    {
        path: 'address-app',
        component: AddressAppComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prestigeApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-app/:id/view',
        component: AddressAppDetailComponent,
        resolve: {
            address: AddressAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-app/new',
        component: AddressAppUpdateComponent,
        resolve: {
            address: AddressAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'address-app/:id/edit',
        component: AddressAppUpdateComponent,
        resolve: {
            address: AddressAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressPopupRoute: Routes = [
    {
        path: 'address-app/:id/delete',
        component: AddressAppDeletePopupComponent,
        resolve: {
            address: AddressAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
