import { Component } from '@angular/core';
import { ClienteEditar} from './clienteeditar';
import { NavController,NavParams } from 'ionic-angular';
import {Dbmanager} from '../../providers/dbmanager';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  data: Array<Cliente>=[];
  constructor(public navCtrl: NavController, public db: Dbmanager) {

  }
  ionViewDidLoad(){
    this.db.getTodos().then(rawdata => {
      if(rawdata && rawdata.length>0){
        this.data = rawdata;
      }
    });
    setInterval(()=>{console.log('');},5000);
  }
  filteredData(): Array<any>{
    return this.data.filter(res=>res.type=='cliente')
  }
  editClient(cliente: any){
    let cl: Cliente;
    cl = Cliente.inicializa(cliente);
    this.navCtrl.push(ClienteEditar,[cl]);
  }
  addClient(){
    let cl = new Cliente();
    cl.nombre="Pepe cliente";
    this.db.createTodo(cl);
  }

}
