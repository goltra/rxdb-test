import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../login/signup';
import { HomePage } from '../home/home';
import { Dbmanager } from '../../providers/dbmanager';
import { Settings } from '../../providers/settings';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public nav: NavController, public http: Http, public todoService: Dbmanager, public settings:Settings) {

  }

  login() {
    console.log('login');
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
          this.settings.token = login.profile.token;
          this.settings.password = login.profile.password;

          this.todoService.init(login);
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
    headers.append('Authorization', 'Bearer ' + token + ':' + password);
    this.http.get('http://localhost:3000/auth/session',  { headers: headers })
    .subscribe(res=>{
      console.log(res);
    });

  }

  launchSignup() {
    this.nav.push(SignupPage);
  }

}