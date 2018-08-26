import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IMetadataApp } from 'app/shared/model/metadata-app.model';
import { MetadataAppService } from './metadata-app.service';

@Component({
    selector: 'jhi-metadata-app-update',
    templateUrl: './metadata-app-update.component.html'
})
export class MetadataAppUpdateComponent implements OnInit {
    private _metadata: IMetadataApp;
    isSaving: boolean;

    constructor(private dataUtils: JhiDataUtils, private metadataService: MetadataAppService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ metadata }) => {
            this.metadata = metadata;
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

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.metadata.id !== undefined) {
            this.subscribeToSaveResponse(this.metadataService.update(this.metadata));
        } else {
            this.subscribeToSaveResponse(this.metadataService.create(this.metadata));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMetadataApp>>) {
        result.subscribe((res: HttpResponse<IMetadataApp>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get metadata() {
        return this._metadata;
    }

    set metadata(metadata: IMetadataApp) {
        this._metadata = metadata;
    }
}
