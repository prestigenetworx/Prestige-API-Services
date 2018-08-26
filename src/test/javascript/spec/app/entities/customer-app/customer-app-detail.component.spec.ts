/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { CustomerAppDetailComponent } from 'app/entities/customer-app/customer-app-detail.component';
import { CustomerApp } from 'app/shared/model/customer-app.model';

describe('Component Tests', () => {
    describe('CustomerApp Management Detail Component', () => {
        let comp: CustomerAppDetailComponent;
        let fixture: ComponentFixture<CustomerAppDetailComponent>;
        const route = ({ data: of({ customer: new CustomerApp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [CustomerAppDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CustomerAppDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerAppDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.customer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
