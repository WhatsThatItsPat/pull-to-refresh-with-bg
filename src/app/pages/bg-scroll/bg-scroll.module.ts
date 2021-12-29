import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BgScrollPageRoutingModule } from './bg-scroll-routing.module';

import { BgScrollPage } from './bg-scroll.page';
import { BgScrollDirective } from 'src/app/bg-scroll.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BgScrollPageRoutingModule
  ],
  declarations: [
    BgScrollPage,
    BgScrollDirective
  ],
  exports: [BgScrollDirective]
})
export class BgScrollPageModule {}
