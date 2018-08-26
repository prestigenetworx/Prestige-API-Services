import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import {
    CustomerAppComponent,
    CustomerAppDetailComponent,
    CustomerAppUpdateComponent,
    CustomerAppDeletePopupComponent,
    CustomerAppDeleteDialogComponent,
    customerRoute,
    customerPopupRoute
} from './';

const ENTITY_STATES = [...customerRoute, ...customerPopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CustomerAppComponent,
        CustomerAppDetailComponent,
        CustomerAppUpdateComponent,
        CustomerAppDeleteDialogComponent,
        CustomerAppDeletePopupComponent
    ],
    entryComponents: [CustomerAppComponent, CustomerAppUpdateComponent, CustomerAppDeleteDialogComponent, CustomerAppDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeCustomerAppModule {}
