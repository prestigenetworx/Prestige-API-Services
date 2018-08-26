import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAddressApp } from 'app/shared/model/address-app.model';

type EntityResponseType = HttpResponse<IAddressApp>;
type EntityArrayResponseType = HttpResponse<IAddressApp[]>;

@Injectable({ providedIn: 'root' })
export class AddressAppService {
    private resourceUrl = SERVER_API_URL + 'api/addresses';

    constructor(private http: HttpClient) {}

    create(address: IAddressApp): Observable<EntityResponseType> {
        return this.http.post<IAddressApp>(this.resourceUrl, address, { observe: 'response' });
    }

    update(address: IAddressApp): Observable<EntityResponseType> {
        return this.http.put<IAddressApp>(this.resourceUrl, address, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAddressApp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAddressApp[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
