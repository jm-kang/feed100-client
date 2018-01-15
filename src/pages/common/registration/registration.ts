import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter RegistrationPage');
  }

  back() {
    this.navCtrl.pop();
  }

  openCompanyRegistrationFormPage() {
    this.navCtrl.push('CompanyRegistrationFormPage');
  }

  openUserRegistrationFormPage() {
    this.navCtrl.push('UserRegistrationFormPage');
  }

}
