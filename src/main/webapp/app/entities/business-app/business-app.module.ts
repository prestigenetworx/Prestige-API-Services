import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import {
    BusinessAppComponent,
    BusinessAppDetailComponent,
    BusinessAppUpdateComponent,
    BusinessAppDeletePopupComponent,
    BusinessAppDeleteDialogComponent,
    businessRoute,
    businessPopupRoute
} from './';

const ENTITY_STATES = [...businessRoute, ...businessPopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BusinessAppComponent,
        BusinessAppDetailComponent,
        BusinessAppUpdateComponent,
        BusinessAppDeleteDialogComponent,
        BusinessAppDeletePopupComponent
    ],
    entryComponents: [BusinessAppComponent, BusinessAppUpdateComponent, BusinessAppDeleteDialogComponent, BusinessAppDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeBusinessAppModule {}
