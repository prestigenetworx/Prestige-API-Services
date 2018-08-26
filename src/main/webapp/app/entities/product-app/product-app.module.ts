import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import {
    ProductAppComponent,
    ProductAppDetailComponent,
    ProductAppUpdateComponent,
    ProductAppDeletePopupComponent,
    ProductAppDeleteDialogComponent,
    productRoute,
    productPopupRoute
} from './';

const ENTITY_STATES = [...productRoute, ...productPopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductAppComponent,
        ProductAppDetailComponent,
        ProductAppUpdateComponent,
        ProductAppDeleteDialogComponent,
        ProductAppDeletePopupComponent
    ],
    entryComponents: [ProductAppComponent, ProductAppUpdateComponent, ProductAppDeleteDialogComponent, ProductAppDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeProductAppModule {}
