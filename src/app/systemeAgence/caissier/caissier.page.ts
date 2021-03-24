import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-caissier',
  templateUrl: './caissier.page.html',
  styleUrls: ['./caissier.page.scss'],
})
export class CaissierPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  Deconnecte() {
    this.authService.deconnecte();
  }

}
