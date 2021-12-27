import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartPseudoPage } from './part-pseudo.page';

const routes: Routes = [
  {
    path: '',
    component: PartPseudoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartPseudoPageRoutingModule {}
