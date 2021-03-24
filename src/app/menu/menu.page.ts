import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AuthService} from '../service/auth.service';
import {element} from 'protractor';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
Helps = new JwtHelperService();
ishidden = false;
token: any;
usernameConnect: any;
user: any;
avatar: any;
solde: number;
date;
connected;
base64Data: any;
// tslint:disable-next-line:variable-name
converted_image: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.token = this.authService.getToken();
    const tokenDecode = this.Helps.decodeToken(this.token);
    this.usernameConnect = tokenDecode.username;
    this.authService.getAllUsers().subscribe(
      resp => {
       this.user = resp['hydra:member'];
       this.user.forEach((el: any) => {
          if (el.email === this.usernameConnect){
            this.avatar = el.avatar;
            this.converted_image = "data:image/jpeg;base64," + this.avatar;
            this.solde = el.agenceUser.compte.solde;
            this.date = new Date();
            console.log(el);
          }
        });
      }
    );
    // this.authService.getConnected().subscribe(
    //   response => {
    //     const connected = response;
    //     this.base64Data = connected['avatar'];
    //     this.converted_image = "data:image/jpeg;base64," + this.base64Data;
    //     this.solde = this.connected['comptes'];
    //     this.date = new Date();
    //     console.log(connected);
    // }
    // );
    // console.log(el.agenceUser.compte.solde);
    console.log(this.usernameConnect);
  }

  Deconnecte() {
    this.authService.deconnecte();
  }
}
