import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { Dbmanager } from '../../providers/dbmanager';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: any;
 
  constructor(public navCtrl: NavController, public todoService: Dbmanager, public alertCtrl: AlertController) {
 
  }
 
  ionViewDidLoad(){
 
    this.todoService.getTodos().then((data) => {
      this.todos = data;
      console.log('home ionViewLoad');
      console.log(data);
    });
    setInterval(()=>{console.log('');},5000);
  }
  test(){
    console.log('test');
    
    this.todos.push({'title':'prueba'});
  }
  createTodo(){
 
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
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  updateTodo(todo){
 
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
 
  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }
}
