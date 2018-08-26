import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICustomerApp } from 'app/shared/model/customer-app.model';

type EntityResponseType = HttpResponse<ICustomerApp>;
type EntityArrayResponseType = HttpResponse<ICustomerApp[]>;

@Injectable({ providedIn: 'root' })
export class CustomerAppService {
    private resourceUrl = SERVER_API_URL + 'api/customers';

    constructor(private http: HttpClient) {}

    create(customer: ICustomerApp): Observable<EntityResponseType> {
        return this.http.post<ICustomerApp>(this.resourceUrl, customer, { observe: 'response' });
    }

    update(customer: ICustomerApp): Observable<EntityResponseType> {
        return this.http.put<ICustomerApp>(this.resourceUrl, customer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICustomerApp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICustomerApp[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
