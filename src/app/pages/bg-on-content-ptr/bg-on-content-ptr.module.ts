import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BgOnContentPtRPageRoutingModule } from './bg-on-content-ptr-routing.module';

import { BgOnContentPtRPage } from './bg-on-content-ptr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BgOnContentPtRPageRoutingModule
  ],
  declarations: [BgOnContentPtRPage]
})
export class BgOnContentPtRPageModule {}
