import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotCustomPropertyPageRoutingModule } from './not-custom-property-routing.module';

import { NotCustomPropertyPage } from './not-custom-property.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotCustomPropertyPageRoutingModule
  ],
  declarations: [NotCustomPropertyPage]
})
export class NotCustomPropertyPageModule {}
