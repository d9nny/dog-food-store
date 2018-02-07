import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { BasketService } from '../service/basket.service';
import { BasketItem } from '../../../interfaces/basket-item';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.less']
})
export class BasketComponent implements OnInit {

    public currencies: any[];
    public currentCurrency: string;
    public errors = [];

    private subscription: Subscription;
    private currencyDropdownOpen = false;
    private exchangeRate: number;
    private basket: BasketItem[] = [];
    private total = 0;

    constructor(private basketService: BasketService) {
        this.subscription = this.basketService.getBasket()
            .subscribe(basket => {
                this.basket = basket;
                this.calculateTotal();
            });

        this.subscription = this.basketService.getCurrency()
            .subscribe(currency => this.currentCurrency = currency);

        this.subscription = this.basketService.getExhangeRate()
            .subscribe(rate => this.exchangeRate = rate);

        this.subscription = this.basketService.getTotal()
            .subscribe(total => this.total = total);
    }

    selectCurrency(currency): void {
        this.basketService.selectCurrency(currency);
        this.basketService.getLiveExchangeRates(currency)
            .subscribe(
                res => res.success ? this.removeError('exchangeRate') :
                                     this.addError('exchangeRate'),
                err => this.addError('exchangeRate'));
    }

    calculateTotal(): void {
        this.basketService.calculateTotal();
    }

    addError(errorCode): void {
        let message;
        if (errorCode === 'currency') { message = 'Unable to get currency options'; }
        if (errorCode === 'exchangeRate') { message = 'Unable to get exchange rates'; }
        this.errors.unshift({code: errorCode, message: message });
    }

    removeError(errorCode): void {
        const index = this.errors.findIndex(error => errorCode === error.code);
        if (index > -1) { this.errors.splice(index, 1); }
    }

    ngOnInit() {
        this.selectCurrency('GBP');
        this.basketService.getCurrencies()
            .subscribe(
                res => res && res.success ? this.currencies = Object.keys(res.currencies) :
                                     this.addError('currency'),
                err => this.addError('currency'));
    }

}

