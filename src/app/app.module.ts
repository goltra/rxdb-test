import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/login/signup';
import { ClienteEditar } from '../pages/contact/clienteeditar';
import { TabsPage } from '../pages/tabs/tabs';
import { Dbmanager } from '../providers/dbmanager';
import { Settings } from '../providers/settings';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ClienteEditar
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ClienteEditar,
    LoginPage,
    SignupPage,
  ],
  providers: [Dbmanager,Storage,Settings,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
