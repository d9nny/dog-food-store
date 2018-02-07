import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

import { Product } from '../../shared/interfaces/product';

@Injectable()
export class StoreService implements Resolve<Product[]> {

    constructor(private http: Http,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
        const id = route.paramMap.get('id');

        return this.http.get(`/assets/data/${ id }-products.json`)
            .map(res => res.json());
    }
}
