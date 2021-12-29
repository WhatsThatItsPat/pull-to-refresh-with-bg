import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BgScrollPageRoutingModule } from './bg-scroll-routing.module';

import { BgScrollPage } from './bg-scroll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BgScrollPageRoutingModule
  ],
  declarations: [BgScrollPage]
})
export class BgScrollPageModule {}
