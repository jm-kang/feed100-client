import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';

declare var KakaoTalk;

/**
 * Generated class for the UserRegistrationFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-registration-form',
  templateUrl: 'user-registration-form.html',
})
export class UserRegistrationFormPage {
  username: string = '';
  password: string = '';
  checkingPassword: string = '';
  nickname: string = '';
  isCheck: boolean = false;
  role: string = 'user';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public commonService: CommonServiceProvider,
    public storage: Storage,
    public fb: Facebook,
    public googlePlus: GooglePlus,
    public zone: NgZone) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegistrationFormPage');
  }

  back() {
    this.navCtrl.pop();
  }

  openTermsPage() {
    this.modalCtrl.create('ModalWrapperPage', { page: 'TermsPage' }).present();
  }

  openPrivateInfoPolicyPage() {
    this.modalCtrl.create('ModalWrapperPage', { page: 'PrivateInfoPolicyPage' }).present();
  }

  // localRegister() {
  //   this.commonService.showBasicAlert('현재 서비스 준비중입니다. 추후 업데이트 후 이용해주세요!');
  // }

  // googleRegister() {
  //   this.commonService.showBasicAlert('현재 서비스 준비중입니다. 추후 업데이트 후 이용해주세요!');
  // }

  // facebookRegister() {
  //   this.commonService.showBasicAlert('현재 서비스 준비중입니다. 추후 업데이트 후 이용해주세요!');
  // }

  // kakaoRegister() {
  //   this.commonService.showBasicAlert('현재 서비스 준비중입니다. 추후 업데이트 후 이용해주세요!');
  // }

  localRegister() {
    if(!this.username) {
      this.commonService.showBasicAlert('이메일을 입력해주세요.');
      return;
    }
    else {
      let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if(!this.username.match(regExp)) {
        this.commonService.showBasicAlert('이메일 형식이 올바르지 않습니다.');
        return;
      }
    }

    if(!this.password) {
      this.commonService.showBasicAlert('비밀번호를 입력해주세요.');
      return;
    }
    else {
      let regExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/;          
      if(!this.password.match(regExp)) {
        this.commonService.showBasicAlert('비밀번호는 영문, 숫자, 특수문자 조합으로 최소 8자 이상이어야 합니다.');
        return;
      }
    }

    if(!this.checkingPassword) {
      this.commonService.showBasicAlert('비밀번호 확인을 위해 다시 한 번 입력해주세요.');
      return;
    }
    else {
      if(this.password != this.checkingPassword) {
        this.commonService.showBasicAlert('비밀번호를 다시 확인해주세요.');
        return;
      }
    }

    if(!this.nickname) {
      this.commonService.showBasicAlert('닉네임을 입력해주세요.');
      return;
    }
    else {
      let regExp = /[가-힣0-9a-zA-Z]{2,16}$/;
      let withoutKorean = this.nickname.replace(/[가-힣]/g, '');
      let withoutEnglish = this.nickname.replace(/[0-9a-zA-z]/g, '');
      let byte = withoutKorean.length + withoutEnglish.length * 2;
      if(!this.nickname.match(regExp) || byte < 4 || byte > 16) {
        this.commonService.showBasicAlert('닉네임은 한글 2 ~ 8자, 영문, 숫자 4 ~ 16자 이내로 입력해주세요.');
        return;
      }
    }

    if(!this.isCheck) {
      this.commonService.showBasicAlert('이용약관 및 개인정보 취급방침에 동의해주세요.');
      return;
    }

    let loading = this.commonService.presentLoading();
    
    this.commonService.localRegister(this.username, this.password, this.role, this.nickname)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.navCtrl.setRoot('UserTabsPage', {"isLogin" : true}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'username is already registered':
              this.commonService.showBasicAlert('이미 등록되어있는 이메일입니다.');
              break;
            case 'nickname is already registered':
              this.commonService.showBasicAlert('이미 등록되어있는 닉네임입니다.');
              break;
            default:
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

  googleRegister() {
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
            this.navCtrl.setRoot('UserTabsPage', {"isLogin" : true}, {animate: true, direction: 'forward'});
          });
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'app_id is unregistered':
              this.navCtrl.push('UserSnsRegistrationFormPage', {
                "provider" : "google",
                "app_id" : res.userId
              });
              break;
            default:
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


  facebookRegister() {
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
          this.navCtrl.setRoot('UserTabsPage', {"isLogin" : true}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'app_id is unregistered':
              this.navCtrl.push('UserSnsRegistrationFormPage', {
                "provider" : "facebook",
                "app_id" : res.authResponse.userID
              });
              break;
            default:
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

  kakaoRegister() {
    let loading = this.commonService.presentLoading();
    
    KakaoTalk.login(
    (result) => {
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
          this.navCtrl.setRoot('UserTabsPage', {"isLogin" : true}, {animate: true, direction: 'forward'});
        });
      }
      else if(data.success == false) {
        this.zone.run(() => {          
          switch(data.message) {
            case 'app_id is unregistered':
              this.navCtrl.push('UserSnsRegistrationFormPage', {
                "provider" : "kakao",
                "app_id" : result.id
              });
              break;
            default:
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
