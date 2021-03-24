import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaissierPageRoutingModule } from './caissier-routing.module';

import { CaissierPage } from './caissier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaissierPageRoutingModule
  ],
  declarations: [CaissierPage]
})
export class CaissierPageModule {}
