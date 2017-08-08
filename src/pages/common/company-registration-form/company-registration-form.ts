import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CompanyTabsPage } from '../../company/company-tabs/company-tabs';
import { TermsPage } from '../terms/terms';
import { PrivateInfoPolicyPage} from '../private-info-policy/private-info-policy';

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
  username: string = "";
  password: string = "";
  checkingPassword: string = "";
  nickname: string = "";
  isCheck: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
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
    this.navCtrl.push(CompanyTabsPage);
  }

  kakaoRegister() {
    this.navCtrl.push(CompanyTabsPage);
  }

  facebookRegister() {
    this.navCtrl.push(CompanyTabsPage);
  }
}
