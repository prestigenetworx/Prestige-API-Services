/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestigeTestModule } from '../../../test.module';
import { CurrencyAppDeleteDialogComponent } from 'app/entities/currency-app/currency-app-delete-dialog.component';
import { CurrencyAppService } from 'app/entities/currency-app/currency-app.service';

describe('Component Tests', () => {
    describe('CurrencyApp Management Delete Component', () => {
        let comp: CurrencyAppDeleteDialogComponent;
        let fixture: ComponentFixture<CurrencyAppDeleteDialogComponent>;
        let service: CurrencyAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [CurrencyAppDeleteDialogComponent]
            })
                .overrideTemplate(CurrencyAppDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CurrencyAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyAppService);
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
