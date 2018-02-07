import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BasketService } from '../service/basket.service';
import { BasketItem } from '../../../interfaces/basket-item';

@Component({
    selector: 'app-basket-item',
    templateUrl: './basket-item.component.html',
    styleUrls: ['./basket-item.component.less']
})
export class BasketItemComponent implements OnInit {

    @Input() item: BasketItem;

    private subscription: Subscription;
    private currentCurrency: string;
    private exchangeRate: number;

    constructor(private basketService: BasketService) {
        this.subscription = this.basketService.getCurrency()
            .subscribe(currency => this.currentCurrency = currency);

        this.subscription = this.basketService.getExhangeRate()
            .subscribe(rate => this.exchangeRate = rate);
    }

    updateBasket(): void {
        this.item.qty > 0 ?  this.basketService.updateBasketItem(this.item) : this.removeFromBasket();
    }

    removeFromBasket(): void {
        this.basketService.removeFromBasket(this.item);
    }

    ngOnInit() {
    }
}
