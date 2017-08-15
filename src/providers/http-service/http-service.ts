import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { App, AlertController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {

  constructor(
    public http: Http, 
    public storage: Storage, 
    public app: App,
    public alertCtrl: AlertController) {
  }

  localLogin(username, password, role) {
    let url = 'http://www.feed100.me/auth/login';
    let data = {
      "username" : username,
      "password" : password,
      "role" : role
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(url, data, { headers: headers }).map(res => res.json());
  }

  SNSLogin(provider, app_id, role) {
    let url = 'http://www.feed100.me/auth/login-sns';
    let data = {
      "provider" : provider,
      "app_id" : app_id,
      "role" : role
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(url, data, { headers: headers }).map(res => res.json());
  }

  localRegister(username, password, role, nickname) {
    let url = 'http://www.feed100.me/auth/registration';
    let data = {
      "username" : username,
      "password" : password,
      "role" : role,
      "nickname" : nickname
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(url, data, { headers: headers }).map(res => res.json());
  }

  SNSRegister(username, role, nickname, provider, app_id) {
    let url = 'http://www.feed100.me/auth/registration-sns';
    let data = {
      "username" : username,
      "role" : role,
      "nickname" : nickname,
      "provider" : provider,
      "app_id" : app_id
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(url, data, { headers: headers }).map(res => res.json());
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.storage.clear()
      .then(() => {            
        this.showBasicAlert('로그아웃되었습니다.');
        resolve();
      });
    });
    
  }

  refreshTokens() {
    let url = 'http://localhost:3000/auth/refresh';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('refreshToken'))
    .mergeMap((refreshToken) => {
      headers.append('x-refresh-token', refreshToken);
      return this.http.post(url, { headers: headers }).map(res => res.json());
    });
  }

  // apiRequestErrorHandler(data) {
  //   console.log(data.message);
  //   if(data.message == 'jwt expired') {
  //     this.showBasicAlert('액세스 토큰 만료. 재발급 필요');
  //     this.refreshTokens()
  //     .subscribe(
  //       (data) => {
  //         console.log(data.message);
  //         if(data.success == true) {
  //           return 'refresh success';
  //         }
  //         else if(data.success == false) {
  //           this.logout();
  //         }
  //       }
  //     )
  //   }
  //   else {
  //     this.logout();
  //   }
  // }

  getUserInfo() {
    let url = 'http://localhost:3000/api/user';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((token) => {
      headers.append('x-access-token', token);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  showBasicAlert(subTitle) {
    let alert = this.alertCtrl.create ({
      subTitle: subTitle,
      buttons: ['OK']
    });

    alert.present();
  }
}
