/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestigeTestModule } from '../../../test.module';
import { ProductAppDeleteDialogComponent } from 'app/entities/product-app/product-app-delete-dialog.component';
import { ProductAppService } from 'app/entities/product-app/product-app.service';

describe('Component Tests', () => {
    describe('ProductApp Management Delete Component', () => {
        let comp: ProductAppDeleteDialogComponent;
        let fixture: ComponentFixture<ProductAppDeleteDialogComponent>;
        let service: ProductAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [ProductAppDeleteDialogComponent]
            })
                .overrideTemplate(ProductAppDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductAppService);
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
