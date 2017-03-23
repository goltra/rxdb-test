import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../login/signup';
import { HomePage } from '../home/home';
import { Dbmanager } from '../../providers/dbmanager';
import { Settings } from '../../providers/settings';
declare var device;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public nav: NavController, public http: Http, public todoService: Dbmanager, public settings:Settings) {
    console.log(device);
  }

  login() {
    console.log('login');
    var uuid: string = "buscar metodo para calcularlo incluso en navegador";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.settings.token == undefined || this.settings.token == "") {
      let credentials = {
        username: this.username,
        password: this.password
      };

      this.http.post('http://localhost:3000/auth/login', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          var login: any = res.json();

          console.log(login);
          this.settings.token = login.token;
          this.settings.password = login.password;


          this.todoService.init(login);
          this.reauthenticate();
          this.nav.setRoot(HomePage);
        }, (err) => {
          console.log(err);
        });
    } else {
      this.reauthenticate();
    }
  }

  /** Función usada para entrar sin solicitar user y pass cuando existe */
  /** un token y hash */
  reauthenticate(){
    console.log('reauthenticate');
    var token = this.settings.token;
    var password = this.settings.password;

    let headers = new Headers();

    this.http.get('http://localhost:3000/auth/session')
    .subscribe(res=>{
      console.log(res);
    });
    this.borrartoken();
  }

  borrartoken(){
    this.settings.token='';
    this.settings.password='';
  }

  consultaUser(){
    this.http.get('http://localhost:3000/a').subscribe((res)=>{
      console.log(res);
    })
  }
  
  launchSignup() {
    this.nav.push(SignupPage);
  }

}