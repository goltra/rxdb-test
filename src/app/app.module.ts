import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ClienteEditar } from '../pages/contact/clienteeditar';
import { TabsPage } from '../pages/tabs/tabs';
import { Dbmanager } from '../providers/dbmanager';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ClienteEditar
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ClienteEditar
  ],
  providers: [Dbmanager,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
