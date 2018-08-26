import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IBlockchainApp } from 'app/shared/model/blockchain-app.model';
import { BlockchainAppService } from './blockchain-app.service';

@Component({
    selector: 'jhi-blockchain-app-update',
    templateUrl: './blockchain-app-update.component.html'
})
export class BlockchainAppUpdateComponent implements OnInit {
    private _blockchain: IBlockchainApp;
    isSaving: boolean;

    constructor(private blockchainService: BlockchainAppService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ blockchain }) => {
            this.blockchain = blockchain;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.blockchain.id !== undefined) {
            this.subscribeToSaveResponse(this.blockchainService.update(this.blockchain));
        } else {
            this.subscribeToSaveResponse(this.blockchainService.create(this.blockchain));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBlockchainApp>>) {
        result.subscribe((res: HttpResponse<IBlockchainApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get blockchain() {
        return this._blockchain;
    }

    set blockchain(blockchain: IBlockchainApp) {
        this._blockchain = blockchain;
    }
}
