// // import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// /*
//   Generated class for the AuthServiceProvider provider.

//   See https://angular.io/guide/dependency-injection for more info on providers
//   and Angular DI.
// */


// export class LoginDao {
//   db: SQLiteObject;
//   user: User;
//   // sqlite: SQLite;
//   private isRegister: boolean;
//   constructor(private banco: SQLiteObject) {
//     this.db = banco;
//   }
//   public registerService(registerCredentials) {
//     return new Promise(resolve => {
//       this.db.executeSql('INSERT INTO usuario VALUES(?,?,?)', [registerCredentials.nome, registerCredentials.email, registerCredentials.password])
//         .then(res => {
//           // return true;
//           this.isRegister = true
//           // Promise.resolve(this.isRegister);
//           resolve(this.isRegister);
//         })
//         .catch(e => {
//           Promise.reject(e);
//         });
//     });

//     // return this.isRegister;
//   }
//   public loginService(loginCredentials) {
//     return new Promise(resolve => {
//       this.db.executeSql('SELECT rowid,nome,email from usuario  where email = ? and senha = ?', [loginCredentials.email, loginCredentials.password])
//         .then(res => {
//           this.user = new User(res.rows.item(0).rowid, res.rows.item(0).nome, res.rows.item(0).email);
//           resolve(this.user);
//         })
//         .catch(e => {
//           Promise.reject(e);
//         });
//     });

//   }

// }

// @Injectable()
// export class AuthServiceProvider {
//   loginDao: LoginDao;
//   usuario: any;
//   isRegister: any;
//   private sqlite: SQLite;
//   constructor() {
//     this.sqlite.create({
//       name: 'favorite.db',
//       location: 'default'
//     }).then((db: SQLiteObject) => {
//       this.loginDao = new LoginDao(db);
//     });

//     // console.log('Hello AuthServiceProvider Provider');
//   }
//   public login(login): User {
//     this.loginDao.loginService(login).then(usuario => {
//       this.usuario = usuario;
//     }, err => {
//       console.log(err);
//     });
//     return this.usuario;
//   }
//   public register(register): any {
//     // private isOk: boolean;
//     this.loginDao.registerService(register).then(isRegister => {
//       // return isRegister;
//       this.isRegister = isRegister
//     }, err => {
//       console.log(err);
//       // return false;
//       this.isRegister = false;
//     });
//     return this.isRegister;
//   }
// }
