import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';

import { LoginPage } from '../../common/login/login';
import { UserProjectRewardFormPage } from '../user-project-reward-form/user-project-reward-form';
/**
 * Generated class for the UserProjectLinkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-link',
  templateUrl: 'user-project-link.html',
})
export class UserProjectLinkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectLinkPage');
  }

  // dismiss() {
  //   console.log(this.navCtrl.popToRoot());
  // }

  // openProjectRewardFormPage() {
  //   this.navCtrl.push(UserProjectRewardFormPage);
  // }

}
