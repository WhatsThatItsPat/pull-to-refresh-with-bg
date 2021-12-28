import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BgSwapPageRoutingModule } from './bg-swap-routing.module';

import { BgSwapPage } from './bg-swap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BgSwapPageRoutingModule
  ],
  declarations: [BgSwapPage]
})
export class BgSwapPageModule {}
