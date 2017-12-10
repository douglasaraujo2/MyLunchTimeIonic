import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { CallNumber } from '@ionic-native/call-number';
import { EditPage } from '../edit/edit';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  userName: string;
  userId: string;
  favorites: Array<{ id: string, name: string, phone: string, address: string, long: string, lati: string }>;
  showField: boolean = true;
  showList: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private sqlite: SQLite,
    private call: CallNumber) {
    this.favorites = [];


    this.storage.get('userName').then(name => {
      this.userName = name;
    });
    this.storage.get('userId').then(id => {
      this.loadFavorites(id);
    });
  }
  loadFavorites(id: string) {
    var that = this;
    var favorites = [];
    this.sqlite.create({
      name: 'favorite.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT rowid,nome,cep,telefone,latitude,longitude, usuario from favorito  where usuario = ?', [id])
        .then(res => {
          if (res.rows.length > 0) {
            this.showField = false;
            this.showList = true;
            for (var i = 0; i < res.rows.length; i++) {
              this.favorites.push({
                id: res.rows.item(i).rowid,
                name: res.rows.item(i).nome,
                phone: res.rows.item(i).telefone,
                address: res.rows.item(i).cep,
                long: res.rows.item(i).longitude,
                lati: res.rows.item(i).laitute
              });
            }
          }else{
            this.showField = true;
            this.showList = false;
          }
        });

    })
      .catch(e => {
        console.log(e);
      }).catch(e => {
        console.log(e);
      });
  }
  selectMenu(fav) {
    alert(fav.name);
  }

  editFav(fav){
    this.navCtrl.push(EditPage, {fav: fav});
  }

  callPhone(phone: string) {
    this.call.callNumber(phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
    // alert(phone);
  }
  removeFav(id) {
    this.sqlite.create({
      name: 'favorite.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE from favorito  where rowid = ?', [id])
        .then(res => {
          // if (res.rows.length > 0) {
          for (var i = 0; i < this.favorites.length; i++) {
            if (this.favorites[i].id == id) {
              this.favorites.splice(i, 1);
              break;
            }
          }
        });

    })
      .catch(e => {
        console.log(e);
      }).catch(e => {
        console.log(e);
      });
  }
}
