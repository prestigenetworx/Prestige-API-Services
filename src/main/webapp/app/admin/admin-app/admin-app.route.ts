import { Injectable } from '@angular/core';
import { Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { AdminAppComponent } from './admin-app.component';

export const AdminAppRoute: Route = {
    path: 'app',
    component: AdminAppComponent,
    data: {
        pageTitle: 'configuration.tittle'
    }
};
