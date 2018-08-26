import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductApp } from 'app/shared/model/product-app.model';
import { ProductAppService } from './product-app.service';
import { IMetadataApp } from 'app/shared/model/metadata-app.model';
import { MetadataAppService } from 'app/entities/metadata-app';
import { ICurrencyApp } from 'app/shared/model/currency-app.model';
import { CurrencyAppService } from 'app/entities/currency-app';
import { IBusinessApp } from 'app/shared/model/business-app.model';
import { BusinessAppService } from 'app/entities/business-app';

@Component({
    selector: 'jhi-product-app-update',
    templateUrl: './product-app-update.component.html'
})
export class ProductAppUpdateComponent implements OnInit {
    private _product: IProductApp;
    isSaving: boolean;

    metadata: IMetadataApp[];

    currencies: ICurrencyApp[];

    businesses: IBusinessApp[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private productService: ProductAppService,
        private metadataService: MetadataAppService,
        private currencyService: CurrencyAppService,
        private businessService: BusinessAppService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
        this.metadataService.query({ filter: 'product-is-null' }).subscribe(
            (res: HttpResponse<IMetadataApp[]>) => {
                if (!this.product.metadataId) {
                    this.metadata = res.body;
                } else {
                    this.metadataService.find(this.product.metadataId).subscribe(
                        (subRes: HttpResponse<IMetadataApp>) => {
                            this.metadata = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.currencyService.query({ filter: 'product-is-null' }).subscribe(
            (res: HttpResponse<ICurrencyApp[]>) => {
                if (!this.product.currencyId) {
                    this.currencies = res.body;
                } else {
                    this.currencyService.find(this.product.currencyId).subscribe(
                        (subRes: HttpResponse<ICurrencyApp>) => {
                            this.currencies = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.businessService.query().subscribe(
            (res: HttpResponse<IBusinessApp[]>) => {
                this.businesses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.product.id !== undefined) {
            this.subscribeToSaveResponse(this.productService.update(this.product));
        } else {
            this.subscribeToSaveResponse(this.productService.create(this.product));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProductApp>>) {
        result.subscribe((res: HttpResponse<IProductApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBusinessById(index: number, item: IBusinessApp) {
        return item.id;
    }
    get product() {
        return this._product;
    }

    set product(product: IProductApp) {
        this._product = product;
    }
}
