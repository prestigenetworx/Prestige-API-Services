import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrestigeSharedModule } from 'app/shared';
import {
    MetadataAppComponent,
    MetadataAppDetailComponent,
    MetadataAppUpdateComponent,
    MetadataAppDeletePopupComponent,
    MetadataAppDeleteDialogComponent,
    metadataRoute,
    metadataPopupRoute
} from './';

const ENTITY_STATES = [...metadataRoute, ...metadataPopupRoute];

@NgModule({
    imports: [PrestigeSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MetadataAppComponent,
        MetadataAppDetailComponent,
        MetadataAppUpdateComponent,
        MetadataAppDeleteDialogComponent,
        MetadataAppDeletePopupComponent
    ],
    entryComponents: [MetadataAppComponent, MetadataAppUpdateComponent, MetadataAppDeleteDialogComponent, MetadataAppDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrestigeMetadataAppModule {}
