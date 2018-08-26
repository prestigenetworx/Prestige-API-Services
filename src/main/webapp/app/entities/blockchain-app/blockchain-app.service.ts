import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBlockchainApp } from 'app/shared/model/blockchain-app.model';

type EntityResponseType = HttpResponse<IBlockchainApp>;
type EntityArrayResponseType = HttpResponse<IBlockchainApp[]>;

@Injectable({ providedIn: 'root' })
export class BlockchainAppService {
    private resourceUrl = SERVER_API_URL + 'api/blockchains';

    constructor(private http: HttpClient) {}

    create(blockchain: IBlockchainApp): Observable<EntityResponseType> {
        return this.http.post<IBlockchainApp>(this.resourceUrl, blockchain, { observe: 'response' });
    }

    update(blockchain: IBlockchainApp): Observable<EntityResponseType> {
        return this.http.put<IBlockchainApp>(this.resourceUrl, blockchain, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IBlockchainApp>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IBlockchainApp[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
