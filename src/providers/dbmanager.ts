import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';


/*
  Generated class for the Dbmanager provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Dbmanager {
  data: any;
  db: any;
  remote: any;

  constructor(public http: Http) {
    this.db = new PouchDB('cloudo');
    this.remote = 'http://peliculasdescargartorrent.com:5984/pruebasdb'

    let options = {
      live: true,
      retry: true,
      continuous: true,
    }

    this.db.sync(this.remote, options);
  }
  getTodos() {
    if (this.data) {
      console.log('gettodos if this.data');
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      console.log('getTodos if !this.data');
      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
          this.handleChange(change);
        });
        resolve(this.data);

      }).catch((error) => {

        console.log(error);

      });
    });
  }
  createTodo(todo) {
    this.db.post(todo);
  }

  updateTodo(todo) {
    this.db.put(todo).catch((err) => {
      console.log(err);
    });
  }

  deleteTodo(todo) {
    this.db.remove(todo).catch((err) => {
      console.log(err);
    });
  }
  handleChange(change) {
    
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if (changedDoc) {
        this.data[changedIndex] = change.doc;
      }

      //A document was added
      else {
        this.data.push(change.doc);
      }
      console.log('handle');
      console.log(this.data);
    }

  }
}
