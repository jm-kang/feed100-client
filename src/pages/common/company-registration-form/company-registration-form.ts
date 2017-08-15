import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { CompanyTabsPage } from '../../company/company-tabs/company-tabs';
import { TermsPage } from '../terms/terms';
import { PrivateInfoPolicyPage} from '../private-info-policy/private-info-policy';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CompanyRegistrationFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-registration-form',
  templateUrl: 'company-registration-form.html',
})
export class CompanyRegistrationFormPage {
  username: string = '';
  password: string = '';
  checkingPassword: string = '';
  nickname: string = '';
  isCheck: boolean = false;
  role: string = 'company';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public httpService: HttpServiceProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyRegistrationFormPage');
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
      this.showBasicAlert('이메일을 입력해주세요.');
      return;
    }
    if(!this.password) {
      this.showBasicAlert('비밀번호를 입력해주세요.');
      return;
    }
    if(!this.checkingPassword) {
      this.showBasicAlert('비밀번호 확인을 입력해주세요.');
      return;
    }
    if(!this.nickname) {
      this.showBasicAlert('기업명 / 팀명을 입력해주세요.');
      return;
    }
    if(!this.isCheck) {
      this.showBasicAlert('이용약관 및 개인정보 취급방침에 동의해주세요.');
      return;
    }
    this.httpService.localRegister(this.username, this.password, this.role, this.nickname)
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          // this.navCtrl.push(CompanyTabsPage);
          this.navCtrl.setRoot(CompanyTabsPage, {}, {animate: true, direction: 'forward'});
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'username is already registered':
              this.showBasicAlert('이미 등록되어있는 이메일입니다.');
              break;
            case 'nickname is already registered':
              this.showBasicAlert('이미 등록되어있는 기업명 / 팀명입니다.');
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
