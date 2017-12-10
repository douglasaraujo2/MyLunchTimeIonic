import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ListPage } from '../list/list';
import { LocationProvider } from '../../providers/location/location';
/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  @ViewChild(Nav) nav: Nav;
  userName: string;
  userId: string;
  favorite = { nome: '', address: { cep: '', address: '' }, phone: '', lati: '', longi: '' };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private sqlite: SQLite,
    private toast: Toast,
    public location: LocationProvider) {
    this.storage.get('userName').then(value => {
      this.userName = value;
    });
    this.storage.get('userId').then(value => {
      this.userId = value;
    });

  }
  public clearForm() {
    this.favorite = { nome: '', address: { cep: '', address: '' }, phone: '', lati: '', longi: '' };
  }
  public register() {
    //this.isError = false;
    this.sqlite.create({
      name: 'favorite.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      // this.location.searchAddress(this.favorite.address.address).then(response => {
      var lat;
      var long;
      // var resposta: any = response;
      // if (resposta.results) {
      //   lat = resposta.results[0].geometry.location.lat;
      //   long = resposta.results[0].geometry.location.lng;
      // }
      db.executeSql('INSERT INTO favorito(nome,cep,telefone,usuario,latitude,longitude) VALUES(?,?,?,?,?,?)', [this.favorite.nome, this.favorite.address.address, this.favorite.phone, this.userId, lat, long])
        .then(res => {
          console.log(res);
          this.toast.show('Cadastrado com sucesso', '5000', 'center').subscribe(
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
