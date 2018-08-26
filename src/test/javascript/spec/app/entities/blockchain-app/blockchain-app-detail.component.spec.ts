/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrestigeTestModule } from '../../../test.module';
import { BlockchainAppDetailComponent } from 'app/entities/blockchain-app/blockchain-app-detail.component';
import { BlockchainApp } from 'app/shared/model/blockchain-app.model';

describe('Component Tests', () => {
    describe('BlockchainApp Management Detail Component', () => {
        let comp: BlockchainAppDetailComponent;
        let fixture: ComponentFixture<BlockchainAppDetailComponent>;
        const route = ({ data: of({ blockchain: new BlockchainApp(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrestigeTestModule],
                declarations: [BlockchainAppDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BlockchainAppDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BlockchainAppDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.blockchain).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
