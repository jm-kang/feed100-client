import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';

declare var KakaoTalk;
/**
 * Generated class for the UserLoginFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-login-form',
  templateUrl: 'user-login-form.html',
})
export class UserLoginFormPage {
  username: string = '';
  password: string = '';
  role: string = 'user';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public commonService: CommonServiceProvider,
    public storage: Storage,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public zone: NgZone) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginFormPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserLoginFormPage');
  }

  back() {
    this.navCtrl.pop();
  }

  localLogin() {
    if(!this.username) {
      this.commonService.showBasicAlert('이메일을 입력해주세요.');
      return;
    }
    if(!this.password) {
      this.commonService.showBasicAlert('비밀번호를 입력해주세요.');
      return;
    }

    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();

    this.commonService.localLogin(this.username, this.password, this.role)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.navCtrl.setRoot('UserTabsPage', {}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          if(data.message == 'username is unregistered') {
            this.commonService.showBasicAlert('이메일을 정확히 입력해주세요.');
          }
          else if(data.message == 'password is not correct') {
            this.commonService.showBasicAlert('비밀번호를 정확히 입력해주세요.');
          }
          else { 
            this.commonService.apiRequestErrorHandler(data, this.navCtrl);
          }
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  // googleLogin() {
  //   this.commonService.showBasicAlert('현재 서비스 준비중입니다. 추후 업데이트 후 이용해주세요!');
  // }

  // facebookLogin() {
  //   this.commonService.showBasicAlert('현재 서비스 준비중입니다. 추후 업데이트 후 이용해주세요!');
  // }

  // kakaoLogin() {
  //   this.commonService.showBasicAlert('현재 서비스 준비중입니다. 추후 업데이트 후 이용해주세요!');
  // }

  googleLogin() {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();

    this.googlePlus.login({})
    .then(res => {
      console.log(res);
      this.commonService.SNSLogin('google', res.userId, this.role)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
      (data) => {
        if(data.success == true) {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.googlePlus.logout()
          .then(() => {
            this.navCtrl.setRoot('UserTabsPage', {}, {animate: true, direction: 'forward'});
          });
        }
        else if(data.success == false) {
          if(data.message == 'app_id is unregistered') {
            this.navCtrl.push('UserSnsRegistrationFormPage', {
              "provider" : "google",
              "app_id" : res.userId
            });
          }
          else {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl);
          }
        }
        
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
      );
    })
    .catch(err => {
      console.error(err);
      this.commonService.showBasicAlert('오류가 발생했습니다.');
      loading.dismiss();
    });
  }

  facebookLogin() {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();

    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      console.log('Logged into Facebook!', res);
      console.log(res.authResponse.userID);
      this.commonService.SNSLogin('facebook', res.authResponse.userID, this.role)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
      (data) => {
        if(data.success == true) {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.navCtrl.setRoot('UserTabsPage', {}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          if(data.message == 'app_id is unregistered') {
            this.navCtrl.push('UserSnsRegistrationFormPage', {
              "provider" : "facebook",
              "app_id" : res.authResponse.userID
            });
          }
          else {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl);
          }
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
      );
    })
    .catch(e => {
      console.log('Error logging into Facebook', e);
      this.commonService.showBasicAlert('오류가 발생했습니다.');
      loading.dismiss();
    });

  }

  kakaoLogin() {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();
    
    KakaoTalk.login(
    (result) => {
    console.log("result :", result);      
    console.log('Successful login!');
    console.log(result.id);
    this.commonService.SNSLogin('kakao', result.id, this.role)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
    (data) => {
      if(data.success == true) {
        this.zone.run(() => {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.navCtrl.setRoot('UserTabsPage', {}, {animate: true, direction: 'forward'});
        });
      }
      else if(data.success == false) {
        this.zone.run(() => {
          if(data.message == 'app_id is unregistered') {
            this.navCtrl.push('UserSnsRegistrationFormPage', {
              "provider" : "kakao",
              "app_id" : result.id
            });
          }
          else {
             this.commonService.apiRequestErrorHandler(data, this.navCtrl);
          }
        });          
      }
    },
    (err) => {
      console.log(err);
      this.commonService.showBasicAlert('오류가 발생했습니다.');
    }
    );
  },
    (message) => {
      console.log('Error logging in');
      console.log(message);
      loading.dismiss();    
    }
  );
  }

}
