import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { UserTabsPage } from '../../user/user-tabs/user-tabs';
import { TermsPage } from '../terms/terms';
import { PrivateInfoPolicyPage} from '../private-info-policy/private-info-policy';

import { Storage } from '@ionic/storage';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';

/**
 * Generated class for the UserSnsRegistrationFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-sns-registration-form',
  templateUrl: 'user-sns-registration-form.html',
})
export class UserSnsRegistrationFormPage {
  username: string = "";
  nickname: string = "";
  isCheck: boolean = false;
  role: string = "user";
  provider: string = "";
  app_id: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public commonService: CommonServiceProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSnsRegistrationFormPage');
    this.provider = this.navParams.get('provider');
    this.app_id = this.navParams.get('app_id');
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

  SNSRegister() {
    if(!this.provider || !this.app_id) {
      this.commonService.showBasicAlert('오류가 발생했습니다.');
    }
    if(!this.username) {
      this.commonService.showBasicAlert('이메일을 입력해주세요.');
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

    this.commonService.SNSRegister(this.username, this.role, this.nickname, this.provider, this.app_id)
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

}
