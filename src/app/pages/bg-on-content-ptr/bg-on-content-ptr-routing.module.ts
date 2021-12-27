import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BgOnContentPtRPage } from './bg-on-content-ptr.page';

const routes: Routes = [
  {
    path: '',
    component: BgOnContentPtRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BgOnContentPtRPageRoutingModule {}
