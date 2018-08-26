/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { CurrencyAppDetailComponent } from 'app/entities/currency-app/currency-app-detail.component';
import { CurrencyApp } from 'app/shared/model/currency-app.model';

describe('Component Tests', () => {
    describe('CurrencyApp Management Detail Component', () => {
        let comp: CurrencyAppDetailComponent;
        let fixture: ComponentFixture<CurrencyAppDetailComponent>;
        const route = ({ data: of({ currency: new CurrencyApp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [CurrencyAppDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CurrencyAppDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CurrencyAppDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.currency).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
