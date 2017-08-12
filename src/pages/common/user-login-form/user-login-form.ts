import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { UserTabsPage } from '../../user/user-tabs/user-tabs';
import { UserSnsRegistrationFormPage } from '../user-sns-registration-form/user-sns-registration-form'

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
  username: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLoginFormPage');
  }

  back() {
    this.viewCtrl.dismiss();
  }

  localLogin() {
    this.navCtrl.push(UserTabsPage);
  }

  kakaoLogin() {
    this.navCtrl.push(UserSnsRegistrationFormPage);
  }

  facebookLogin() {
    this.navCtrl.push(UserSnsRegistrationFormPage);
  }

}
