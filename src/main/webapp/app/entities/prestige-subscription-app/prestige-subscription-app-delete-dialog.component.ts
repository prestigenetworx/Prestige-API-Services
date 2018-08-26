import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrestigeSubscriptionApp } from 'app/shared/model/prestige-subscription-app.model';
import { PrestigeSubscriptionAppService } from './prestige-subscription-app.service';

@Component({
    selector: 'jhi-prestige-subscription-app-delete-dialog',
    templateUrl: './prestige-subscription-app-delete-dialog.component.html'
})
export class PrestigeSubscriptionAppDeleteDialogComponent {
    prestigeSubscription: IPrestigeSubscriptionApp;

    constructor(
        private prestigeSubscriptionService: PrestigeSubscriptionAppService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.prestigeSubscriptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'prestigeSubscriptionListModification',
                content: 'Deleted an prestigeSubscription'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-prestige-subscription-app-delete-popup',
    template: ''
})
export class PrestigeSubscriptionAppDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestigeSubscription }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrestigeSubscriptionAppDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.prestigeSubscription = prestigeSubscription;
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
