import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userName: string;
  constructor(public navCtrl: NavController,
              private storage: Storage) {
    this.storage.get('userName').then(value => {
      this.userName = value;
    });
  }

}
