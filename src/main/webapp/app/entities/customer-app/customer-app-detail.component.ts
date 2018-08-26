import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerApp } from 'app/shared/model/customer-app.model';

@Component({
    selector: 'jhi-customer-app-detail',
    templateUrl: './customer-app-detail.component.html'
})
export class CustomerAppDetailComponent implements OnInit {
    customer: ICustomerApp;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
    }

    previousState() {
        window.history.back();
    }
}
