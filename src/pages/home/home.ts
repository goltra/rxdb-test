import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { Http, Headers } from '@angular/http';
import { NavController, AlertController } from 'ionic-angular';
import { Dbmanager } from '../../providers/dbmanager';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
  user:string="";

  constructor(public navCtrl: NavController, public todoService: Dbmanager, public alertCtrl: AlertController, public http: Http) {
    console.log('home constructor');
  }

  ionViewDidLoad() {
    this.todoService.getTodos().then((data) => {
      console.log('home getTodos');
      this.todos = data;
      this.user = this.todoService.user;
      console.log('home ionViewLoad');
      console.log(data);
    });
    setInterval(() => { console.log(''); }, 5000);
  }

  test() {
    console.log('test');
    this.todos.push({ 'title': 'prueba' });
  }

  logout() {
    this.todoService.logout();
    this.todos = null;
    this.navCtrl.setRoot(LoginPage);
  }

  registerPartner() {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    let profileUsr = { empresa: 'goltratec emp partner' };
    let nom:string = (Math.random()).toString();
    let user = {
      name: 'nombre partner',
      username: nom.replace(".","").slice(0,5),
      password: '123456',
      confirmPassword: '123456',
      email: nom + '@goltratec.com',
      profile: profileUsr,
    };

    // let user = {
    //     name: 'nombrepartner',
    //     username: 'userpartner',
    //     email: 'partner@goltratec.com',
    //     password: '123456',
    //     confirmPassword: '123456',
    //     profile: profileUsr
    //   };

    console.log(user);

    this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), { headers: header })
      .subscribe(res => {
        console.log(res);
      });


    // this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), {headers: header})
    //     .subscribe(res => {
    //       // this.todoService.init(res.json());
    //       // this.nav.setRoot(HomePage);
    //       console.log(res);
    //     }, (err) => {
    //       console.log(err);
    //     }); 


  }

  createTodo() {

    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({ title: data.title });
          }
        }
      ]
    });

    prompt.present();

  }

  updateTodo(todo) {

    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title
            });
          }
        }
      ]
    });

    prompt.present();
    console.log('update home');
    console.log(this.todos);
  }

  deleteTodo(todo) {
    this.todoService.deleteTodo(todo);
  }
}
