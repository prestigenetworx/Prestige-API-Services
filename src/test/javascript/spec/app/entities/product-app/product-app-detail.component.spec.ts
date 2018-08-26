/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { ProductAppDetailComponent } from 'app/entities/product-app/product-app-detail.component';
import { ProductApp } from 'app/shared/model/product-app.model';

describe('Component Tests', () => {
    describe('ProductApp Management Detail Component', () => {
        let comp: ProductAppDetailComponent;
        let fixture: ComponentFixture<ProductAppDetailComponent>;
        const route = ({ data: of({ product: new ProductApp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [ProductAppDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductAppDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductAppDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.product).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
