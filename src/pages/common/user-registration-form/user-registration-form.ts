import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { UserTabsPage } from '../../user/user-tabs/user-tabs';
import { TermsPage } from '../terms/terms';
import { PrivateInfoPolicyPage} from '../private-info-policy/private-info-policy';
import { UserSnsRegistrationFormPage } from '../user-sns-registration-form/user-sns-registration-form'

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
  username: string = "";
  password: string = "";
  checkingPassword: string = "";
  nickname: string = "";
  isCheck: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
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
    this.navCtrl.push(UserTabsPage);
  }

  kakaoRegister() {
    this.navCtrl.push(UserSnsRegistrationFormPage);
  }

  facebookRegister() {
    this.navCtrl.push(UserSnsRegistrationFormPage);
  }
}
