import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWallet } from 'app/shared/model/wallet.model';
import { WalletService } from '../wallet.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-wallet-new',
    templateUrl: './wallet-new.component.html',
    styleUrls: ['../wallet.scss']
})
export class WalletNewComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
