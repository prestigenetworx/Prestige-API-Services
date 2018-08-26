/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { MetadataAppUpdateComponent } from 'app/entities/metadata-app/metadata-app-update.component';
import { MetadataAppService } from 'app/entities/metadata-app/metadata-app.service';
import { MetadataApp } from 'app/shared/model/metadata-app.model';

describe('Component Tests', () => {
    describe('MetadataApp Management Update Component', () => {
        let comp: MetadataAppUpdateComponent;
        let fixture: ComponentFixture<MetadataAppUpdateComponent>;
        let service: MetadataAppService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [MetadataAppUpdateComponent]
            })
                .overrideTemplate(MetadataAppUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MetadataAppUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MetadataAppService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MetadataApp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.metadata = entity;
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
                    const entity = new MetadataApp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.metadata = entity;
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
