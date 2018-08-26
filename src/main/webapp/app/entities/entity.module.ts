import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrestigeWalletModule } from './wallet/wallet.module';
import { PrestigeChargeAppModule } from './charge-app/charge-app.module';
import { PrestigeBusinessAppModule } from './business-app/business-app.module';
import { PrestigeCustomerAppModule } from './customer-app/customer-app.module';
import { PrestigePrestigeSubscriptionAppModule } from './prestige-subscription-app/prestige-subscription-app.module';
import { PrestigeProductAppModule } from './product-app/product-app.module';
import { PrestigeAddressAppModule } from './address-app/address-app.module';
import { PrestigeCurrencyAppModule } from './currency-app/currency-app.module';
import { PrestigeBlockchainAppModule } from './blockchain-app/blockchain-app.module';
import { PrestigeMetadataAppModule } from './metadata-app/metadata-app.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        PrestigeWalletModule,
        PrestigeChargeAppModule,
        PrestigeBusinessAppModule,
        PrestigeCustomerAppModule,
        PrestigePrestigeSubscriptionAppModule,
        PrestigeProductAppModule,
        PrestigeAddressAppModule,
        PrestigeCurrencyAppModule,
        PrestigeBlockchainAppModule,
        PrestigeMetadataAppModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeEntityModule {}
