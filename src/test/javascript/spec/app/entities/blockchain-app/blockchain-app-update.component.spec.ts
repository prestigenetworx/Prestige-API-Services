/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { BlockchainAppUpdateComponent } from 'app/entities/blockchain-app/blockchain-app-update.component';
import { BlockchainAppService } from 'app/entities/blockchain-app/blockchain-app.service';
import { BlockchainApp } from 'app/shared/model/blockchain-app.model';

describe('Component Tests', () => {
    describe('BlockchainApp Management Update Component', () => {
        let comp: BlockchainAppUpdateComponent;
        let fixture: ComponentFixture<BlockchainAppUpdateComponent>;
        let service: BlockchainAppService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [BlockchainAppUpdateComponent]
            })
                .overrideTemplate(BlockchainAppUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BlockchainAppUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlockchainAppService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new BlockchainApp(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.blockchain = entity;
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
                    const entity = new BlockchainApp();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.blockchain = entity;
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
