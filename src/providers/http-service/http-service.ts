import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { App, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { LoginPage } from  '../../pages/common/login/login';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
  alarmNum = 0;
  interviewNum = 0;

  constructor(
    public http: Http, 
    public storage: Storage, 
    public app: App,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public statusBar: StatusBar,
    public uniqueDeviceID: UniqueDeviceID,
    public camera: Camera,
    public file: File) {
  }

  getServerUrl() {
    // return 'http://172.30.1.22:3000';
    return 'http://localhost:3000';
    // return 'http://www.feed100.me';
  } 

  localLogin(username, password, role) {
    let url = this.getServerUrl() + '/auth/login';
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
    let loading = this.presentLoading();

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
              loading.dismiss();
            })
            .catch((err) => { // modal이 없고 base 노드인 경우
              console.log('popAll Error: ', err);
              this.app.getRootNavs()[0].setRoot(LoginPage);
              this.statusBar.show();
              this.showBasicAlert('로그아웃되었습니다.');
              loading.dismiss();
            })
          });
        },
        (err) => {
          console.log(err);
          this.showBasicAlert('오류가 발생했습니다.');
          loading.dismiss();
        }
      )
    })
    .catch((error: any) => {
      console.log(error);
      this.showBasicAlert('오류가 발생했습니다.');
      loading.dismiss();
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

  updateAccount(nickname, introduction) {
    let url = this.getServerUrl() + '/api/user/account';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "nickname" : nickname,
      "introduction" : introduction
    };

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  updateProfile(gender, age, job, region, marriage, interests) {
    let url = this.getServerUrl() + '/api/user/profile';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "gender" : gender,
      "age" : age,
      "job" : job,
      "region" : region,
      "marriage" : marriage,
      "interests" : interests
    };

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.put(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getUserHome() {
    let url = this.getServerUrl() + '/api/user/home';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });

  }

  getUserAndProjectAndParticipation(project_id) {
    let url = this.getServerUrl() + '/api/user/project/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getAlarms() {
    let url = this.getServerUrl() + '/api/user/alarms';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  alarmRead(alarm_id) {
    let url = this.getServerUrl() + '/api/user/alarm/read';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "alarm_id" : alarm_id
    }
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getAlarmAndInterviewNum() {
    let url = this.getServerUrl() + '/api/user/alarm&interview/num';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getInterviews() {
    let url = this.getServerUrl() + '/api/user/interviews';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getInterview(project_id) {
    let url = this.getServerUrl() + '/api/user/interview/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  responseInterview(interview_id, interview_response, interview_response_images) {
    let url = this.getServerUrl() + '/api/user/interview/' + interview_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "interview_response" : interview_response,
      "interview_response_images" : interview_response_images
    };

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
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

  getProjects() {
    let url = this.getServerUrl() + '/api/projects';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProject(project_id) {
    let url = this.getServerUrl() + '/api/project/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectHome(project_id) {
    let url = this.getServerUrl() + '/api/project/home/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getSideMenuData(project_id) {
    let url = this.getServerUrl() + '/api/project/side-menu/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  getProjectParticipation(project_id) {
    let url = this.getServerUrl() + '/api/project/participation/' + project_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
  }

  projectParticipation(project_id, project_participation_objective_conditions) {
    let url = this.getServerUrl() + '/api/project/participation';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "project_id" : project_id,
      "project_participation_objective_conditions" : project_participation_objective_conditions,
    }
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  projectFeedback(project_id, project_story_summary, project_feedback, project_feedback_hashtags, project_feedback_images, project_first_impression_rate) {
    let url = this.getServerUrl() + '/api/project/feedback';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "project_id" : project_id,
      "project_story_summary" : project_story_summary,
      "project_feedback" : project_feedback,
      "project_feedback_hashtags" : project_feedback_hashtags,
      "project_feedback_images" : project_feedback_images,
      "project_first_impression_rate" : project_first_impression_rate
    }
    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, data, { headers: headers }).map(res => res.json());
    });
  }

  getFeedback(project_id, feedback_id) {
    let url = this.getServerUrl() + '/api/project/' + project_id + '/feedback/' + feedback_id;
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.get(url, { headers: headers }).map(res => res.json());
    });
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
    let url = this.getServerUrl() + '/api/upload/tmp';
    let headers = new Headers();

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, formData, { headers: headers }).map(res => res.json());
    });
  }

  moveFiles(images) {
    let url = this.getServerUrl() + '/api/move';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');

    return Observable.fromPromise(this.storage.get('accessToken'))
    .mergeMap((accessToken) => {
      headers.append('x-access-token', accessToken);
      return this.http.post(url, { "images" : images }, { headers: headers }).map(res => res.json());
    });
  }

  registerOpinion(feedback_id, is_empathy, opinion, opinion_image) {
    let url = this.getServerUrl() + '/api/project/feedback/opinion';
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let data = {
      "feedback_id" : feedback_id,
      "is_empathy" : is_empathy,
      "opinion" : opinion,
      "opinion_image" : opinion_image
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
