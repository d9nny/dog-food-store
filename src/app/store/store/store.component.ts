import { Component, OnInit, HostListener } from '@angular/core';
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
    public mobileScreen = false;

    constructor(private route: ActivatedRoute,
                private storeService: StoreService) {}


    @HostListener('window:resize')
        onWindowResize() {
            this.getWindow();
        }

    getWindow() {
        if (window.innerWidth < 576) { this.mobileScreen = true; }
    }

    ngOnInit() {
        this.getWindow();
        this.route.data
            .subscribe((data: { products: Product[] }) => {
                this.products = data.products;
            });
    }

}
