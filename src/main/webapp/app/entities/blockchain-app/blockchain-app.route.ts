import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlockchainApp } from 'app/shared/model/blockchain-app.model';
import { BlockchainAppService } from './blockchain-app.service';
import { BlockchainAppComponent } from './blockchain-app.component';
import { BlockchainAppDetailComponent } from './blockchain-app-detail.component';
import { BlockchainAppUpdateComponent } from './blockchain-app-update.component';
import { BlockchainAppDeletePopupComponent } from './blockchain-app-delete-dialog.component';
import { IBlockchainApp } from 'app/shared/model/blockchain-app.model';

@Injectable({ providedIn: 'root' })
export class BlockchainAppResolve implements Resolve<IBlockchainApp> {
    constructor(private service: BlockchainAppService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((blockchain: HttpResponse<BlockchainApp>) => blockchain.body));
        }
        return of(new BlockchainApp());
    }
}

export const blockchainRoute: Routes = [
    {
        path: 'blockchain-app',
        component: BlockchainAppComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'prestigeApp.blockchain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blockchain-app/:id/view',
        component: BlockchainAppDetailComponent,
        resolve: {
            blockchain: BlockchainAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.blockchain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blockchain-app/new',
        component: BlockchainAppUpdateComponent,
        resolve: {
            blockchain: BlockchainAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.blockchain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'blockchain-app/:id/edit',
        component: BlockchainAppUpdateComponent,
        resolve: {
            blockchain: BlockchainAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.blockchain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blockchainPopupRoute: Routes = [
    {
        path: 'blockchain-app/:id/delete',
        component: BlockchainAppDeletePopupComponent,
        resolve: {
            blockchain: BlockchainAppResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'prestigeApp.blockchain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
