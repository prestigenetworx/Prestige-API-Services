import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProductApp } from 'app/shared/model/product-app.model';

type EntityResponseType = HttpResponse<IProductApp>;
type EntityArrayResponseType = HttpResponse<IProductApp[]>;

@Injectable({ providedIn: 'root' })
export class ProductAppService {
    private resourceUrl = SERVER_API_URL + 'api/products';

    constructor(private http: HttpClient) {}

    create(product: IProductApp): Observable<EntityResponseType> {
        return this.http.post<IProductApp>(this.resourceUrl, product, { observe: 'response' });
    }

    update(product: IProductApp): Observable<EntityResponseType> {
        return this.http.put<IProductApp>(this.resourceUrl, product, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProductApp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProductApp[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
