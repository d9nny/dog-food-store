import { TestBed, ComponentFixture, async, inject  } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreComponent } from './store.component';
import { ProductCardComponent } from '../product-card/product-card.component';

import { StoreService } from '../service/store.service';


describe('StoreComponent', () => {
    let component: StoreComponent,
        fixture: ComponentFixture<StoreComponent>,
        spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                FormsModule,
                RouterModule,
                RouterTestingModule,
                HttpModule
            ],
            declarations: [
                StoreComponent,
                ProductCardComponent
            ],
            providers: [
                StoreService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create the store', () => {
        expect(component).toBeTruthy();
    });

    // it('should call getWindow', async(() => {
    //     spy = spyOn(component, 'getWindow');
    //     expect(component.getWindow).toHaveBeenCalled();
    // }));

    // it('should have products', () => {
    //     expect(component.products.length).toBeGreaterThan(0);
    // });

});
