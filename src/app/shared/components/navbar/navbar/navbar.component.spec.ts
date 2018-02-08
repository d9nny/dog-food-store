import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


import { NavbarComponent } from './navbar.component';
import { NavbarLinksComponent } from '../navbar-links/navbar-links.component';
import { BasketComponent } from '../../basket/basket/basket.component';
import { BasketItemComponent } from '../../basket/basket-item/basket-item.component';

import { BasketService } from '../../basket/service/basket.service';
import { MockBasketService } from '../../basket/service/basket.mock';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule.forRoot(),
                FormsModule,
                RouterModule,
                RouterTestingModule
            ],
            declarations: [
                NavbarComponent,
                NavbarLinksComponent,
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
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
