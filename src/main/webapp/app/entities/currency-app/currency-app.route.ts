import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrencyApp } from 'app/shared/model/currency-app.model';
import { CurrencyAppService } from './currency-app.service';
import { CurrencyAppComponent } from './currency-app.component';
import { CurrencyAppDetailComponent } from './currency-app-detail.component';
import { CurrencyAppUpdateComponent } from './currency-app-update.component';
import { CurrencyAppDeletePopupComponent } from './currency-app-delete-dialog.component';
import { ICurrencyApp } from 'app/shared/model/currency-app.model';

@Injectable({ providedIn: 'root' })
export class CurrencyAppResolve implements Resolve<ICurrencyApp> {
    constructor(private service: CurrencyAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((currency: HttpResponse<CurrencyApp>) => currency.body));
        }
        return of(new CurrencyApp());
    }
}

export const currencyRoute: Routes = [
    {
        path: 'currency-app',
        component: CurrencyAppComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prestigeApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'currency-app/:id/view',
        component: CurrencyAppDetailComponent,
        resolve: {
            currency: CurrencyAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'currency-app/new',
        component: CurrencyAppUpdateComponent,
        resolve: {
            currency: CurrencyAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'currency-app/:id/edit',
        component: CurrencyAppUpdateComponent,
        resolve: {
            currency: CurrencyAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currencyPopupRoute: Routes = [
    {
        path: 'currency-app/:id/delete',
        component: CurrencyAppDeletePopupComponent,
        resolve: {
            currency: CurrencyAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
