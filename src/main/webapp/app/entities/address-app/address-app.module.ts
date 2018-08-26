import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import {
    AddressAppComponent,
    AddressAppDetailComponent,
    AddressAppUpdateComponent,
    AddressAppDeletePopupComponent,
    AddressAppDeleteDialogComponent,
    addressRoute,
    addressPopupRoute
} from './';

const ENTITY_STATES = [...addressRoute, ...addressPopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AddressAppComponent,
        AddressAppDetailComponent,
        AddressAppUpdateComponent,
        AddressAppDeleteDialogComponent,
        AddressAppDeletePopupComponent
    ],
    entryComponents: [AddressAppComponent, AddressAppUpdateComponent, AddressAppDeleteDialogComponent, AddressAppDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeAddressAppModule {}
