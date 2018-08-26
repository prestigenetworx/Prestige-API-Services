import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrestigeSubscriptionApp } from 'app/shared/model/prestige-subscription-app.model';

@Component({
    selector: 'jhi-prestige-subscription-app-detail',
    templateUrl: './prestige-subscription-app-detail.component.html'
})
export class PrestigeSubscriptionAppDetailComponent implements OnInit {
    prestigeSubscription: IPrestigeSubscriptionApp;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ prestigeSubscription }) => {
            this.prestigeSubscription = prestigeSubscription;
        });
    }

    previousState() {
        window.history.back();
    }
}
