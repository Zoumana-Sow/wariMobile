import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logoSAMoney: 'assets/images/LogoMONEYSA.png';
  loginForm: FormGroup;
  private username: any;
  private password: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private alertCtrl: AlertController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.username = this.loginForm.controls.username;
    this.password = this.loginForm.controls.password;
  }

  isValidInput(fieldName: string | number): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(
      response => {
        console.log(response.token);
        const tokenDecode = this.authService.decodeToken(response.token);
        this.authService.saveToken('token', response.token);
        const role = tokenDecode['roles'];
        localStorage.setItem('roles', tokenDecode['roles']);
        // tslint:disable-next-line:triple-equals
        if (role == 'ROLE_Caissier'){
          this.authService.home();
          // tslint:disable-next-line:triple-equals
        }else{
          this.authService.goToHome();
        }
      },
      async error => {
        console.log(error);
        {
          const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Error',
            message: 'Adresse ou Mot de passe invalide',
            buttons: ['OK']
          });

          await alert.present();
        }
      },
    );
  }

}
//
// login(credentials: {username,password}): Observable<any>{
//   return this.http.post('http://127.0.0.1:8000/api/login_check', credentials).pipe(
//     map((data: any) => data.token),
//     switchMap(token =>{
//       // return from(Storage.set({key: TOKEN_KEY, value: token}));
//       return from(this.InfosSave(token));
//     }),
//     tap(_=> {
//       this.isAuthenticated.next(true);
//     })
//   )
// }
//
// async InfosSave(token){
//   this.myToken = token;
//   let from = jwt_decode(token);
//   this.myRole = from['
//   assane dione13:19
//   async getMyToken(){
//     const token = await Storage.get({key: TOKEN_KEY});
//     if (token && token.value){
//       this.token = token.value;
//
//       return this.token;
//     }
//   }
//   import { Plugins} from '@capacitor/core';
//   const { Storage } = Plugins;
