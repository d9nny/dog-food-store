import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { BasketItem } from '../../../interfaces/basket-item';

@Injectable()
export class BasketService {

    // If this was a real app, I would call the apis from the BE
    public currenciesUrl = 'http://www.apilayer.net/api/list?access_key=4f2d9d908624c51843df7baa14eee918&currencies';
    public exchangeRateUrl = 'http://www.apilayer.net/api/live?access_key=4f2d9d908624c51843df7baa14eee918&currencies=GBP,';

    private basketSubject: BehaviorSubject<BasketItem[]> = new BehaviorSubject([]);
    private basket: BasketItem[] = [];
    private currentCurrencySubject: BehaviorSubject<string> = new BehaviorSubject('');
    private currentCurrency = '';
    private exchangeRateSubject: BehaviorSubject<number> = new BehaviorSubject(1);
    private exchangeRate = 1;
    private totalSubject: BehaviorSubject<number> = new BehaviorSubject(0);
    private total = 0;

    constructor(private http: Http) {
        this.basketSubject.subscribe(basket => this.basket = basket);
    }

    getExhangeRate(): Observable<number> {
        return this.exchangeRateSubject;
    }

    getLiveExchangeRates(currency): Observable<any> {
        return this.http.get(this.exchangeRateUrl + currency)
            .map(res => {
                // Free account on currencylayer uses USD as source, so this converts
                // to make pound the source
                if (res.json().success) {
                    if (currency !== 'GBP') {
                        this.exchangeRate = 1 / res.json().quotes.USDGBP;
                        this.exchangeRate = this.exchangeRate * res.json().quotes[`USD${ currency }`];
                    } else {
                        this.exchangeRate = 1;
                    }
                    this.exchangeRateSubject.next(this.exchangeRate);
                }
                return res.json();
            });
    }

    getCurrencies(): Observable<any> {
        return this.http.get(this.currenciesUrl)
            .map(res => res.json());
    }

    getCurrency(): Observable<string> {
        return this.currentCurrencySubject;
    }

    selectCurrency(currency): void {
        this.currentCurrencySubject.next(currency);
    }

    calculateTotal(): void {
        this.total = 0;
        this.basket.forEach(item => this.total += item.product.price * item.qty);
        this.totalSubject.next(this.total);
    }

    getTotal(): Observable<number> {
        return this.totalSubject;
    }

    getBasket(): Observable<BasketItem[]> {
        return this.basketSubject;
    }

    addToBasket(newItem: BasketItem): void {
        const index = this.basket.findIndex(item => newItem.product.sku === item.product.sku);
        index < 0 ? this.basket.push(newItem) : this.basket[index].qty += newItem.qty;
        this.updateBasket();
    }

    updateBasketItem(updatedItem: BasketItem): void {
        const index = this.basket.findIndex(item => updatedItem.product.sku === item.product.sku);
        this.basket[index] = updatedItem;
        this.updateBasket();
    }

    removeFromBasket(removedItem: BasketItem): void {
        const index = this.basket.findIndex(item => removedItem.product.sku === item.product.sku);
        this.basket.splice(index, 1);
        this.updateBasket();
    }

    updateBasket(): void {
        this.basketSubject.next(this.basket);
    }
}
