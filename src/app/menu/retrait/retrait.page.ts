import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  isEmit = 'beneficiaire';
  FormRetrait: FormGroup;
  Transaction: any;
  codeTransaction;
  nomComplet;
  montant;
  phoneEmet;
  dateDepot;
  nomCompletBenef;
  phoneBenef;
  CNIemet;

  constructor(private http: HttpClient, public alertController: AlertController, private authService: AuthService) {
  }

  ngOnInit() {
    this.FormRetrait = new FormGroup({
      CNI: new FormControl('', Validators.required),
      codeTransaction: new FormControl('', Validators.required),
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: `BENEFICIAIRE <br> <strong>${this.nomCompletBenef}</strong><br>
                TELEPHONE <br> <strong>${this.phoneBenef}</strong><br>
                N° CNI <br> <strong>${this.FormRetrait.value.CNI}</strong><br>
                MONTANT Reçu <br> <strong>${this.montant}</strong><br>
                EMETTEUR <br> <strong>${this.nomComplet}</strong><br>
                TELEPHONE <br> <strong>${this.phoneEmet}</strong><br> `,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        }, {
          text: 'Confirmer',
          handler: () => {
            this.retraitClient();
          }
        }
      ]
    });

    await alert.present();
  }
  onSelect(clic) {
    this.isEmit = clic;
  }
  getTransac(){
    this.http.get('http://127.0.0.1:8000/api/transaction/' + this.codeTransaction).subscribe(
      rec => {
        this.Transaction = rec;
        if (this.Transaction){
          this.nomComplet = this.Transaction.clientDepot.nomComplet;
          this.montant = this.Transaction.montant;
          this.phoneEmet = this.Transaction.clientDepot.phone;
          this.dateDepot = this.Transaction.dateDepot;
          this.nomCompletBenef = this.Transaction.clientRetrait.nomComplet;
          this.phoneBenef = this.Transaction.clientRetrait.phone;
          this.CNIemet = this.Transaction.clientRetrait.CNI;
        }
        console.log(this.Transaction);
      },
    );
  }
  retraitClient() {
    const body = {
      codeTransaction: this.FormRetrait.value.codeTransaction,
      CNI: this.FormRetrait.value.CNI,
    };
    this.http.put('http://127.0.0.1:8000/api/transaction/retraits', body).subscribe(
      resp => {
        console.log(resp);
        this.authService.goToHome();
      },
      error => {
        console.log(error);
      }
    );
  }
}
