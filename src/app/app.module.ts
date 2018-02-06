import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from './store/store.module';


import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        StoreModule,
        RouterModule.forRoot([])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
