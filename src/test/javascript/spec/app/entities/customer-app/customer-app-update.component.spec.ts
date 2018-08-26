/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { CustomerAppUpdateComponent } from 'app/entities/customer-app/customer-app-update.component';
import { CustomerAppService } from 'app/entities/customer-app/customer-app.service';
import { CustomerApp } from 'app/shared/model/customer-app.model';

describe('Component Tests', () => {
    describe('CustomerApp Management Update Component', () => {
        let comp: CustomerAppUpdateComponent;
        let fixture: ComponentFixture<CustomerAppUpdateComponent>;
        let service: CustomerAppService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [CustomerAppUpdateComponent]
            })
                .overrideTemplate(CustomerAppUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerAppUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerAppService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CustomerApp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customer = entity;
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
                    const entity = new CustomerApp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customer = entity;
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
