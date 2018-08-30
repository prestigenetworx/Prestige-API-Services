import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWallet } from 'app/shared/model/wallet.model';
import { WalletService } from '../wallet.service';
import { IUser, UserService } from 'app/core';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-wallet-new',
    templateUrl: './wallet-new.component.html',
    styleUrls: ['../wallet.scss']
})
export class WalletNewComponent implements OnInit {
    private _wallet: IWallet;
    isSaving: boolean;

    users: IUser[];
    constructor(
        private jhiAlertService: JhiAlertService,
        private walletService: WalletService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private eventManager: JhiEventManager,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ wallet }) => {
            this.wallet = wallet;
        });
    }

    previousState() {
        this.router.navigate(['/wallet']);
    }

    get wallet() {
        return this._wallet;
    }

    set wallet(wallet: IWallet) {
        this._wallet = wallet;
    }

    createWallet() {
        this.walletService.create(this.wallet).subscribe(
            wallet => {
                this.eventManager.broadcast({
                    name: 'walletListModification',
                    content: 'Wallet created'
                });
                this.router.navigate(['/wallet']);
            },
            error => {
                this.jhiAlertService.error('Wallet not created', null, null);
            }
        );
    }
}
