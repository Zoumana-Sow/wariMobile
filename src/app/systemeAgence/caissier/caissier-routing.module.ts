import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaissierPage } from './caissier.page';

const routes: Routes = [
  {
    path: '',
    component: CaissierPage
  },
  {
    path: 'depot-caissier',
    loadChildren: () => import('./depot-caissier/depot-caissier.module').then( m => m.DepotCaissierPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaissierPageRoutingModule {}
