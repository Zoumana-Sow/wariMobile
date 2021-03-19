import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

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
  async onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(
      response => {
        console.log(response.token);
        const tokenDecode = this.authService.decodeToken(response.token);
        this.authService.saveToken('token', response.token);
        // const role = this.authService.getRoles(tokenDecode);
        const role = tokenDecode['roles'];
        localStorage.setItem('roles', tokenDecode['roles']);
        // this.authService.goToHome();
        // console.log(response.token);
        // const tokenDecode = this.authService.decodeToken(response.token);
        // this.authService.saveToken('token', response.token);
        // const role = this.authService.getRoles(tokenDecode);
        // tslint:disable-next-line:triple-equals
        if (role == 'ROLE_AdminAgence'){
          this.authService.goToHome();
          // tslint:disable-next-line:triple-equals
        }else if (role == 'ROLE_UserAgence'){
          this.authService.goToHome();
        }
        // this.authService.goToHome();
      },
      error => {
        console.log(error);
      },
    );
  }

}
