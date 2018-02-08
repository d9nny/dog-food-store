import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ProductCardComponent } from './product-card.component';
import { BasketService } from '../../shared/components/basket/service/basket.service';
import { MockBasketService } from '../../shared/components/basket/service/basket.mock';

describe('ProductCardComponent', () => {
    let component: ProductCardComponent,
        fixture: ComponentFixture<ProductCardComponent>,
        basketService,
        expectedProduct,
        spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                ProductCardComponent
            ],
            providers: [
                { provide: BasketService, useClass: MockBasketService }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductCardComponent);
        component = fixture.componentInstance;
        basketService = fixture.debugElement.injector.get(BasketService);
        expectedProduct = {
            'title': 'Barking Heads Fusspot',
            'sku': 'DF001',
            'size': '2kg Bag',
            'description': 'This Barking Heads Fusspot 2kg is a scrumptious adult salmon complete dog food that we are sure your dog will adore. Some of the fussiest dogs we know just love it! No more trying to encourage your fussy eater, instead you will be left with a clean empty bowl! Its just a shame there wont be any left for you! Approximate Dimensions (Product): 38 x 21 x 11cm',
            'price': 11.99,
            'thumbnailUrl': 'http://media.petsathome.com/wcsstore/pah-cas01//300/7101184PL.jpg'
        };
        component.product = expectedProduct;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should created a qty variable equal to 1', () => {
        expect(component.qty).toEqual(1);
    });

    describe('function: addToBasket', () => {
        it('should call basketService.addToBasket with item', () => {
            spy = spyOn(basketService, 'addToBasket');
            component.addToBasket();
            expect(basketService.addToBasket).toHaveBeenCalledWith({qty: component.qty, product: expectedProduct});
        });

        it('should reset the qty back to 1', () => {
            component.qty = 5;
            component.addToBasket();
            fixture.detectChanges();
            expect(component.qty).toBe(1);
        });
    });
});
