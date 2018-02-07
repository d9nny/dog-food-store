import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from './store/store.module';

import { BasketService } from './shared/components/basket/service/basket.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar/navbar.component';
import { BasketComponent } from './shared/components/basket/basket/basket.component';
import { BasketItemComponent } from './shared/components/basket/basket-item/basket-item.component';
import { NavbarLinksComponent } from './shared/components/navbar/navbar-links/navbar-links.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        BasketComponent,
        BasketItemComponent,
        NavbarLinksComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        StoreModule,
        RouterModule.forRoot([])
    ],
    providers: [
        BasketService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
