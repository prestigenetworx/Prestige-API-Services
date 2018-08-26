/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { PrestigeSubscriptionAppDetailComponent } from 'app/entities/prestige-subscription-app/prestige-subscription-app-detail.component';
import { PrestigeSubscriptionApp } from 'app/shared/model/prestige-subscription-app.model';

describe('Component Tests', () => {
    describe('PrestigeSubscriptionApp Management Detail Component', () => {
        let comp: PrestigeSubscriptionAppDetailComponent;
        let fixture: ComponentFixture<PrestigeSubscriptionAppDetailComponent>;
        const route = ({ data: of({ prestigeSubscription: new PrestigeSubscriptionApp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [PrestigeSubscriptionAppDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrestigeSubscriptionAppDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrestigeSubscriptionAppDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.prestigeSubscription).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
