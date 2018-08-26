/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestigeTestModule } from '../../../test.module';
import { BlockchainAppDeleteDialogComponent } from 'app/entities/blockchain-app/blockchain-app-delete-dialog.component';
import { BlockchainAppService } from 'app/entities/blockchain-app/blockchain-app.service';

describe('Component Tests', () => {
    describe('BlockchainApp Management Delete Component', () => {
        let comp: BlockchainAppDeleteDialogComponent;
        let fixture: ComponentFixture<BlockchainAppDeleteDialogComponent>;
        let service: BlockchainAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [BlockchainAppDeleteDialogComponent]
            })
                .overrideTemplate(BlockchainAppDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BlockchainAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlockchainAppService);
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
