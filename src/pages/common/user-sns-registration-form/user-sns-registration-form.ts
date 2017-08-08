import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { UserTabsPage } from '../../user/user-tabs/user-tabs';
import { TermsPage } from '../terms/terms';
import { PrivateInfoPolicyPage} from '../private-info-policy/private-info-policy';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSnsRegistrationFormPage');
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
}
