import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';

import { BasketComponent } from './basket.component';
import { BasketItemComponent } from '../basket-item/basket-item.component';
import { BasketService } from '../service/basket.service';
import { MockBasketService } from '../service/basket.mock';

describe('BasketComponent', () => {
    let component: BasketComponent,
        fixture: ComponentFixture<BasketComponent>,
        basketService,
        spy;

    const currency = 'EUR';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                BasketComponent,
                BasketItemComponent
            ],
            providers: [
                { provide: BasketService, useClass: MockBasketService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasketComponent);
        component = fixture.componentInstance;
        basketService = fixture.debugElement.injector.get(BasketService);
        component.currentCurrency = 'GBP';
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should get currencies', () => {
        expect(component.currencies.length).toBeGreaterThan(0);
    });

    it('should select GBP as currentCurrency', () => {
        expect(component.currentCurrency).toEqual('GBP');
    });

    describe('function: calculateTotal', () => {
        it(`should call basketService.calculateTotal`, () => {
            spy = spyOn(basketService, 'calculateTotal');

            component.calculateTotal();
            expect(basketService.calculateTotal).toHaveBeenCalled();
        });
    });

    describe('function: selectCurrency', () => {
        it(`should call basketService.selectCurrency with ${ currency }`, () => {
            spy = spyOn(basketService, 'selectCurrency');
            component.selectCurrency(currency);
            expect(basketService.selectCurrency).toHaveBeenCalledWith(currency);
        });

        it(`should call basketService.getLiveExchangeRates with ${ currency }`, () => {
            spy = spyOn(basketService, 'getLiveExchangeRates').and.returnValue(Observable.of('GBP'));

            component.selectCurrency(currency);
            expect(basketService.getLiveExchangeRates).toHaveBeenCalledWith(currency);
        });

        it('should call removeErrors if basketService.getLiveExchangeRates succeeds', () => {
            spy = spyOn(basketService, 'getLiveExchangeRates')
                        .and.returnValue(Observable.of({success: true}));
            const spy2 = spy = spyOn(component, 'removeError');
            component.selectCurrency(currency);
            expect(component.removeError).toHaveBeenCalled();

        });

        it('should call addErrors if basketService.getLiveExchangeRates fails', () => {
            spy = spyOn(basketService, 'getLiveExchangeRates')
                        .and.returnValue(Observable.of({success: false}));
            const spy2 = spyOn(component, 'addError');
            component.selectCurrency(currency);
            expect(component.addError).toHaveBeenCalled();

        });
    });

    describe('function: addErrors', () => {
        it('should add an error obj', () => {
            component.addError('currency');
            expect(component.errors.length).toBeGreaterThan(0);
        });
    });

    describe('function: removeErrors', () => {
        it('should remove an error obj', () => {
            component.addError('currency');
            component.removeError('currency');
            expect(component.errors.length).toEqual(0);
        });
    });
});
