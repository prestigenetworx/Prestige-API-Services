/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrestigeTestModule } from '../../../test.module';
import { PrestigeSubscriptionAppDeleteDialogComponent } from 'app/entities/prestige-subscription-app/prestige-subscription-app-delete-dialog.component';
import { PrestigeSubscriptionAppService } from 'app/entities/prestige-subscription-app/prestige-subscription-app.service';

describe('Component Tests', () => {
    describe('PrestigeSubscriptionApp Management Delete Component', () => {
        let comp: PrestigeSubscriptionAppDeleteDialogComponent;
        let fixture: ComponentFixture<PrestigeSubscriptionAppDeleteDialogComponent>;
        let service: PrestigeSubscriptionAppService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [PrestigeSubscriptionAppDeleteDialogComponent]
            })
                .overrideTemplate(PrestigeSubscriptionAppDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestigeSubscriptionAppDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestigeSubscriptionAppService);
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
