import { Component } from '@angular/core';
import {FormBuilder, FormGroup}  from '@angular/forms';
import { NavController , NavParams} from 'ionic-angular';
import {Dbmanager} from '../../providers/dbmanager';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'cliente-editar',
  templateUrl: 'clienteeditar.html'
})

export class ClienteEditar{
    cliente: Cliente;
    form: FormGroup;

    constructor(public navCtrl: NavController, public nParam: NavParams, public db:Dbmanager, private fb: FormBuilder){
        if(this.nParam.data){
            this.cliente= this.nParam.data[0];
            console.log(this.cliente);
            this.form = this.fb.group({
                '_id': [this.cliente._id],
                '_rev':[this.cliente._rev],
                'nombre':[this.cliente.nombre],
                'direccion':[this.cliente.direccion],
                'email':[this.cliente.email],
                'localidad':[this.cliente.localidad],
                'personacontacto':[this.cliente.personacontacto],
                'provincia':[this.cliente.provincia],
                'telefono':[this.cliente.telefono],
                'type': 'cliente'
            });
        }
    }
    submit(){
        this.db.updateTodo(this.form.value)
        this.navCtrl.pop();
    }


}