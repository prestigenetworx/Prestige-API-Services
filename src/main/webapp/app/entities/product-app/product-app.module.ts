import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import { PrestigeAdminModule } from 'app/admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
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
    imports: [
        PrestigeSharedModule,
        PrestigeAdminModule,
        BrowserAnimationsModule,
        MatInputModule,
        FormsModule,
        MatCheckboxModule,
        MatSelectModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
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
