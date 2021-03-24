import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
 public transactions: Array<any> = [];
  public page = 1;
  public pageSize = 10;
  id;
  total = 0;
  decode: any;
  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.decode = jwt_decode(this.authService.getToken());
    console.log(this.decode);
    this.id = this.decode.id;
    this.getTransac();
  }
  getTransac(){
    this.http.get('http://127.0.0.1:8000/api/admin/users/' + this.id + '/depots').subscribe(
      rec => {
        this.transactions = rec['hydra:member'];
        this.transactions.forEach(montant => {
          this.total += montant.montant;
        });
        console.log(this.transactions);
      },
      error => {
        console.log(error);
      }
    );
  }

}
