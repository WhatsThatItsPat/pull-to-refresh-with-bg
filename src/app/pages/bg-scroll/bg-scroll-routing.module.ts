import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BgScrollPage } from './bg-scroll.page';

const routes: Routes = [
  {
    path: '',
    component: BgScrollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BgScrollPageRoutingModule {}
