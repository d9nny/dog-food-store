import { Observable } from 'rxjs/Observable';
import { BasketItem } from '../../../interfaces/basket-item';
import 'rxjs/add/observable/of';


const currencies = {
    'success': true,
    'terms': 'https://currencylayer.com/terms',
    'privacy': 'https://currencylayer.com/privacy',
    'currencies': {
        'EUR': 'Euro',
        'GBP': 'Pound',
        'USD': 'United States Dollar',
    }
},
exchangeRates = {
    'success': true,
    'terms': 'https://currencylayer.com/terms',
    'privacy': 'https://currencylayer.com/privacy',
    'timestamp': 1517662565,
    'source': 'USD',
    'quotes': {
        'USDGBP': 0.70808,
        'USDEUR': 0.802304
    }
},
currency = 'GBP',
exchangeRate = 1,
updatedExchangeRate = 1.4,
basket = [
    {
        qty: 2,
        product: {
            'title': `Pepper's Crunchy Chicken Dumbells Dog Treats With Chicken`,
            'description': `Pepper's range of tasty meaty treats is just what's needed to let your dog know how much you love them. These tasty munchy sticks with delicious chicken balls will make the perfect treat for your dog. With yummy combinations of meat, raw hide and delicious natural ingredients help make Pepper's treats crazily irresistible and full of goodness. Perfectly scrumptious meaty treats.`,
            'sku': 'T004',
            'size': '100g Pack',
            'price': 3.49,
            'thumbnailUrl': 'http://media.petsathome.com/wcsstore/pah-cas01//300/25002PL.jpg'
        }
    },
    {
        qty: 1,
        product: {
            'title': 'Barking Heads Fusspot',
            'sku': 'DF001',
            'size': '2kg Bag',
            'description': 'This Barking Heads Fusspot 2kg is a scrumptious adult salmon complete dog food that we are sure your dog will adore. Some of the fussiest dogs we know just love it! No more trying to encourage your fussy eater, instead you will be left with a clean empty bowl! Its just a shame there wont be any left for you! Approximate Dimensions (Product): 38 x 21 x 11cm',
            'price': 11.99,
            'thumbnailUrl': 'http://media.petsathome.com/wcsstore/pah-cas01//300/7101184PL.jpg'
        }
    }
];

export class MockBasketService {

    getExhangeRate(): Observable<number> {
        return Observable.of(exchangeRate);
    }

    getLiveExchangeRates(curr: string): Observable<any> {
        return Observable.of(exchangeRates);
    }

    getCurrencies(): Observable<any> {
        return Observable.of(currencies);
    }

    getCurrency(): Observable<string> {
        return Observable.of(currency);
    }

    selectCurrency(curr: string): void {}

    calculateTotal(): void {}

    getTotal(): Observable<number> {
        let total;
        basket.forEach(item => total += item.product.price * item.qty);
        return Observable.of(total);
    }

    getBasket(): Observable<BasketItem[]> {
        return Observable.of(basket);
    }

    addToBasket(newItem: BasketItem): void {
        this.updateBasket();
    }

    updateBasketItem(updatedItem: BasketItem): void {
        this.updateBasket();
    }

    removeFromBasket(removedItem: BasketItem): void {
        this.updateBasket();
    }

    updateBasket(): void {}
};
