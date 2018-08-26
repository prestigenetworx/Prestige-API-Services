/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { ChargeAppUpdateComponent } from 'app/entities/charge-app/charge-app-update.component';
import { ChargeAppService } from 'app/entities/charge-app/charge-app.service';
import { ChargeApp } from 'app/shared/model/charge-app.model';

describe('Component Tests', () => {
    describe('ChargeApp Management Update Component', () => {
        let comp: ChargeAppUpdateComponent;
        let fixture: ComponentFixture<ChargeAppUpdateComponent>;
        let service: ChargeAppService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [ChargeAppUpdateComponent]
            })
                .overrideTemplate(ChargeAppUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChargeAppUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChargeAppService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ChargeApp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.charge = entity;
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
                    const entity = new ChargeApp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.charge = entity;
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
