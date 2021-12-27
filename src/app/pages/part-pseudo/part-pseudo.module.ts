import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartPseudoPageRoutingModule } from './part-pseudo-routing.module';

import { PartPseudoPage } from './part-pseudo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartPseudoPageRoutingModule
  ],
  declarations: [PartPseudoPage]
})
export class PartPseudoPageModule {}
