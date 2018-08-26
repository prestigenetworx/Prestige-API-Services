import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrestigeSubscriptionApp } from 'app/shared/model/prestige-subscription-app.model';

type EntityResponseType = HttpResponse<IPrestigeSubscriptionApp>;
type EntityArrayResponseType = HttpResponse<IPrestigeSubscriptionApp[]>;

@Injectable({ providedIn: 'root' })
export class PrestigeSubscriptionAppService {
    private resourceUrl = SERVER_API_URL + 'api/prestige-subscriptions';

    constructor(private http: HttpClient) {}

    create(prestigeSubscription: IPrestigeSubscriptionApp): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(prestigeSubscription);
        return this.http
            .post<IPrestigeSubscriptionApp>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(prestigeSubscription: IPrestigeSubscriptionApp): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(prestigeSubscription);
        return this.http
            .put<IPrestigeSubscriptionApp>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPrestigeSubscriptionApp>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPrestigeSubscriptionApp[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(prestigeSubscription: IPrestigeSubscriptionApp): IPrestigeSubscriptionApp {
        const copy: IPrestigeSubscriptionApp = Object.assign({}, prestigeSubscription, {
            startDate:
                prestigeSubscription.startDate != null && prestigeSubscription.startDate.isValid()
                    ? prestigeSubscription.startDate.toJSON()
                    : null,
            endDate:
                prestigeSubscription.endDate != null && prestigeSubscription.endDate.isValid()
                    ? prestigeSubscription.endDate.toJSON()
                    : null,
            renewalDate:
                prestigeSubscription.renewalDate != null && prestigeSubscription.renewalDate.isValid()
                    ? prestigeSubscription.renewalDate.toJSON()
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        res.body.renewalDate = res.body.renewalDate != null ? moment(res.body.renewalDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((prestigeSubscription: IPrestigeSubscriptionApp) => {
            prestigeSubscription.startDate = prestigeSubscription.startDate != null ? moment(prestigeSubscription.startDate) : null;
            prestigeSubscription.endDate = prestigeSubscription.endDate != null ? moment(prestigeSubscription.endDate) : null;
            prestigeSubscription.renewalDate = prestigeSubscription.renewalDate != null ? moment(prestigeSubscription.renewalDate) : null;
        });
        return res;
    }
}
