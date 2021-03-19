import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  Deconnecte() {
    this.authService.deconnecte();
  }
}
