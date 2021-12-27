import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotCustomPropertyPage } from './not-custom-property.page';

const routes: Routes = [
  {
    path: '',
    component: NotCustomPropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotCustomPropertyPageRoutingModule {}
