import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CalculatorService} from '../../service/calculator.service';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  isEmit = 'emeteur';
  montant: number;
  frais: number;
  total: number;
  FormDepot: FormGroup;
  constructor( private calcul: CalculatorService, private http: HttpClient, public alertController: AlertController, private authService: AuthService)
   { }

  ngOnInit() {
    this.FormDepot = new FormGroup({
        montant: new FormControl('', Validators.required),
        frais: new FormControl('', Validators.required),
        total: new FormControl('', Validators.required),
        CNI: new FormControl('', Validators.required),
        nomCompletEmetteur: new FormControl('', Validators.required),
        nomCompletBeneficiaire: new FormControl('', Validators.required),
        phoneEmetteur: new FormControl('', Validators.required),
        phoneBeneficiaire: new FormControl('', Validators.required),
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: `EMETTEUR <br> <strong>${this.FormDepot.value.nomCompletEmetteur}</strong><br>
                TELEPHONE <br> <strong>${this.FormDepot.value.phoneEmetteur}</strong><br>
                N° CNI <br> <strong>${this.FormDepot.value.CNI}</strong><br>
                MONTANT <br> <strong>${this.FormDepot.value.montant}</strong><br>
                RECEPTEUR <br> <strong>${this.FormDepot.value.nomCompletBeneficiaire}</strong><br>
                TELEPHONE <br> <strong>${this.FormDepot.value.phoneBeneficiaire}</strong><br> `,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        }, {
          text: 'Confirmer',
          handler: () => {
            this.depotClient();
          }
        }
      ]
    });

    await alert.present();
  }
  async succes(data) {
    const alert = await this.alertController.create({
      header: 'Transfert réussi !!!',
      // tslint:disable-next-line:max-line-length
      subHeader: 'INFOS !!! vous avez envoyé ' + data.date.montant + ' à ' + this.FormDepot.value.nomCompletBeneficiaire + ' le ' + data.date.dateDepot.substr(0, 10),
      message: 'CODE DE TRANSACTION: ' + data.date.codeTransaction,
      buttons: ['OK']
    });

    await alert.present();
  }
  onSelect(clic) {
    this.isEmit = clic;
  }
  calculateur(){
  this.frais = this.calcul.totalCommission(this.montant);
  this.total = this.montant + this.frais;
  }
  depotClient(){
    const body = {
      montant: this.montant,
      clientDepot: {
        nomComplet: this.FormDepot.value.nomCompletEmetteur,
        phone: this.FormDepot.value.phoneEmetteur,
        CNI: this.FormDepot.value.CNI
      },
      clientRetrait: {
        nomComplet: this.FormDepot.value.nomCompletBeneficiaire,
        phone: this.FormDepot.value.phoneBeneficiaire
      }
    };
    this.http.post('http://127.0.0.1:8000/api/transaction/depots', body).subscribe(
      succes => {
          this.succes(succes);
          this.authService.goToHome();
      },
      error => {
        console.log(error);
      }
    );

  }
}
