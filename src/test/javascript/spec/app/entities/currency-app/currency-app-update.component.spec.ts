/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { CurrencyAppUpdateComponent } from 'app/entities/currency-app/currency-app-update.component';
import { CurrencyAppService } from 'app/entities/currency-app/currency-app.service';
import { CurrencyApp } from 'app/shared/model/currency-app.model';

describe('Component Tests', () => {
    describe('CurrencyApp Management Update Component', () => {
        let comp: CurrencyAppUpdateComponent;
        let fixture: ComponentFixture<CurrencyAppUpdateComponent>;
        let service: CurrencyAppService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [CurrencyAppUpdateComponent]
            })
                .overrideTemplate(CurrencyAppUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CurrencyAppUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyAppService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CurrencyApp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.currency = entity;
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
                    const entity = new CurrencyApp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.currency = entity;
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
