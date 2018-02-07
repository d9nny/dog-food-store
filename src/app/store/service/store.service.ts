import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Product } from '../../shared/interfaces/product';

@Injectable()
export class StoreService {

    constructor(private http: Http) {}

    getProducts(type): Observable<Product[]> {
        return this.http.get(`/assets/data/${ type }-products.json`)
            .map(res => res.json());
    }
}
