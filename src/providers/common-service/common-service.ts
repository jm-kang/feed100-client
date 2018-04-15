import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';
import { StatusBar } from '@ionic-native/status-bar';
import { App, AlertController, LoadingController, normalizeURL, Platform, ToastController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Market } from '@ionic-native/market';
import { LoginPage } from  '../../pages/common/login/login';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';
import { isDevMode } from '@angular/core/src/application_ref';

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {
  isLoadingActive = true;
  modalWrapperPages = [];
  isDevMode = false;

  constructor(
    public http: Http,
    public storage: Storage,
    public camera: Camera,
    public file: File,
    public uniqueDeviceID: UniqueDeviceID,
    private device: Device,
    public statusBar: StatusBar,
    public app: App,
    public alertCtrl: AlertController,
    public platform: Platform,
    private appVersion: AppVersion,
    private market: Market,
    public toastCtrl: ToastController,    
    public loadingCtrl: LoadingController) {
    console.log('Hello CommonServiceProvider Provider');
  }
  
  getServerUrl() {
    if(this.isDevMode) {
      return 'http://192.168.0.10:3000';
    }
    return 'https://www.feed100.me';
  } 

  getHeaders(tokenType): Promise<any> {
    if(this.isDevMode) {
      return this.getDevHeader(tokenType);
    }
    else {
      return new Promise(
        (resolve, reject) => {
          this.appVersion.getVersionNumber().then((version) => {
            this.storage.get(tokenType + 'Token')
            .then((token) => {
              let headers = new Headers();
              if(this.platform.is('ios')) {
                headers.append('platform', 'ios');
              }
              else if(this.platform.is('android')) {
                headers.append('platform', 'android');
              }
              headers.append('Content-type', 'application/json');            
              headers.append('version', version);
              headers.append('x-' + tokenType + '-token', token);
              resolve(headers);
            });
          });
        }
      );
    }
  }

  getDevHeader(tokenType): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.storage.get(tokenType + 'Token')
        .then((token) => {
          let headers = new Headers();
          headers.append('Content-type', 'application/json');
          headers.append('x-' + tokenType + '-token', token);
          resolve(headers);
        });
      }
    );
  }

  selectImage() {
    return new Promise(
      (resolve, reject) => {
        const options: CameraOptions = {
          quality: 50,
          targetWidth: 1280,
          targetHeight: 1280,
          // allowEdit: true,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        }

        this.camera.getPicture(options).then((imageFileUrl) => {
          this.file.resolveLocalFilesystemUrl(imageFileUrl)
          .then(entry => (<FileEntry>entry).file((file) => {
            resolve([file, normalizeURL(imageFileUrl)]);
            console.log("fileSize ", file.size);
            console.log("fileUrl ", file.localURL);
            console.log("normalizeUrl ", normalizeURL(imageFileUrl));
          }
          ))
          .catch(err => console.log(err));
        }, (err) => {
          console.log(err);
        });
      }
    )
  }

  readFile(params) {
    const file = params[0];
    const imageFileUrl = params[1];
    return new Promise(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const formData = new FormData();
          const imgBlob = new Blob([reader.result], {type: file.type});
          formData.append('ex_filename', imgBlob);
          resolve([{"localURL" : imageFileUrl}, formData]);
        };
        reader.readAsArrayBuffer(file);
      }
    )
  }

  uploadFile(formData) {
    let url = this.getServerUrl() + '/common/api/upload/images';
    return Observable.fromPromise(this.getHeaders('access'))
    .mergeMap((headers) => {
      headers.delete('Content-type');
      return this.http.post(url, formData, { headers: headers }).map(res => res.json());
    });
  }

  localLogin(username, password, role) {
    let url = this.getServerUrl() + '/common/api/login';
    let data = {
      "username" : username,
      "password" : password,
      "role" : role
    };
    return Observable.fromPromise(this.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  SNSLogin(provider, app_id, role) {
    let url = this.getServerUrl() + '/common/api/login-sns';
    let data = {
      "provider" : provider,
      "app_id" : app_id,
      "role" : role
    };
    return Observable.fromPromise(this.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  localRegister(username, password, role, nickname) {
    let url = this.getServerUrl() + '/common/api/registration';
    let data = {
      "username" : username,
      "password" : password,
      "role" : role,
      "nickname" : nickname,
      "avatar_image" : "assets/img/" + role + "-avatar-image.png"
    };
    return Observable.fromPromise(this.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  SNSRegister(username, role, nickname, provider, app_id) {
    let url = this.getServerUrl() + '/common/api/registration-sns';
    let data = {
      "username" : username,
      "role" : role,
      "nickname" : nickname,
      "provider" : provider,
      "app_id" : app_id,
      "avatar_image" : "assets/img/" + role + "-avatar-image.png"      
    };
    return Observable.fromPromise(this.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  logout(navCtrl) {
    this.isLoadingActive = true;
    let loading = this.presentLoading();
    this.dismissAllModal();
    Observable.fromPromise(this.app.getRootNavs()[0].setRoot(LoginPage))
    .finally(() => {
      this.statusBar.show();
      this.uniqueDeviceID.get()
      .then((uuid: any) => {
        this.deleteDeviceToken(uuid)
        .subscribe(
          (data) => {
            this.storage.clear();
          },
          (err) => {
            console.log(err);
            this.showBasicAlert('오류가 발생했습니다.');
          }
        )
      })
      .catch((error: any) => {
        console.log(error);
        this.showBasicAlert('오류가 발생했습니다.');
      });
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        console.log('setRoot success');
      },
      (err) => {
        console.log('setRoot Error: ', err);
      }
    )
  }

  refreshTokens() {
    let url = this.getServerUrl() + '/common/api/refresh';
    return Observable.fromPromise(this.getHeaders('refresh'))
    .mergeMap((headers) => {
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  deleteDeviceToken(uuid) {
    let url = this.getServerUrl() + '/common/api/device-token/' + uuid;
    return Observable.fromPromise(this.getHeaders('access'))
    .mergeMap((headers) => {
      return this.http.delete(url, { headers: headers }).map(res => res.json());
    });
  }

  apiRequestErrorHandler(data, navCtrl) {
    console.log("apiRequestErrorHandler : " + data.message);
    return new Promise(
      (resolve, reject) => {
        if(data.message == 'jwt expired') { // 토큰 만료
          this.refreshTokens()
          .subscribe(
            (data) => {
              console.log(JSON.stringify(data));
              if(data.success == true) {
                this.storage.set('accessToken', data.data.accessToken);
                this.storage.set('refreshToken', data.data.refreshToken);
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
        else if(data.message == 'notice exist') { // 서버 점검 또는 공지
          this.showBasicAlert(data.notice);
          this.logout(navCtrl);
        }
        else if(data.message == 'version is not match') { // 버전 업데이트
          this.showUpdateAlert('FEED100의 새로운 버전이 있습니다.<br/>안정적인 서비스 이용을 위해 새로운 버전으로 업데이트 해주세요.'); 
        }
        else if(data.message == 'email is not verified') { // 이메일 인증 전
          this.showBasicAlert('이메일 인증 완료 후 다시 시도해주세요.');          
          this.logout(navCtrl);
        }
        else if(data.message == 'warning count is over') { // 이용 정지
          this.showBasicAlert('해당 계정은 경고 3회 누적으로 인해 서비스를 이용하실 수 없습니다.');          
          this.logout(navCtrl);
        }
        else { // 에러
          console.log('error : ' + data.message);
          this.logout(navCtrl);
        }
      }
    );
  }

  getDevice() {
    return this.device;
  }

  hasEmoji(content) {
    let regExp = /^[가-힣ㄱ-ㅎㅏ-ㅣA-Za-z0-9\_\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\\\{\}\[\]\'\"\;\:\<\,\>\.\?\/\|\₩\s]+$/;     
    if(!content.match(regExp)) {
      this.showBasicAlert('내용에 부적절한 글자가 포함되어 있습니다.<br/>확인 후 다시 시도해주세요.<br/>ex) 이모티콘, 특수문자');
      return true;
    }
    return false;
  }
  
  textAreaFilter(content) {
    content = content.replace(/^(\s)*/g, '');
    content = content.replace(/( )+( )+/g, ' ');
    content = content.replace(/(\n)+( )*(\n)+( )*(\n)+/g, '\n\n');
    return content;
  }

  showUpdateAlert(message) {
    let confirm = this.alertCtrl.create ({
      title: '업데이트 안내',
      message: message,
      buttons: [
        {
          text: '업데이트',
          handler: () => {
            console.log('업데이트');
            if(this.platform.is('android')) {
              this.market.open('com.potenbrothers.feed100');
            }
            else if(this.platform.is('ios')) {
              this.market.open('id1329537100');
            }  
          }
        }
      ],
      enableBackdropDismiss: false
    });
    confirm.present();
  }

  showNoticeAlert(message, handler) {
    let confirm = this.alertCtrl.create ({
      title: '공지사항',
      message: message,
      buttons: [
        {
          text: '확인',
          handler: handler
        }
      ],
      enableBackdropDismiss: false
    });
    confirm.present();
  }

  showBasicAlert(message) {
    let alert = this.alertCtrl.create ({
      message: message,
      buttons: ['확인'],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top'
    });

    toast.present(toast);
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
      ],
      enableBackdropDismiss: false
    });
    confirm.present();
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      spinner: "dots",
      duration: 5000
    });
    if(this.isLoadingActive) {
      loading.present();
      this.isLoadingActive = false;
    }

    return loading;
  }

  dismissAllModal() {
    let modalLen = this.modalWrapperPages.length;
    for(let i=modalLen; i>0; i--) {
      console.log('ModalWrapperPage dismissModal' + i);
      this.modalWrapperPages[i-1].dismissModal();
    }
  }
}
