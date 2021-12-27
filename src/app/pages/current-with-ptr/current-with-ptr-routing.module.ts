import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentWithPtRPage } from './current-with-ptr.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentWithPtRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentWithPtRPageRoutingModule {}
