import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetadataApp } from 'app/shared/model/metadata-app.model';
import { MetadataAppService } from './metadata-app.service';
import { MetadataAppComponent } from './metadata-app.component';
import { MetadataAppDetailComponent } from './metadata-app-detail.component';
import { MetadataAppUpdateComponent } from './metadata-app-update.component';
import { MetadataAppDeletePopupComponent } from './metadata-app-delete-dialog.component';
import { IMetadataApp } from 'app/shared/model/metadata-app.model';

@Injectable({ providedIn: 'root' })
export class MetadataAppResolve implements Resolve<IMetadataApp> {
    constructor(private service: MetadataAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((metadata: HttpResponse<MetadataApp>) => metadata.body));
        }
        return of(new MetadataApp());
    }
}

export const metadataRoute: Routes = [
    {
        path: 'metadata-app',
        component: MetadataAppComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prestigeApp.metadata.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'metadata-app/:id/view',
        component: MetadataAppDetailComponent,
        resolve: {
            metadata: MetadataAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.metadata.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'metadata-app/new',
        component: MetadataAppUpdateComponent,
        resolve: {
            metadata: MetadataAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.metadata.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'metadata-app/:id/edit',
        component: MetadataAppUpdateComponent,
        resolve: {
            metadata: MetadataAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.metadata.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const metadataPopupRoute: Routes = [
    {
        path: 'metadata-app/:id/delete',
        component: MetadataAppDeletePopupComponent,
        resolve: {
            metadata: MetadataAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.metadata.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
