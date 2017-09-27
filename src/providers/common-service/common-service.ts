import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { StatusBar } from '@ionic-native/status-bar';
import { App, AlertController, LoadingController } from 'ionic-angular';
import { LoginPage } from  '../../pages/common/login/login';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {

  constructor(
    public http: Http,
    public storage: Storage,
    public camera: Camera,
    public file: File,
    public uniqueDeviceID: UniqueDeviceID,
    public statusBar: StatusBar,
    public app: App,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    console.log('Hello CommonServiceProvider Provider');
  }
  getServerUrl() {
    // return 'http://172.30.1.22:3000';
    return 'http://localhost:3000';
    // return 'http://www.feed100.me';
  } 

  selectImage() {
    return new Promise(
      (resolve, reject) => {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }

        this.camera.getPicture(options).then((imageFileUrl) => {
          this.file.resolveLocalFilesystemUrl(imageFileUrl)
          .then(entry => (<FileEntry>entry).file((file) => {
            resolve(file);
          }
          ))
          .catch(err => console.log(err));
        }, (err) => {
          console.log(err);
        });
      }
    )
  }

  readFile(file) {
    return new Promise(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const formData = new FormData();
          const imgBlob = new Blob([reader.result], {type: file.type});
          formData.append('ex_filename', imgBlob);
          resolve(formData);
        };
        reader.readAsArrayBuffer(file);
      }
    )
  }

  uploadFile(formData) {
    let url = this.getServerUrl() + '/common/api/upload/tmp';
    let headers = new Headers();

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, formData, { headers: headers }).map(res => res.json());
    });
  }

  moveFiles(images) {
    let url = this.getServerUrl() + '/common/api/move';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, { "images" : images }, { headers: headers }).map(res => res.json());
    });
  }

  localLogin(username, password, role) {
    let url = this.getServerUrl() + '/common/api/login';
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
    let url = this.getServerUrl() + '/common/api/login-sns';
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
    let url = this.getServerUrl() + '/common/api/registration';
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
    let url = this.getServerUrl() + '/common/api/registration-sns';
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
    // let loading = this.presentLoading();

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
              // this.showBasicAlert('로그아웃되었습니다.');
              // loading.dismiss();
            })
            .catch((err) => { // modal이 없고 base 노드인 경우
              console.log('popAll Error: ', err);
              this.app.getRootNavs()[0].setRoot(LoginPage);
              this.statusBar.show();
              // this.showBasicAlert('로그아웃되었습니다.');
              // loading.dismiss();
            })
          });
        },
        (err) => {
          console.log(err);
          this.showBasicAlert('오류가 발생했습니다.');
          // loading.dismiss();
        }
      )
    })
    .catch((error: any) => {
      console.log(error);
      this.showBasicAlert('오류가 발생했습니다.');
      // loading.dismiss();
    });

  }

  refreshTokens() {
    let url = this.getServerUrl() + '/common/api/refresh';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return Observable.fromPromise(this.storage.get('refreshToken'))
    .mergeMap((refreshToken) => {
      headers.append('x-refresh-token', refreshToken);
      return this.http.post(url, {}, { headers: headers }).map(res => res.json());
    });
  }

  deleteDeviceToken(uuid) {
    let url = this.getServerUrl() + '/common/api/device-token/' + uuid;
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
          console.log('message : ' + data.message + ' 로그아웃.' );
          this.logout(navCtrl);
        }
      }
    );
  }

  showBasicAlert(subTitle) {
    let alert = this.alertCtrl.create ({
      subTitle: subTitle,
      buttons: ['OK']
    });

    alert.present();
  }

  showConfirmAlert(message, handler) {
    let confirm = this.alertCtrl.create({
    message: message,
    buttons: [
      {
        text: '아니오',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: '예',
        handler: handler
      }
    ]
    });
    confirm.present();
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      spinner: "dots"
    });

    loading.present();

    return loading;
  }

}
