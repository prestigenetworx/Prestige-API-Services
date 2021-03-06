import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWallet } from 'app/shared/model/wallet.model';
import { WalletService } from './wallet.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-wallet-import',
    templateUrl: './wallet-import.component.html',
    styleUrls: ['wallet.scss']
})
export class WalletImportComponent implements OnInit {
    private _wallet: IWallet;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private walletService: WalletService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ wallet }) => {
            this.wallet = wallet;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.subscribeToSaveResponse(this.walletService.update(this.wallet));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWallet>>) {
        result.subscribe((res: HttpResponse<IWallet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get wallet() {
        return this._wallet;
    }

    set wallet(wallet: IWallet) {
        this._wallet = wallet;
    }
}
