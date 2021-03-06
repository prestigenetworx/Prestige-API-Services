import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWallet } from 'app/shared/model/wallet.model';
import { WalletService } from './wallet.service';

import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-wallet-new-dialog',
    templateUrl: './wallet-new-dialog.component.html'
})
export class WalletNewDialogComponent {
    wallet: IWallet;

    constructor(private walletService: WalletService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager, private jhiAlertService: JhiAlertService) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    //Service for create wallet
    createWallet() {
        this.walletService.create(this.wallet).subscribe(
            wallet => {
                this.eventManager.broadcast({
                    name: 'walletListModification',
                    content: 'Wallet created'
                });
                this.activeModal.dismiss(true);
            }, error => {
                this.jhiAlertService.error("Wallet not created", null, null)
            }
        );
    }
}

@Component({
    selector: 'jhi-wallet-new-popup',
    template: ''
})
export class WalletNewPopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ wallet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WalletNewDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.wallet = wallet;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
