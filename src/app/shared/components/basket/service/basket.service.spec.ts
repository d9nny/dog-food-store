import {async, fakeAsync, TestBed, tick, getTestBed} from '@angular/core/testing';
import { HttpModule, Http, ConnectionBackend, XHRBackend,
         RequestOptions, Response, BaseRequestOptions, ResponseOptions} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { BasketService } from './basket.service';
import { BasketItem } from '../../../interfaces/basket-item';

describe('BasketService', () => {
    let injector: TestBed,
        service: BasketService,
        mockBackend,
        lastConnection;

    const basket = [
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
    const item = {
        qty: 1,
        product: {
            'title': 'Barking Heads Fusspot',
            'sku': 'DF001',
            'size': '2kg Bag',
            'description': 'This Barking Heads Fusspot 2kg is a scrumptious adult salmon complete dog food that we are sure your dog will adore. Some of the fussiest dogs we know just love it! No more trying to encourage your fussy eater, instead you will be left with a clean empty bowl! Its just a shame there wont be any left for you! Approximate Dimensions (Product): 38 x 21 x 11cm',
            'price': 11.99,
            'thumbnailUrl': 'http://media.petsathome.com/wcsstore/pah-cas01//300/7101184PL.jpg'
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
            ],
            providers: [
                BasketService,
                Http,
                { provide: ConnectionBackend, useClass: MockBackend},
                { provide: RequestOptions, useClass: BaseRequestOptions},
            ]
        });
    });

    beforeEach(() => {
        injector = getTestBed();
        service = injector.get(BasketService);
        mockBackend = injector.get(ConnectionBackend) as MockBackend;
        mockBackend.connections.subscribe((connection: any) => lastConnection = connection);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('function: getExhangeRate', () => {
        it('should return an Observable<number>', () => {
            service.getExhangeRate().subscribe(number => {
                expect(number).toEqual(1);
            });
        });
    });

    describe('function: getLiveExchangeRates', () => {
        it('should return an Observable<any>', fakeAsync(() => {
            const currency = 'EUR',
                  url = service.exchangeRateUrl + currency,
                  mockResponse = {
                    'success': true,
                    'terms': 'https://currencylayer.com/terms',
                    'privacy': 'https://currencylayer.com/privacy',
                    'timestamp': 1517662565,
                    'source': 'USD',
                    'quotes': {
                        'USDGBP': 0.70808,
                        'USDEUR': 0.802304
                    }
                  };
            let result: any;

            service.getLiveExchangeRates(currency).subscribe(exchangeRates => {
                result = exchangeRates;
            });

            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse,
            })));

            tick();
            expect(result).toEqual(mockResponse);
        }));
    });

    describe('function: getCurrencies', () => {
        it('should return an Observable<any>', fakeAsync(() => {
            const url = service.currenciesUrl,
                  mockResponse = {
                    'success': true,
                    'terms': 'https://currencylayer.com/terms',
                    'privacy': 'https://currencylayer.com/privacy',
                    'currencies': {
                        'EUR': 'Euro',
                        'GBP': 'Pound',
                        'USD': 'United States Dollar',
                    }
                };
            let result: any;

            service.getCurrencies().subscribe(currencies => {
                result = currencies;
            });

            lastConnection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse,
            })));

            tick();
            expect(result).toEqual(mockResponse);
        }));
    });

    describe('function: getCurrency', () => {
        it('should return an Observable<string>', () => {
            const curr = 'GBP';
            service.selectCurrency(curr);
            service.getCurrency().subscribe(currency => {
                expect(currency).toEqual(curr);
            });
        });
    });

    describe('function: selectCurrency', () => {
        it('should selecct a currency', () => {
            const curr = 'GBP';
            service.selectCurrency(curr);
            service.getCurrency().subscribe(currency => {
                expect(currency).toEqual(curr);
            });
        });
    });

    describe('function: calculateTotal', () => {
        it('should calculate the total price of the basket', () => {
            let total = 0;
            basket.forEach(itm => total += itm.qty * itm.product.price);
            service.addToBasket(basket[0]);
            service.addToBasket(basket[1]);
            service.calculateTotal();
            service.getTotal().subscribe(t => {
                expect(t).toEqual(total);
            });
        });
    });

    describe('function: getTotal', () => {
        it('should get the total price of the basket', () => {
            let total = 0;
            basket.forEach(itm => total += itm.qty * itm.product.price);
            service.addToBasket(basket[0]);
            service.addToBasket(basket[1]);
            service.calculateTotal();
            service.getTotal().subscribe(t => {
                expect(t).toEqual(total);
            });
        });
    });

    describe('function: getBasket', () => {
        it('should return an Observable<string>', () => {
            service.addToBasket(item);
            service.getBasket().subscribe(bsk => {
                expect(bsk).toEqual([item]);
            });
        });
    });

    describe('function: addToBasket', () => {
        it('should add an item to the basket', () => {
            service.addToBasket(item);
            service.getBasket().subscribe(bsk => {
                expect(bsk).toEqual([item]);
            });
        });
    });

    describe('function: updateBasketItem', () => {
        it('should update an item in the basket', () => {
            const product = {
                    'title': `Pepper's Crunchy Chicken Dumbells Dog Treats With Chicken`,
                    'description': `Pepper's range of tasty meaty treats is just what's needed to let your dog know how much you love them. These tasty munchy sticks with delicious chicken balls will make the perfect treat for your dog. With yummy combinations of meat, raw hide and delicious natural ingredients help make Pepper's treats crazily irresistible and full of goodness. Perfectly scrumptious meaty treats.`,
                    'sku': 'T004',
                    'size': '100g Pack',
                    'price': 3.49,
                    'thumbnailUrl': 'http://media.petsathome.com/wcsstore/pah-cas01//300/25002PL.jpg'
                },
                  oldItem = {
                    product: product,
                    qty: 1
                },
                updatedItem = {
                    product: product,
                    qty: 5
                };
            service.addToBasket(oldItem);
            service.updateBasketItem(updatedItem);
            service.getBasket().subscribe(bsk => {
                expect(bsk).toEqual([updatedItem]);
            });
        });
    });

    describe('function: removeFromBasket', () => {
        it('should remove an item to the basket', () => {
            service.addToBasket(item);
            service.removeFromBasket(item);
            service.getBasket().subscribe(bsk => {
                expect(bsk.length).toEqual(0);
            });
        });
    });
});
