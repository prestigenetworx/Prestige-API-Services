import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IChargeApp } from 'app/shared/model/charge-app.model';
import { ChargeAppService } from './charge-app.service';
import { IMetadataApp } from 'app/shared/model/metadata-app.model';
import { MetadataAppService } from 'app/entities/metadata-app';
import { ICurrencyApp } from 'app/shared/model/currency-app.model';
import { CurrencyAppService } from 'app/entities/currency-app';
import { ICustomerApp } from 'app/shared/model/customer-app.model';
import { CustomerAppService } from 'app/entities/customer-app';

@Component({
    selector: 'jhi-charge-app-update',
    templateUrl: './charge-app-update.component.html'
})
export class ChargeAppUpdateComponent implements OnInit {
    private _charge: IChargeApp;
    isSaving: boolean;

    metadata: IMetadataApp[];

    currencies: ICurrencyApp[];

    customers: ICustomerApp[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private chargeService: ChargeAppService,
        private metadataService: MetadataAppService,
        private currencyService: CurrencyAppService,
        private customerService: CustomerAppService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ charge }) => {
            this.charge = charge;
        });
        this.metadataService.query({ filter: 'charge-is-null' }).subscribe(
            (res: HttpResponse<IMetadataApp[]>) => {
                if (!this.charge.metadataId) {
                    this.metadata = res.body;
                } else {
                    this.metadataService.find(this.charge.metadataId).subscribe(
                        (subRes: HttpResponse<IMetadataApp>) => {
                            this.metadata = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.currencyService.query().subscribe(
            (res: HttpResponse<ICurrencyApp[]>) => {
                this.currencies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.charge.id !== undefined) {
            this.subscribeToSaveResponse(this.chargeService.update(this.charge));
        } else {
            this.subscribeToSaveResponse(this.chargeService.create(this.charge));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IChargeApp>>) {
        result.subscribe((res: HttpResponse<IChargeApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCurrencyById(index: number, item: ICurrencyApp) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomerApp) {
        return item.id;
    }
    get charge() {
        return this._charge;
    }

    set charge(charge: IChargeApp) {
        this._charge = charge;
    }
}
