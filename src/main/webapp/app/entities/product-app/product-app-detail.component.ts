import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProductApp } from 'app/shared/model/product-app.model';

@Component({
    selector: 'jhi-product-app-detail',
    templateUrl: './product-app-detail.component.html'
})
export class ProductAppDetailComponent implements OnInit {
    product: IProductApp;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
