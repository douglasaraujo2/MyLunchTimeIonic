import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { ListPage } from '../list/list';
import { RegisterPage } from '../register/register';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading; c
  registerCredentials = { email: '', password: '', isOk: false };
  // value: boolean;
  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private sqlite: SQLite,
    private toast: Toast,
    private storage: Storage) {
      this.storage.remove('userId');
      this.storage.remove('userName');
    // this.storage.get('userKeep').then(value => {
    //   if (value) {
    //     this.navCtrl.setRoot(ListPage);
    //   }
    // });

  }

  public login() {
    this.showLoading()
    this.sqlite.create({
      name: 'favorite.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT rowid,nome from usuario  where email = ? and senha = ?', [this.registerCredentials.email, this.registerCredentials.password])
        .then(res => {
          console.log(res);
          // if (res.rows.length > 0 && this.registerCredentials.isOk) {
            // this.storage.set('userKeep', true);
          // } else {
            // this.storage.set('userKeep', false);
          // }
          this.storage.set('userId', res.rows.item(0).rowid);
          this.storage.set('userName', res.rows.item(0).nome);
          this.toast.show('Login efetuado com sucesso', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.setRoot(ListPage);
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.loading.dismiss();
          this.toast.show("Accesso Negado", '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      debugger;
      console.log(e);
      this.loading.dismiss();
      this.toast.show("Accesso Negado", '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });

  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  createAccount() {
    this.navCtrl.push(RegisterPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
