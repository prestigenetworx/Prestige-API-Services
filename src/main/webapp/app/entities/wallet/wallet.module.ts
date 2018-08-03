import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import { PrestigeAdminModule } from 'app/admin/admin.module';
import {
    WalletComponent,
    WalletDetailComponent,
    WalletUpdateComponent,
    WalletDeletePopupComponent,
    WalletDeleteDialogComponent,
    walletRoute,
    walletPopupRoute,
    WalletImportComponent,
    WalletGetBalanceComponent,
    WalletNewPopupComponent,
    WalletNewDialogComponent,
} from './';

const ENTITY_STATES = [...walletRoute, ...walletPopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, PrestigeAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [WalletComponent, WalletDetailComponent, WalletUpdateComponent, WalletDeleteDialogComponent, WalletDeletePopupComponent,WalletImportComponent,WalletGetBalanceComponent,WalletNewDialogComponent, WalletNewPopupComponent],
    entryComponents: [WalletComponent, WalletUpdateComponent, WalletDeleteDialogComponent, WalletDeletePopupComponent,WalletImportComponent,WalletGetBalanceComponent,WalletNewDialogComponent, WalletNewPopupComponent ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeWalletModule {}
