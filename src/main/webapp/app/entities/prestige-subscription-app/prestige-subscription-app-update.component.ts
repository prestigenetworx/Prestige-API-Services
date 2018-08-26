import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IPrestigeSubscriptionApp } from 'app/shared/model/prestige-subscription-app.model';
import { PrestigeSubscriptionAppService } from './prestige-subscription-app.service';
import { ICurrencyApp } from 'app/shared/model/currency-app.model';
import { CurrencyAppService } from 'app/entities/currency-app';
import { ICustomerApp } from 'app/shared/model/customer-app.model';
import { CustomerAppService } from 'app/entities/customer-app';
import { IProductApp } from 'app/shared/model/product-app.model';
import { ProductAppService } from 'app/entities/product-app';

@Component({
    selector: 'jhi-prestige-subscription-app-update',
    templateUrl: './prestige-subscription-app-update.component.html'
})
export class PrestigeSubscriptionAppUpdateComponent implements OnInit {
    private _prestigeSubscription: IPrestigeSubscriptionApp;
    isSaving: boolean;

    currencies: ICurrencyApp[];

    customers: ICustomerApp[];

    products: IProductApp[];
    startDate: string;
    endDate: string;
    renewalDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private prestigeSubscriptionService: PrestigeSubscriptionAppService,
        private currencyService: CurrencyAppService,
        private customerService: CustomerAppService,
        private productService: ProductAppService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ prestigeSubscription }) => {
            this.prestigeSubscription = prestigeSubscription;
        });
        this.currencyService.query({ filter: 'prestigesubscription-is-null' }).subscribe(
            (res: HttpResponse<ICurrencyApp[]>) => {
                if (!this.prestigeSubscription.currencyId) {
                    this.currencies = res.body;
                } else {
                    this.currencyService.find(this.prestigeSubscription.currencyId).subscribe(
                        (subRes: HttpResponse<ICurrencyApp>) => {
                            this.currencies = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomerApp[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productService.query().subscribe(
            (res: HttpResponse<IProductApp[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.prestigeSubscription.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.prestigeSubscription.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        this.prestigeSubscription.renewalDate = moment(this.renewalDate, DATE_TIME_FORMAT);
        if (this.prestigeSubscription.id !== undefined) {
            this.subscribeToSaveResponse(this.prestigeSubscriptionService.update(this.prestigeSubscription));
        } else {
            this.subscribeToSaveResponse(this.prestigeSubscriptionService.create(this.prestigeSubscription));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrestigeSubscriptionApp>>) {
        result.subscribe(
            (res: HttpResponse<IPrestigeSubscriptionApp>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackCurrencyById(index: number, item: ICurrencyApp) {
        return item.id;
    }

    trackCustomerById(index: number, item: ICustomerApp) {
        return item.id;
    }

    trackProductById(index: number, item: IProductApp) {
        return item.id;
    }
    get prestigeSubscription() {
        return this._prestigeSubscription;
    }

    set prestigeSubscription(prestigeSubscription: IPrestigeSubscriptionApp) {
        this._prestigeSubscription = prestigeSubscription;
        this.startDate = moment(prestigeSubscription.startDate).format(DATE_TIME_FORMAT);
        this.endDate = moment(prestigeSubscription.endDate).format(DATE_TIME_FORMAT);
        this.renewalDate = moment(prestigeSubscription.renewalDate).format(DATE_TIME_FORMAT);
    }
}
