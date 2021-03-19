import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./depot/depot.module').then(m => m.DepotPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait.module').then(m => m.RetraitPageModule)
  },
  {
    path: 'commission',
    loadChildren: () => import('./commission/commission.module').then(m => m.CommissionPageModule)
  },
  {
    path: 'calculator-frais',
    loadChildren: () => import('./calculator-frais/calculator-frais.module').then( m => m.CalculatorFraisPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
