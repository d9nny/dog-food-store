import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreService } from './store.service';
import { Product } from '../../shared/interfaces/product';

describe('StoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpModule,
                RouterModule,
                RouterTestingModule
            ],
            providers: [
                StoreService
            ]
        });
    });

    it('should be created', inject([StoreService], (service: StoreService) => {
        expect(service).toBeTruthy();
    }));

    // describe('function: getProducts', () => {
    //     it('should return an Observable<Product[]>', inject([StoreService], (service: StoreService) => {
    //         service.getProducts('dry-food').subscribe(products => {
    //             expect(products.length).toBeGreaterThan(0);
    //         });
    //     }));
    // });
});
