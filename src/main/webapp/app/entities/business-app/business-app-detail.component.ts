import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IBusinessApp } from 'app/shared/model/business-app.model';

@Component({
    selector: 'jhi-business-app-detail',
    templateUrl: './business-app-detail.component.html',
    styleUrls: ['business-app.scss']
})
export class BusinessAppDetailComponent implements OnInit {
    business: IBusinessApp;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ business }) => {
            this.business = business;
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
