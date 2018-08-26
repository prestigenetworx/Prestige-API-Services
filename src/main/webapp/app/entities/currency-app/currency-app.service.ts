import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICurrencyApp } from 'app/shared/model/currency-app.model';

type EntityResponseType = HttpResponse<ICurrencyApp>;
type EntityArrayResponseType = HttpResponse<ICurrencyApp[]>;

@Injectable({ providedIn: 'root' })
export class CurrencyAppService {
    private resourceUrl = SERVER_API_URL + 'api/currencies';

    constructor(private http: HttpClient) {}

    create(currency: ICurrencyApp): Observable<EntityResponseType> {
        return this.http.post<ICurrencyApp>(this.resourceUrl, currency, { observe: 'response' });
    }

    update(currency: ICurrencyApp): Observable<EntityResponseType> {
        return this.http.put<ICurrencyApp>(this.resourceUrl, currency, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICurrencyApp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICurrencyApp[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
