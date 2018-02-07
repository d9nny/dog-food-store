import { TestBed, ComponentFixture, async, inject  } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreComponent } from './store.component';
import { ProductCardComponent } from './product-card/product-card.component';

import { StoreService } from './shared/services/store-service/store.service';

describe('AppComponent', () => {
    let component: AppComponent,
        fixture: ComponentFixture<StoreComponent>,
        storeService,
        spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
            ],
            declarations: [
                StoreComponent,
                ProductCardComponent
            ],
            providers: [
                { provide: StoreService, useClass: MockStoreService },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        storeService = fixture.debugElement.injector.get(StoreService);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create the store', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should get products', async(() => {
        spy = spyOn(storeService, 'getProducts');
        expect(storeService.getProducts).toHaveBeenCalledWith('dry-food');
        expect(component.products.length).toBeGreaterThan(0);
    }));

});
