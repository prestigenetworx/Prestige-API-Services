/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { AddressAppUpdateComponent } from 'app/entities/address-app/address-app-update.component';
import { AddressAppService } from 'app/entities/address-app/address-app.service';
import { AddressApp } from 'app/shared/model/address-app.model';

describe('Component Tests', () => {
    describe('AddressApp Management Update Component', () => {
        let comp: AddressAppUpdateComponent;
        let fixture: ComponentFixture<AddressAppUpdateComponent>;
        let service: AddressAppService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [AddressAppUpdateComponent]
            })
                .overrideTemplate(AddressAppUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AddressAppUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressAppService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AddressApp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.address = entity;
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
                    const entity = new AddressApp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.address = entity;
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
