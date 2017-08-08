import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CompanyTabsPage } from '../../company/company-tabs/company-tabs';

/**
 * Generated class for the CompanyLoginFormPage page.
 */

@IonicPage()
@Component({
  selector: 'page-company-login-form',
  templateUrl: 'company-login-form.html',
})
export class CompanyLoginFormPage {
  username: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyLoginFormPage');
  }

  back() {
    this.navCtrl.pop();
  }

  localLogin() {
    this.navCtrl.push(CompanyTabsPage);
  }
}
