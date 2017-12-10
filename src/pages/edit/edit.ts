import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { LocationProvider } from '../../providers/location/location';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  favorite = { id: '', name: '', address: '', phone: '', lati: '', longi: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast,
    public location: LocationProvider) {
    this.favorite = navParams.get("fav");
  }
  public clearForm() {
    this.navCtrl.popToRoot();
  }
  public register() {
    this.sqlite.create({
      name: 'favorite.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // this.location.searchAddress(this.favorite.address).then(response => {
      var lat;
      var long;
      // var resposta: any = response;
      // if(resposta.results){
      // lat = resposta.results[0].geometry.location.lat;
      // long = resposta.results[0].geometry.location.lng;
      // }
      console.log(this.favorite.id);
      db.executeSql('update favorito set nome = ?,cep = ?,telefone = ?where rowid = ?', [this.favorite.name, this.favorite.address, this.favorite.phone, this.favorite.id])
        .then(res => {
          console.log(res);
          this.toast.show('Atualizado com sucesso', '5000', 'center').subscribe(
            toast => {
              this.clearForm();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    });
    // }).catch(e => {
    // console.log(e);
    // this.toast.show(e, '5000', 'center').subscribe(
    // toast => {
    // console.log(toast);
    // }
    // );
    // });
  }



}
