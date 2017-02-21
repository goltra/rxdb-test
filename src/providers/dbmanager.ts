import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as RxDB from 'rxdb';

/*
  Generated class for the Dbmanager provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Dbmanager {

  constructor(public http: Http) {
    console.log('Hello Dbmanager Provider');
    RxDB.create(
      'heroesDB',
      'websql',
      '123456789012',
      true
    ).then(db=>console.dir(db));
  }

}
