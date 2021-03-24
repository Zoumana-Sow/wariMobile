import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CaissierService {
  private  urlagences = 'http://127.0.0.1:8000/api/admin/agences';
  constructor(private http: HttpClient, private navCtrl: NavController, private router: Router) { }
  public getAllAgences(){
    return this.http.get(this.urlagences);
  }
home(){
    this.navCtrl.navigateForward('/caissier');
  }
}
