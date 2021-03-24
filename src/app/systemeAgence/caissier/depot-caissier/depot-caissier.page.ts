import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CaissierService} from '../../../service/caissier.service';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-depot-caissier',
  templateUrl: './depot-caissier.page.html',
  styleUrls: ['./depot-caissier.page.scss'],
})
export class DepotCaissierPage implements OnInit {
  montant;
  compte;
  agence;
  nameCompte;
  listAgence: any;
  FormRecharge: FormGroup;
  constructor(private caissierService: CaissierService, private http: HttpClient, public alertController: AlertController) { }

  ngOnInit() {
    this.get();
    this.FormRecharge = new FormGroup({
      montant: new FormControl('', Validators.required),
      compte: new FormControl('', Validators.required),
    });
  }
  get(){
    this.caissierService.getAllAgences().subscribe(resp => {
      this.listAgence = resp['hydra:member'];
      this.listAgence.forEach((el: any) => {
          this.agence = el.nomAgence;
          this.nameCompte = el.compte.id;
       });
      console.log(resp);
       });
      }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: `DEPOT DU MONTANT <br> <strong>${this.FormRecharge.value.montant}</strong><br>    `,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        }, {
          text: 'Confirmer',
          handler: () => {
            this.depotCaissier();
          }
        }
      ]
    });

    await alert.present();
  }
  async succes(data) {
    const alert = await this.alertController.create({
      header: 'DEPOT réussi !!!',
      // tslint:disable-next-line:max-line-length
      subHeader: 'Compte de l\'Agence',
        // + data.date.dateDepot.substr(0, 10),
      message: 'Depot succes ' + data.montantDepot,
      buttons: ['OK']
    });

    await alert.present();
  }
  depotCaissier(){
    const body = {
      montantDepot : this.FormRecharge.value.montant,
      compte : this.FormRecharge.value.compte,
    };
    this.http.post<any>('http://127.0.0.1:8000/api/caissier/depot', body).subscribe(
      succes => {
        this.succes(succes);
        this.caissierService.home();
      },
      error => {
        console.log(error);
      }
    );

  }
}
