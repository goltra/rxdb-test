import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Dbmanager } from '../../providers/dbmanager';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public db: Dbmanager) {

  }

}
