import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChargeApp } from 'app/shared/model/charge-app.model';
import { ChargeAppService } from './charge-app.service';

@Component({
    selector: 'jhi-charge-app-delete-dialog',
    templateUrl: './charge-app-delete-dialog.component.html'
})
export class ChargeAppDeleteDialogComponent {
    charge: IChargeApp;

    constructor(private chargeService: ChargeAppService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chargeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chargeListModification',
                content: 'Deleted an charge'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-charge-app-delete-popup',
    template: ''
})
export class ChargeAppDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ charge }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ChargeAppDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.charge = charge;
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
