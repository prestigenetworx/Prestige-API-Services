import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import {
    CurrencyAppComponent,
    CurrencyAppDetailComponent,
    CurrencyAppUpdateComponent,
    CurrencyAppDeletePopupComponent,
    CurrencyAppDeleteDialogComponent,
    currencyRoute,
    currencyPopupRoute
} from './';

const ENTITY_STATES = [...currencyRoute, ...currencyPopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CurrencyAppComponent,
        CurrencyAppDetailComponent,
        CurrencyAppUpdateComponent,
        CurrencyAppDeleteDialogComponent,
        CurrencyAppDeletePopupComponent
    ],
    entryComponents: [CurrencyAppComponent, CurrencyAppUpdateComponent, CurrencyAppDeleteDialogComponent, CurrencyAppDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeCurrencyAppModule {}
