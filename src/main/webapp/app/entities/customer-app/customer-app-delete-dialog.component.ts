import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerApp } from 'app/shared/model/customer-app.model';
import { CustomerAppService } from './customer-app.service';

@Component({
    selector: 'jhi-customer-app-delete-dialog',
    templateUrl: './customer-app-delete-dialog.component.html'
})
export class CustomerAppDeleteDialogComponent {
    customer: ICustomerApp;

    constructor(private customerService: CustomerAppService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.customerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'customerListModification',
                content: 'Deleted an customer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-customer-app-delete-popup',
    template: ''
})
export class CustomerAppDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CustomerAppDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.customer = customer;
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
