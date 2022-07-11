import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullBgPage } from './full-bg.page';

const routes: Routes = [
  {
    path: '',
    component: FullBgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullBgPageRoutingModule {}
