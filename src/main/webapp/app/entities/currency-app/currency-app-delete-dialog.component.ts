import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICurrencyApp } from 'app/shared/model/currency-app.model';
import { CurrencyAppService } from './currency-app.service';

@Component({
    selector: 'jhi-currency-app-delete-dialog',
    templateUrl: './currency-app-delete-dialog.component.html'
})
export class CurrencyAppDeleteDialogComponent {
    currency: ICurrencyApp;

    constructor(private currencyService: CurrencyAppService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.currencyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'currencyListModification',
                content: 'Deleted an currency'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-currency-app-delete-popup',
    template: ''
})
export class CurrencyAppDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ currency }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CurrencyAppDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.currency = currency;
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
