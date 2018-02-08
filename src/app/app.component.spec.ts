import { TestBed, async } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';


import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar/navbar.component';
import { NavbarLinksComponent } from './shared/components/navbar/navbar-links/navbar-links.component';
import { BasketComponent } from './shared/components/basket/basket/basket.component';
import { BasketItemComponent } from './shared/components/basket/basket-item/basket-item.component';


import { BasketService } from './shared/components/basket/service/basket.service';
import { MockBasketService } from './shared/components/basket/service/basket.mock';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterModule.forRoot([]),
                NgbModule.forRoot()
            ],
            declarations: [
                AppComponent,
                NavbarComponent,
                NavbarLinksComponent,
                BasketComponent,
                BasketItemComponent
            ],
            providers: [
                { provide: BasketService, useClass: MockBasketService},
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
