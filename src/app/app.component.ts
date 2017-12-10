import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { AddPage } from '../pages/add/add';


import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // db: SQLiteObject;
  rootPage: any = LoginPage;
  // public sqlite: SQLite;
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private sqlite: SQLite,
              private storage: Storage) {
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Add Favorite', component: AddPage},
      // { title: 'Home', component: HomePage },
      { title: 'Favorites', component: ListPage },
      // { title: 'Logout'}
      
    ];
    this.createDb();
  }
  createDb() {
    this.sqlite.create({
      name: 'favorite.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // this.db = db;
      db.executeSql('CREATE TABLE IF NOT EXISTS usuario(nome TEXT, email TEXT, senha TEXT)', {})
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('CREATE TABLE IF NOT EXISTS favorito(nome TEXT, cep TEXT, telefone TEXT,latitude TEXT, longitude TEXT, usuario INTEGER)', {})
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout(){
    this.nav.setRoot(LoginPage);
    // this.nav.popToRoot();
  }
}
