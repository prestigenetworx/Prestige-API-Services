/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestigeTestModule } from '../../../test.module';
import { MetadataAppDeleteDialogComponent } from 'app/entities/metadata-app/metadata-app-delete-dialog.component';
import { MetadataAppService } from 'app/entities/metadata-app/metadata-app.service';

describe('Component Tests', () => {
    describe('MetadataApp Management Delete Component', () => {
        let comp: MetadataAppDeleteDialogComponent;
        let fixture: ComponentFixture<MetadataAppDeleteDialogComponent>;
        let service: MetadataAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [MetadataAppDeleteDialogComponent]
            })
                .overrideTemplate(MetadataAppDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MetadataAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetadataAppService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
