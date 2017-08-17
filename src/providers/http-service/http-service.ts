import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { LoginPage } from  '../../pages/common/login/login';

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
    public alertCtrl: AlertController,
    public statusBar: StatusBar,
    public uniqueDeviceID: UniqueDeviceID) {
  }

  getServerUrl() {
    return 'http://www.feed100.me';
  } 

  localLogin(username, password, role) {
    let url = this.getServerUrl + '/auth/login';
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
    let url = this.getServerUrl() + '/auth/login-sns';
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
    let url = this.getServerUrl() + '/auth/registration';
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
    let url = this.getServerUrl() + '/auth/registration-sns';
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

  logout(navCtrl) {
    this.uniqueDeviceID.get()
    .then((uuid: any) => {
      this.deleteDeviceToken(uuid)
      .subscribe(
        (data) => {
          this.storage.clear()
          .then(() => {            
            navCtrl.popAll()
            .then(() => { // modal이 있는 경우
              console.log('popAll success');
              this.app.getRootNavs()[0].setRoot(LoginPage);
              this.statusBar.show();
              this.showBasicAlert('로그아웃되었습니다.');
            })
            .catch((err) => { // modal이 없고 base 노드인 경우
              console.log('popAll Error: ', err);
              this.app.getRootNavs()[0].setRoot(LoginPage);
              this.statusBar.show();
              this.showBasicAlert('로그아웃되었습니다.');
            })
          });
        },
        (err) => {
          console.log(JSON.stringify(err));
        }
      )
    })
    .catch((error: any) => {
      console.log(error);
      this.showBasicAlert('오류가 발생했습니다.');
    });

  }

  refreshTokens() {
    let url = this.getServerUrl() + '/auth/refresh';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return Observable.fromPromise(this.storage.get('refreshToken'))
    .mergeMap((refreshToken) => {
      headers.append('x-refresh-token', refreshToken);
      return this.http.post(url, {}, { headers: headers }).map(res => res.json());
    });
  }

  registerDeviceToken(uuid, device_token) {
    let url = this.getServerUrl() + '/api/device-token';
    let data = {
      "uuid" : uuid,
      "device_token" : device_token
    };
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  deleteDeviceToken(uuid) {
    let url = this.getServerUrl() + '/auth/device-token/' + uuid;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.delete(url, { headers: headers }).map(res => res.json());
    });
  }

  apiRequestErrorHandler(data, navCtrl) {
    console.log(data.message);
    return new Promise(
      (resolve, reject) => {
        if(data.message == 'jwt expired') {
          this.showBasicAlert('액세스 토큰 만료.');
          this.refreshTokens()
          .subscribe(
            (data) => {
              console.log(JSON.stringify(data));
              if(data.success == true) {
                this.storage.set('accessToken', data.data.accessToken);
                this.storage.set('refreshToken', data.data.refreshToken);
                this.showBasicAlert('액세스 토큰 재발급 성공. 자동 로그인 되었습니다.');
                resolve();
              }
              else if(data.success == false) {
                this.logout(navCtrl);
              }
            },
            (err) => {
              console.log(JSON.stringify(err));
              this.showBasicAlert('오류가 발생했습니다.');
            }
          )
        }
        else {
          this.logout(navCtrl);
        }
      }
    );
  }

  getUserInfo() {
    let url = this.getServerUrl() + '/api/user';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeeds() {
    let url = this.getServerUrl() + '/api/newsfeeds';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getNewsfeed(newsfeed_id) {
    let url = this.getServerUrl() + '/api/newsfeed/' + newsfeed_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  newsfeedLike(newsfeed_id) {
    let url = this.getServerUrl() + '/api/newsfeed/like';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "newsfeed_id" : newsfeed_id
    }
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  writeNewsfeedComment(newsfeed_id, newsfeed_comment_content) {
    let url = this.getServerUrl() + '/api/newsfeed/comment';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "newsfeed_id" : newsfeed_id,
      "newsfeed_comment_content" : newsfeed_comment_content
    }
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
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
