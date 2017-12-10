import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public isError: boolean;
  registerCredentials = { nome: '', email: '', password: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite,
    private toast: Toast) {
  }

  public register() {
    this.isError = false;
    this.sqlite.create({
      name: 'favorite.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT rowid,nome from usuario  where email = ?', [this.registerCredentials.email])
        .then(res => {
          console.log(res);
          if (res.rows.length > 0) {
            this.isError = true;

            // this.storage.set('userName', res.rows.item(0).nome);
            this.toast.show('Usuário já existe', '5000', 'center').subscribe(
              toast => {
                //throw new Error("Usuário já existe");
              }
            );

          } else {
            db.executeSql('INSERT INTO usuario VALUES(?,?,?)', [this.registerCredentials.nome, this.registerCredentials.email, this.registerCredentials.password])
              .then(res => {
                console.log(res);
                this.toast.show('Cadastrado com sucesso', '5000', 'center').subscribe(
                  toast => {
                    this.navCtrl.popToRoot();
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
          }
        })
        .catch(e => {
          console.log(e);
          //this.loading.dismiss();
          this.toast.show("Accesso Negado", '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
      if (!this.isError) {

      }

    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }


}
