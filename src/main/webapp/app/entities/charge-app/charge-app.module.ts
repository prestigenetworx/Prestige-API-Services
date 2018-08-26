import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import {
    ChargeAppComponent,
    ChargeAppDetailComponent,
    ChargeAppUpdateComponent,
    ChargeAppDeletePopupComponent,
    ChargeAppDeleteDialogComponent,
    chargeRoute,
    chargePopupRoute
} from './';

const ENTITY_STATES = [...chargeRoute, ...chargePopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ChargeAppComponent,
        ChargeAppDetailComponent,
        ChargeAppUpdateComponent,
        ChargeAppDeleteDialogComponent,
        ChargeAppDeletePopupComponent
    ],
    entryComponents: [ChargeAppComponent, ChargeAppUpdateComponent, ChargeAppDeleteDialogComponent, ChargeAppDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeChargeAppModule {}
