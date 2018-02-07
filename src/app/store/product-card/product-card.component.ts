import { Component, OnInit, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { BasketService } from '../../shared/components/basket/service/basket.service';
import { Product } from '../../shared/interfaces/product';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit {

    @Input() product: Product;

    public qty = 1;

    constructor(private basketService: BasketService) { }

    addToBasket(): void {
        const item = { product: this.product, qty: this.qty };
        this.basketService.addToBasket(item);
        this.qty = 1;
    }

    ngOnInit() {
    }

}
