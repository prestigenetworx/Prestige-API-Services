import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetadataApp } from 'app/shared/model/metadata-app.model';
import { MetadataAppService } from './metadata-app.service';

@Component({
    selector: 'jhi-metadata-app-delete-dialog',
    templateUrl: './metadata-app-delete-dialog.component.html'
})
export class MetadataAppDeleteDialogComponent {
    metadata: IMetadataApp;

    constructor(private metadataService: MetadataAppService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.metadataService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'metadataListModification',
                content: 'Deleted an metadata'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-metadata-app-delete-popup',
    template: ''
})
export class MetadataAppDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ metadata }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MetadataAppDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.metadata = metadata;
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
