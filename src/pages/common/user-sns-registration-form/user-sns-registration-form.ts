import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { UserTabsPage } from '../../user/user-tabs/user-tabs';
import { TermsPage } from '../terms/terms';
import { PrivateInfoPolicyPage} from '../private-info-policy/private-info-policy';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';

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
    public httpService: HttpServiceProvider,
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
      this.showBasicAlert('오류가 발생했습니다.');
    }
    if(!this.username) {
      this.showBasicAlert('이메일을 입력해주세요.');
      return;
    }
    if(!this.nickname) {
      this.showBasicAlert('닉네임을 입력해주세요.');
      return;
    }
    if(!this.isCheck) {
      this.showBasicAlert('이용약관 및 개인정보 취급방침에 동의해주세요.');
      return;
    }
    this.httpService.SNSRegister(this.username, this.role, this.nickname, this.provider, this.app_id)
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          // this.navCtrl.push(UserTabsPage);
          this.navCtrl.setRoot(UserTabsPage, {"isLogin" : true}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'username is already registered':
              this.showBasicAlert('이미 등록되어있는 이메일입니다.');
              break;
            case 'nickname is already registered':
              this.showBasicAlert('이미 등록되어있는 닉네임입니다.');
              break;
          }
        }
      },
      (err) => {
        console.log(err);
        this.showBasicAlert('오류가 발생했습니다.');
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

}
