import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BgOnContentPageRoutingModule } from './bg-on-content-routing.module';

import { BgOnContentPage } from './bg-on-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BgOnContentPageRoutingModule
  ],
  declarations: [BgOnContentPage]
})
export class BgOnContentPageModule {}
