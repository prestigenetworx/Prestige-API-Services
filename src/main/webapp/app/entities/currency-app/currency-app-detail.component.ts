import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICurrencyApp } from 'app/shared/model/currency-app.model';

@Component({
    selector: 'jhi-currency-app-detail',
    templateUrl: './currency-app-detail.component.html'
})
export class CurrencyAppDetailComponent implements OnInit {
    currency: ICurrencyApp;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ currency }) => {
            this.currency = currency;
        });
    }

    previousState() {
        window.history.back();
    }
}
