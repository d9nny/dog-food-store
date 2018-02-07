import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar-links',
    template: `
        <li class="nav-item">
            <a class="nav-link"
               routerLink="/shop/dry-food"
               routerLinkActive="active">Dry food</a>
        </li>
        <li class="nav-item">
            <a class="nav-link"
               routerLink="/shop/wet-food"
               routerLinkActive="active">Wet food</a>
        </li>
        <li class="nav-item">
            <a class="nav-link"
               routerLink="/shop/treats"
               routerLinkActive="active">Treats</a>
        </li>
    `,
})
export class NavbarLinksComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
