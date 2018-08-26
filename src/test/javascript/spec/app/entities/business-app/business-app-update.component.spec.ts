/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { BusinessAppUpdateComponent } from 'app/entities/business-app/business-app-update.component';
import { BusinessAppService } from 'app/entities/business-app/business-app.service';
import { BusinessApp } from 'app/shared/model/business-app.model';

describe('Component Tests', () => {
    describe('BusinessApp Management Update Component', () => {
        let comp: BusinessAppUpdateComponent;
        let fixture: ComponentFixture<BusinessAppUpdateComponent>;
        let service: BusinessAppService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [BusinessAppUpdateComponent]
            })
                .overrideTemplate(BusinessAppUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BusinessAppUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BusinessAppService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BusinessApp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.business = entity;
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
                    const entity = new BusinessApp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.business = entity;
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
