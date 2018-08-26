/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { MetadataAppDetailComponent } from 'app/entities/metadata-app/metadata-app-detail.component';
import { MetadataApp } from 'app/shared/model/metadata-app.model';

describe('Component Tests', () => {
    describe('MetadataApp Management Detail Component', () => {
        let comp: MetadataAppDetailComponent;
        let fixture: ComponentFixture<MetadataAppDetailComponent>;
        const route = ({ data: of({ metadata: new MetadataApp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [MetadataAppDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MetadataAppDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MetadataAppDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.metadata).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
