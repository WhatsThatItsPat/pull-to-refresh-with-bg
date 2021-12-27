import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentWithPtRPageRoutingModule } from './current-with-ptr-routing.module';

import { CurrentWithPtRPage } from './current-with-ptr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentWithPtRPageRoutingModule
  ],
  declarations: [CurrentWithPtRPage]
})
export class CurrentWithPtRPageModule {}
