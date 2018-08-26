import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IBusinessApp } from 'app/shared/model/business-app.model';
import { BusinessAppService } from './business-app.service';

@Component({
    selector: 'jhi-business-app-update',
    templateUrl: './business-app-update.component.html'
})
export class BusinessAppUpdateComponent implements OnInit {
    private _business: IBusinessApp;
    isSaving: boolean;

    constructor(
        private dataUtils: JhiDataUtils,
        private businessService: BusinessAppService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
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

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.business, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.business.id !== undefined) {
            this.subscribeToSaveResponse(this.businessService.update(this.business));
        } else {
            this.subscribeToSaveResponse(this.businessService.create(this.business));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessApp>>) {
        result.subscribe((res: HttpResponse<IBusinessApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get business() {
        return this._business;
    }

    set business(business: IBusinessApp) {
        this._business = business;
    }
}
