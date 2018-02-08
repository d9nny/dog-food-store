import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BasketItemComponent } from './basket-item.component';
import { BasketService } from '../service/basket.service';
import { MockBasketService } from '../service/basket.mock';
import { BasketItem } from '../../../interfaces/basket-item';

describe('BasketItemComponent', () => {
    let component: BasketItemComponent,
    fixture: ComponentFixture<BasketItemComponent>,
    expectedItem: BasketItem,
    basketService,
    spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                BasketItemComponent
            ],
            providers: [
                { provide: BasketService, useClass: MockBasketService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BasketItemComponent);
        component = fixture.componentInstance;
        basketService = fixture.debugElement.injector.get(BasketService);
        expectedItem = {
            'qty': 1,
            'product': {
                'title': 'Barking Heads Fusspot',
                'sku': 'DF001',
                'size': '2kg Bag',
                'description': 'This Barking Heads Fusspot 2kg is a scrumptious adult salmon complete dog food that we are sure your dog will adore. Some of the fussiest dogs we know just love it! No more trying to encourage your fussy eater, instead you will be left with a clean empty bowl! Its just a shame there wont be any left for you! Approximate Dimensions (Product): 38 x 21 x 11cm',
                'price': 11.99,
                'thumbnailUrl': 'http://media.petsathome.com/wcsstore/pah-cas01//300/7101184PL.jpg'
            }
        };
        component.item = expectedItem;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    describe('function: updateBasket', () => {
        it('should call basketService.updateBasketItem with item if qty > 0', () => {
            spy = spyOn(basketService, 'updateBasketItem');
            component.updateBasket();
            expect(basketService.updateBasketItem).toHaveBeenCalledWith(expectedItem);
        });

        it('should call basketService.removeFromBasket with item if qty < 0', () => {
            spy = spyOn(basketService, 'removeFromBasket');
            component.item.qty --;
            component.updateBasket();
            expect(basketService.removeFromBasket).toHaveBeenCalledWith(expectedItem);
        });
    });

    describe('function: removeFromBasket', () => {
        it('should call basketService.removeFromBasket with item', () => {
            spy = spyOn(basketService, 'removeFromBasket');
            component.removeFromBasket();
            expect(basketService.removeFromBasket).toHaveBeenCalledWith(expectedItem);
        });
    });
});

