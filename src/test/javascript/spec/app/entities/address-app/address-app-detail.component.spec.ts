/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { AddressAppDetailComponent } from 'app/entities/address-app/address-app-detail.component';
import { AddressApp } from 'app/shared/model/address-app.model';

describe('Component Tests', () => {
    describe('AddressApp Management Detail Component', () => {
        let comp: AddressAppDetailComponent;
        let fixture: ComponentFixture<AddressAppDetailComponent>;
        const route = ({ data: of({ address: new AddressApp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [AddressAppDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AddressAppDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AddressAppDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.address).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
