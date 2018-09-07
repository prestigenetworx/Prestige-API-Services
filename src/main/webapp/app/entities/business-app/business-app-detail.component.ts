import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBusinessApp } from 'app/shared/model/business-app.model';
import { BusinessAppService } from 'app/entities/business-app/business-app.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-business-app-detail',
    templateUrl: './business-app-detail.component.html',
    styleUrls: ['business-app.scss']
})
export class BusinessAppDetailComponent implements OnInit {
    business: IBusinessApp;

    constructor(
        private dataUtils: JhiDataUtils,
        private activatedRoute: ActivatedRoute,
        private businessAppService: BusinessAppService,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.businessAppService.findByCurrentUser().subscribe(
            (res: HttpResponse<IBusinessApp>) => {
                this.business = res.body;
            },
            (res: HttpErrorResponse) => this.jhiAlertService.error(res.message, null, null)
        );
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
