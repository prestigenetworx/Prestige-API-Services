import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChargeApp } from 'app/shared/model/charge-app.model';

type EntityResponseType = HttpResponse<IChargeApp>;
type EntityArrayResponseType = HttpResponse<IChargeApp[]>;

@Injectable({ providedIn: 'root' })
export class ChargeAppService {
    private resourceUrl = SERVER_API_URL + 'api/charges';

    constructor(private http: HttpClient) {}

    create(charge: IChargeApp): Observable<EntityResponseType> {
        return this.http.post<IChargeApp>(this.resourceUrl, charge, { observe: 'response' });
    }

    update(charge: IChargeApp): Observable<EntityResponseType> {
        return this.http.put<IChargeApp>(this.resourceUrl, charge, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IChargeApp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IChargeApp[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
