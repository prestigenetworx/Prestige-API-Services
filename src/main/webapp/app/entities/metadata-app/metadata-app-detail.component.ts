import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IMetadataApp } from 'app/shared/model/metadata-app.model';

@Component({
    selector: 'jhi-metadata-app-detail',
    templateUrl: './metadata-app-detail.component.html'
})
export class MetadataAppDetailComponent implements OnInit {
    metadata: IMetadataApp;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
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
    previousState() {
        window.history.back();
    }
}
