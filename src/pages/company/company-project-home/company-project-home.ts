import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompanyProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-home',
  templateUrl: 'company-project-home.html',
})
export class CompanyProjectHomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectHomePage');
  }
  
  openCompanyTutorial() {
    this.navCtrl.push("CompanyTutorialPage");
  }

  openComapnyProjectRegistration() {
    this.navCtrl.push("CompanyProjectRegistrationPage");
  }
}
