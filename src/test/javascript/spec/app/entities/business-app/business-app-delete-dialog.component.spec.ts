/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestigeTestModule } from '../../../test.module';
import { BusinessAppDeleteDialogComponent } from 'app/entities/business-app/business-app-delete-dialog.component';
import { BusinessAppService } from 'app/entities/business-app/business-app.service';

describe('Component Tests', () => {
    describe('BusinessApp Management Delete Component', () => {
        let comp: BusinessAppDeleteDialogComponent;
        let fixture: ComponentFixture<BusinessAppDeleteDialogComponent>;
        let service: BusinessAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [BusinessAppDeleteDialogComponent]
            })
                .overrideTemplate(BusinessAppDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BusinessAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessAppService);
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
