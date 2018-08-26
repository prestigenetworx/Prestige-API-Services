import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBusinessApp } from 'app/shared/model/business-app.model';
import { BusinessAppService } from './business-app.service';

@Component({
    selector: 'jhi-business-app-delete-dialog',
    templateUrl: './business-app-delete-dialog.component.html'
})
export class BusinessAppDeleteDialogComponent {
    business: IBusinessApp;

    constructor(private businessService: BusinessAppService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.businessService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'businessListModification',
                content: 'Deleted an business'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-business-app-delete-popup',
    template: ''
})
export class BusinessAppDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ business }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(BusinessAppDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.business = business;
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
