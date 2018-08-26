import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChargeApp } from 'app/shared/model/charge-app.model';

@Component({
    selector: 'jhi-charge-app-detail',
    templateUrl: './charge-app-detail.component.html'
})
export class ChargeAppDetailComponent implements OnInit {
    charge: IChargeApp;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ charge }) => {
            this.charge = charge;
        });
    }

    previousState() {
        window.history.back();
    }
}
