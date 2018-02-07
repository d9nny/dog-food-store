import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoreService } from '../service/store.service';
import { Product } from '../../shared/interfaces/product';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.less']
})
export class StoreComponent implements OnInit {

    public error = false;
    public products: Product[];

    constructor(private route: ActivatedRoute,
                private storeService: StoreService) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');

        this.storeService.getProducts(id)
            .subscribe(
                (products: Product[]) => {
                    this.error = false;
                    this.products = products;
                },
                err => this.error = true);
    }

}
