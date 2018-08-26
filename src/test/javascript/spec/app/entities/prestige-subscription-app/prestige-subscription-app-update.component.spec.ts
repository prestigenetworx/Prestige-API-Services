/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { PrestigeSubscriptionAppUpdateComponent } from 'app/entities/prestige-subscription-app/prestige-subscription-app-update.component';
import { PrestigeSubscriptionAppService } from 'app/entities/prestige-subscription-app/prestige-subscription-app.service';
import { PrestigeSubscriptionApp } from 'app/shared/model/prestige-subscription-app.model';

describe('Component Tests', () => {
    describe('PrestigeSubscriptionApp Management Update Component', () => {
        let comp: PrestigeSubscriptionAppUpdateComponent;
        let fixture: ComponentFixture<PrestigeSubscriptionAppUpdateComponent>;
        let service: PrestigeSubscriptionAppService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [PrestigeSubscriptionAppUpdateComponent]
            })
                .overrideTemplate(PrestigeSubscriptionAppUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrestigeSubscriptionAppUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrestigeSubscriptionAppService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrestigeSubscriptionApp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestigeSubscription = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrestigeSubscriptionApp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.prestigeSubscription = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
