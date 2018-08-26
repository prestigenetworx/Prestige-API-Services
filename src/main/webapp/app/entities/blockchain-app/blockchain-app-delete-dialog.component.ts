import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBlockchainApp } from 'app/shared/model/blockchain-app.model';
import { BlockchainAppService } from './blockchain-app.service';

@Component({
    selector: 'jhi-blockchain-app-delete-dialog',
    templateUrl: './blockchain-app-delete-dialog.component.html'
})
export class BlockchainAppDeleteDialogComponent {
    blockchain: IBlockchainApp;

    constructor(
        private blockchainService: BlockchainAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blockchainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'blockchainListModification',
                content: 'Deleted an blockchain'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-blockchain-app-delete-popup',
    template: ''
})
export class BlockchainAppDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ blockchain }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BlockchainAppDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.blockchain = blockchain;
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
