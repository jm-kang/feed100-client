import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { UserTabsPage } from '../../user/user-tabs/user-tabs';
import { TermsPage } from '../terms/terms';
import { PrivateInfoPolicyPage} from '../private-info-policy/private-info-policy';
import { UserSnsRegistrationFormPage } from '../user-sns-registration-form/user-sns-registration-form'

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
    let termsModal = this.modalCtrl.create(TermsPage);
    termsModal.present();
  }

  openPrivateInfoPolicyPage() {
    let privateInfoPolicyModal = this.modalCtrl.create(PrivateInfoPolicyPage);
    privateInfoPolicyModal.present();
  }

  localRegister() {
    if(!this.username) {
      this.commonService.showBasicAlert('이메일을 입력해주세요.');
      return;
    }
    if(!this.password) {
      this.commonService.showBasicAlert('비밀번호를 입력해주세요.');
      return;
    }
    if(!this.checkingPassword) {
      this.commonService.showBasicAlert('비밀번호 확인을 입력해주세요.');
      return;
    }
    if(!this.nickname) {
      this.commonService.showBasicAlert('닉네임을 입력해주세요.');
      return;
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
          this.navCtrl.setRoot(UserTabsPage, {"isLogin" : true}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'username is already registered':
              this.commonService.showBasicAlert('이미 등록되어있는 이메일입니다.');
              break;
            case 'nickname is already registered':
              this.commonService.showBasicAlert('이미 등록되어있는 닉네임입니다.');
              break;
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
            this.navCtrl.setRoot(UserTabsPage, {"isLogin" : true}, {animate: true, direction: 'forward'});
          });
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'app_id is unregistered':
              this.navCtrl.push(UserSnsRegistrationFormPage, {
                "provider" : "google",
                "app_id" : res.userId
              });
              break;
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
          this.navCtrl.setRoot(UserTabsPage, {"isLogin" : true}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'app_id is unregistered':
              this.navCtrl.push(UserSnsRegistrationFormPage, {
                "provider" : "facebook",
                "app_id" : res.authResponse.userID
              });
              break;
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
    // this.commonService.showBasicAlert('준비중입니다!');
    
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
          this.navCtrl.setRoot(UserTabsPage, {"isLogin" : true}, {animate: true, direction: 'forward'});
        });
      }
      else if(data.success == false) {
        this.zone.run(() => {          
          switch(data.message) {
            case 'app_id is unregistered':
              this.navCtrl.push(UserSnsRegistrationFormPage, {
                "provider" : "kakao",
                "app_id" : result.id
              });
              break;
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
