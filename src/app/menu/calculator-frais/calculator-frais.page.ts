import { Component, OnInit } from '@angular/core';
import {CalculatorService} from '../../service/calculator.service';
import {AlertController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-calculator-frais',
  templateUrl: './calculator-frais.page.html',
  styleUrls: ['./calculator-frais.page.scss'],
})
export class CalculatorFraisPage implements OnInit {
  montant;
  FormCalcul: FormGroup;
  constructor(private calcul: CalculatorService, public alertController: AlertController) { }

  ngOnInit() {
    this.FormCalcul = new FormGroup({
      montant: new FormControl('', Validators.required),
    });
  }
  rec(){
    return this.montant;
  }
  async succes() {
    const alert = await this.alertController.create({
      header: 'Calculateur',
      subHeader: 'Pour une transaction de ' + this.montant,
      message: 'le frais est égal à: ' + this.calcul.totalCommission(this.montant),
      buttons: ['OK']
    });
    await alert.present();
  }
}
