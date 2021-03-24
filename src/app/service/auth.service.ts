import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Storage} from '@ionic/storage';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  loginUrl = 'http://127.0.0.1:8000/api/login_check';
  private  allusers = 'http://127.0.0.1:8000/api/admin/users';
  private  Oneuser = 'http://127.0.0.1:8000/api/admin/users/connected';
  constructor(private http: HttpClient, private  storage: Storage, private navCtrl: NavController, private router: Router) { }
  public login(credentials: any): Observable<any>{
    return this.http.post<any>(this.loginUrl, credentials);
  }
  public getAllUsers(){
    return this.http.get(this.allusers);
  }
  public getConnected(){
    return this.http.get(this.Oneuser);
  }

  public decodeToken(token: any): string{
    return jwt_decode(token);
  }

  public saveToken(keyToken: string, value: string): void{
    this.storage.set(keyToken, value);
    localStorage.setItem('token', JSON.stringify(value));
    // string@gmail.com mdp: passer
  }
  getToken() {
    // return !!this.storage.get('credentials');
    return JSON.parse(localStorage.getItem('token') as string);
  }
  deconnecte(){
    // this.storage.remove
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  estConnecte(): any{
    return localStorage.getItem('token');
  }

  public getRoles(keyToken: any): any{
    this.storage.get(keyToken).then((token) => {
      // console.log(token.roles[0]);
      // localStorage.setItem('roles', decoded['roles']);
    });
  }
  goToHome(){
    this.navCtrl.navigateForward('/menu');
  }
  home(){
    this.navCtrl.navigateForward('/caissier');
  }
}
