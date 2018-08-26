import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import {
    PrestigeSubscriptionAppComponent,
    PrestigeSubscriptionAppDetailComponent,
    PrestigeSubscriptionAppUpdateComponent,
    PrestigeSubscriptionAppDeletePopupComponent,
    PrestigeSubscriptionAppDeleteDialogComponent,
    prestigeSubscriptionRoute,
    prestigeSubscriptionPopupRoute
} from './';

const ENTITY_STATES = [...prestigeSubscriptionRoute, ...prestigeSubscriptionPopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrestigeSubscriptionAppComponent,
        PrestigeSubscriptionAppDetailComponent,
        PrestigeSubscriptionAppUpdateComponent,
        PrestigeSubscriptionAppDeleteDialogComponent,
        PrestigeSubscriptionAppDeletePopupComponent
    ],
    entryComponents: [
        PrestigeSubscriptionAppComponent,
        PrestigeSubscriptionAppUpdateComponent,
        PrestigeSubscriptionAppDeleteDialogComponent,
        PrestigeSubscriptionAppDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigePrestigeSubscriptionAppModule {}
