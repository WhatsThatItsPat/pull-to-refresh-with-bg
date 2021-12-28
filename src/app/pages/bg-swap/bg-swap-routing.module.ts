import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BgSwapPage } from './bg-swap.page';

const routes: Routes = [
  {
    path: '',
    component: BgSwapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BgSwapPageRoutingModule {}
