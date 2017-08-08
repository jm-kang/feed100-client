import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CompanyRegistrationFormPage } from '../company-registration-form/company-registration-form';
import { UserRegistrationFormPage } from '../user-registration-form/user-registration-form';

/**
 * Generated class for the RegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  back() {
    this.navCtrl.pop();
  }

  openCompanyRegistrationFormPage() {
    this.navCtrl.push(CompanyRegistrationFormPage);
  }

  openUserRegistrationFormPage() {
    this.navCtrl.push(UserRegistrationFormPage);
  }

}
