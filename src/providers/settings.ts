import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Settings provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Settings {
  private _token: string;
  private _password: string;
  private stor:Storage;

  constructor(storage: Storage) {
    console.log('Hello Settings Provider');
    storage.ready().then(()=>{
      this.stor = storage;
      this.stor.get('token').then((val) => {
        this._token = val;
      });
      this.stor.get('password').then((val) => {
        this._password = val;
      });
    })
      
    
  }

  get token(): string {
    return this._token;
  }

  get password(): string {
    return this._password;
  }

  set token(value: string) {
    console.log('settings.set token ' + value);
    this.stor.set('token', value).then((res)=>{
      console.log('token guardado');
      console.log(res);
    });
    this._token = value;
  }

  set password(value: string) {
    console.log('settings.set password');
    this.stor.set('password', value);
    this._password = value;
  }
}
