/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { ProductAppUpdateComponent } from 'app/entities/product-app/product-app-update.component';
import { ProductAppService } from 'app/entities/product-app/product-app.service';
import { ProductApp } from 'app/shared/model/product-app.model';

describe('Component Tests', () => {
    describe('ProductApp Management Update Component', () => {
        let comp: ProductAppUpdateComponent;
        let fixture: ComponentFixture<ProductAppUpdateComponent>;
        let service: ProductAppService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [ProductAppUpdateComponent]
            })
                .overrideTemplate(ProductAppUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductAppUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductAppService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductApp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.product = entity;
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
                    const entity = new ProductApp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.product = entity;
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
