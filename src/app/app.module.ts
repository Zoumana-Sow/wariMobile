import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {AuthService} from './service/auth.service';
import {AuthGuardService} from './service/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InterceptorProvider} from './interceptor/interceptor';
import {LoginGuardService} from './service/login-guard.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule, IonicStorageModule.forRoot(), HttpClientModule],
  providers: [ AuthService, InterceptorProvider, AuthGuardService, LoginGuardService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
