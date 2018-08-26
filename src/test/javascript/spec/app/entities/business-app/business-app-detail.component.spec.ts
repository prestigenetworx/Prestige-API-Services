/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { BusinessAppDetailComponent } from 'app/entities/business-app/business-app-detail.component';
import { BusinessApp } from 'app/shared/model/business-app.model';

describe('Component Tests', () => {
    describe('BusinessApp Management Detail Component', () => {
        let comp: BusinessAppDetailComponent;
        let fixture: ComponentFixture<BusinessAppDetailComponent>;
        const route = ({ data: of({ business: new BusinessApp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [BusinessAppDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BusinessAppDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BusinessAppDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.business).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
