import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import { PrestigeAdminModule } from 'app/admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
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
    imports: [
        PrestigeSharedModule,
        PrestigeAdminModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
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
