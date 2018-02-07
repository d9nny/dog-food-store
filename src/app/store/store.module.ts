import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { StoreService } from './service/store.service';

import { StoreComponent } from './store/store.component';
import { ProductCardComponent } from './product-card/product-card.component';

const routes: Routes = [
    { path: 'shop/:id',  component: StoreComponent }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        StoreService,
    ],
    declarations: [
        StoreComponent,
        ProductCardComponent,
    ]
})
export class StoreModule { }
