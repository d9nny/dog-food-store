import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { BasketService } from '../../basket/service/basket.service';


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

    private isNavbarCollapsed = true;
    private subscription: Subscription
    private basketCount = 0;

    constructor(private basketService: BasketService) {
        this.subscription = this.basketService.getBasket()
            .subscribe(basket => {
                this.basketCount = 0;
                basket.forEach(item => this.basketCount += item.qty);
            });
    }

    ngOnInit() {
    }

}
