/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { ChargeAppDetailComponent } from 'app/entities/charge-app/charge-app-detail.component';
import { ChargeApp } from 'app/shared/model/charge-app.model';

describe('Component Tests', () => {
    describe('ChargeApp Management Detail Component', () => {
        let comp: ChargeAppDetailComponent;
        let fixture: ComponentFixture<ChargeAppDetailComponent>;
        const route = ({ data: of({ charge: new ChargeApp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [ChargeAppDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ChargeAppDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChargeAppDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.charge).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
