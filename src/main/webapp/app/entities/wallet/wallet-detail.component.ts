import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWallet } from 'app/shared/model/wallet.model';

@Component({
    selector: 'jhi-wallet-detail',
    templateUrl: './wallet-detail.component.html',
    styleUrls: ['wallet.scss']
})
export class WalletDetailComponent implements OnInit {
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
