import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusinessApp } from 'app/shared/model/business-app.model';
import { BusinessAppService } from './business-app.service';
import { BusinessAppComponent } from './business-app.component';
import { BusinessAppDetailComponent } from './business-app-detail.component';
import { BusinessAppUpdateComponent } from './business-app-update.component';
import { BusinessAppDeletePopupComponent } from './business-app-delete-dialog.component';
import { IBusinessApp } from 'app/shared/model/business-app.model';

@Injectable({ providedIn: 'root' })
export class BusinessAppResolve implements Resolve<IBusinessApp> {
    constructor(private service: BusinessAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((business: HttpResponse<BusinessApp>) => business.body));
        }
        return of(new BusinessApp());
    }
}

export const businessRoute: Routes = [
    { path: 'business-app', redirectTo: 'business-app/view', pathMatch: 'full' },
    { path: 'business-app/new', redirectTo: 'business-app/view', pathMatch: 'full' },
    {
        path: 'business-app/view',
        component: BusinessAppDetailComponent,
        resolve: {
            business: BusinessAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.business.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'business-app/edit',
        component: BusinessAppUpdateComponent,
        resolve: {
            business: BusinessAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.business.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const businessPopupRoute: Routes = [{ path: 'business-app/:id/delete', redirectTo: 'business-app/view', pathMatch: 'full' }];
