import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Dbmanager } from '../../providers/dbmanager';
import 'rxjs/add/operator/catch';
 
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
 
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  empresa: string;
 
  constructor(public nav: NavController, public http: Http, public todoService: Dbmanager) {
 
  }
  
  register(){
      let tipoCuenta = 'cuenta';
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let profileUsr={
        tipoCuenta: tipoCuenta,
        empresa: this.empresa
      };
      let user = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        profile: profileUsr
      };
 


      this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), {headers: headers})
        .subscribe(res => {
          console.log('signup register');
          this.todoService.init(res.json());
          //this.nav.setRoot(HomePage); 
        },err=>{
          var obj = JSON.parse(err._body)
          console.log(err);
          console.log('Error signinup');
          alert(obj.error);
          
        })
 
  }
 
}