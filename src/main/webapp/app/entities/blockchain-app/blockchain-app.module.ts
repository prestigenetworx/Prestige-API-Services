import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import {
    BlockchainAppComponent,
    BlockchainAppDetailComponent,
    BlockchainAppUpdateComponent,
    BlockchainAppDeletePopupComponent,
    BlockchainAppDeleteDialogComponent,
    blockchainRoute,
    blockchainPopupRoute
} from './';

const ENTITY_STATES = [...blockchainRoute, ...blockchainPopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BlockchainAppComponent,
        BlockchainAppDetailComponent,
        BlockchainAppUpdateComponent,
        BlockchainAppDeleteDialogComponent,
        BlockchainAppDeletePopupComponent
    ],
    entryComponents: [
        BlockchainAppComponent,
        BlockchainAppUpdateComponent,
        BlockchainAppDeleteDialogComponent,
        BlockchainAppDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeBlockchainAppModule {}
