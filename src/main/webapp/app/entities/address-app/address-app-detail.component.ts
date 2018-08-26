import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAddressApp } from 'app/shared/model/address-app.model';

@Component({
    selector: 'jhi-address-app-detail',
    templateUrl: './address-app-detail.component.html'
})
export class AddressAppDetailComponent implements OnInit {
    address: IAddressApp;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ address }) => {
            this.address = address;
        });
    }

    previousState() {
        window.history.back();
    }
}
