import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'current',
    pathMatch: 'full'
  },
  {
    path: 'current',
    loadChildren: () => import('./pages/current/current.module').then( m => m.CurrentPageModule)
  },
  {
    path: 'current-with-ptr',
    loadChildren: () => import('./pages/current-with-ptr/current-with-ptr.module').then( m => m.CurrentWithPtRPageModule)
  },
  {
    path: 'bg-on-content',
    loadChildren: () => import('./pages/bg-on-content/bg-on-content.module').then( m => m.BgOnContentPageModule)
  },
  {
    path: 'bg-on-content-ptr',
    loadChildren: () => import('./pages/bg-on-content-ptr/bg-on-content-ptr.module').then( m => m.BgOnContentPtRPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
