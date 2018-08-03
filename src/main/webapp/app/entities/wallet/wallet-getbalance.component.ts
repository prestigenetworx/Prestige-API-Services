import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWallet } from 'app/shared/model/wallet.model';

@Component({
    selector: 'jhi-wallet-getbalance',
    templateUrl: './wallet-getbalance.component.html'
})
export class WalletGetBalanceComponent implements OnInit {
    wallet: IWallet;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ wallet }) => {
            this.wallet = wallet;
        });
    }

    previousState() {
        window.history.back();
    }
}
