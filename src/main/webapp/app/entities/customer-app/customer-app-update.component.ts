import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomerApp } from 'app/shared/model/customer-app.model';
import { CustomerAppService } from './customer-app.service';
import { IMetadataApp } from 'app/shared/model/metadata-app.model';
import { MetadataAppService } from 'app/entities/metadata-app';

@Component({
    selector: 'jhi-customer-app-update',
    templateUrl: './customer-app-update.component.html'
})
export class CustomerAppUpdateComponent implements OnInit {
    private _customer: ICustomerApp;
    isSaving: boolean;

    metadata: IMetadataApp[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerAppService,
        private metadataService: MetadataAppService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
        this.metadataService.query({ filter: 'customer-is-null' }).subscribe(
            (res: HttpResponse<IMetadataApp[]>) => {
                if (!this.customer.metadataId) {
                    this.metadata = res.body;
                } else {
                    this.metadataService.find(this.customer.metadataId).subscribe(
                        (subRes: HttpResponse<IMetadataApp>) => {
                            this.metadata = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerApp>>) {
        result.subscribe((res: HttpResponse<ICustomerApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMetadataById(index: number, item: IMetadataApp) {
        return item.id;
    }
    get customer() {
        return this._customer;
    }

    set customer(customer: ICustomerApp) {
        this._customer = customer;
    }
}
