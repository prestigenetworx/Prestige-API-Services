import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductApp } from 'app/shared/model/product-app.model';
import { ProductAppService } from './product-app.service';
import { ProductAppComponent } from './product-app.component';
import { ProductAppDetailComponent } from './product-app-detail.component';
import { ProductAppUpdateComponent } from './product-app-update.component';
import { ProductAppDeletePopupComponent } from './product-app-delete-dialog.component';
import { IProductApp } from 'app/shared/model/product-app.model';

@Injectable({ providedIn: 'root' })
export class ProductAppResolve implements Resolve<IProductApp> {
    constructor(private service: ProductAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((product: HttpResponse<ProductApp>) => product.body));
        }
        return of(new ProductApp());
    }
}

export const productRoute: Routes = [
    {
        path: 'product-app',
        component: ProductAppComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prestigeApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-app/:id/view',
        component: ProductAppDetailComponent,
        resolve: {
            product: ProductAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-app/new',
        component: ProductAppUpdateComponent,
        resolve: {
            product: ProductAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-app/:id/edit',
        component: ProductAppUpdateComponent,
        resolve: {
            product: ProductAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.product.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productPopupRoute: Routes = [
    {
        path: 'product-app/:id/delete',
        component: ProductAppDeletePopupComponent,
        resolve: {
            product: ProductAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.product.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
