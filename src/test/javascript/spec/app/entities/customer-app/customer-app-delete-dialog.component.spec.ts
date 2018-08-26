/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestigeTestModule } from '../../../test.module';
import { CustomerAppDeleteDialogComponent } from 'app/entities/customer-app/customer-app-delete-dialog.component';
import { CustomerAppService } from 'app/entities/customer-app/customer-app.service';

describe('Component Tests', () => {
    describe('CustomerApp Management Delete Component', () => {
        let comp: CustomerAppDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerAppDeleteDialogComponent>;
        let service: CustomerAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [CustomerAppDeleteDialogComponent]
            })
                .overrideTemplate(CustomerAppDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerAppService);
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
