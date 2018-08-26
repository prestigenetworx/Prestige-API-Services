import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAddressApp } from 'app/shared/model/address-app.model';
import { AddressAppService } from './address-app.service';
import { ICustomerApp } from 'app/shared/model/customer-app.model';
import { CustomerAppService } from 'app/entities/customer-app';

@Component({
    selector: 'jhi-address-app-update',
    templateUrl: './address-app-update.component.html'
})
export class AddressAppUpdateComponent implements OnInit {
    private _address: IAddressApp;
    isSaving: boolean;

    customers: ICustomerApp[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private addressService: AddressAppService,
        private customerService: CustomerAppService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomerApp[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(this.addressService.create(this.address));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAddressApp>>) {
        result.subscribe((res: HttpResponse<IAddressApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCustomerById(index: number, item: ICustomerApp) {
        return item.id;
    }
    get address() {
        return this._address;
    }

    set address(address: IAddressApp) {
        this._address = address;
    }
}
