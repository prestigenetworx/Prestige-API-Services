import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBlockchainApp } from 'app/shared/model/blockchain-app.model';

@Component({
    selector: 'jhi-blockchain-app-detail',
    templateUrl: './blockchain-app-detail.component.html'
})
export class BlockchainAppDetailComponent implements OnInit {
    blockchain: IBlockchainApp;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blockchain }) => {
            this.blockchain = blockchain;
        });
    }

    previousState() {
        window.history.back();
    }
}
