import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICurrencyApp } from 'app/shared/model/currency-app.model';
import { CurrencyAppService } from './currency-app.service';
import { IBlockchainApp } from 'app/shared/model/blockchain-app.model';
import { BlockchainAppService } from 'app/entities/blockchain-app';

@Component({
    selector: 'jhi-currency-app-update',
    templateUrl: './currency-app-update.component.html'
})
export class CurrencyAppUpdateComponent implements OnInit {
    private _currency: ICurrencyApp;
    isSaving: boolean;

    blockchains: IBlockchainApp[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private currencyService: CurrencyAppService,
        private blockchainService: BlockchainAppService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ currency }) => {
            this.currency = currency;
        });
        this.blockchainService.query().subscribe(
            (res: HttpResponse<IBlockchainApp[]>) => {
                this.blockchains = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.currency.id !== undefined) {
            this.subscribeToSaveResponse(this.currencyService.update(this.currency));
        } else {
            this.subscribeToSaveResponse(this.currencyService.create(this.currency));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICurrencyApp>>) {
        result.subscribe((res: HttpResponse<ICurrencyApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackBlockchainById(index: number, item: IBlockchainApp) {
        return item.id;
    }
    get currency() {
        return this._currency;
    }

    set currency(currency: ICurrencyApp) {
        this._currency = currency;
    }
}
