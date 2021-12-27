import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BgOnContentPage } from './bg-on-content.page';

const routes: Routes = [
  {
    path: '',
    component: BgOnContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BgOnContentPageRoutingModule {}
