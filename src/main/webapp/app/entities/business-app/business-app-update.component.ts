import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IBusinessApp } from 'app/shared/model/business-app.model';
import { BusinessAppService } from './business-app.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-business-app-update',
    templateUrl: './business-app-update.component.html',
    styleUrls: ['business-app.scss']
})
export class BusinessAppUpdateComponent implements OnInit {
    private _business: IBusinessApp;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private businessService: BusinessAppService,
        private userService: UserService,
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.businessService.findByCurrentUser().subscribe(
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

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.business, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        this.router.navigate(['/business-app']);
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get business() {
        return this._business;
    }

    set business(business: IBusinessApp) {
        this._business = business;
    }
}
