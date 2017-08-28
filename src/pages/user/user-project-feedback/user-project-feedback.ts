import { Component } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the UserProjectFeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-feedback',
  templateUrl: 'user-project-feedback.html',
})
export class UserProjectFeedbackPage {
  projectName: String = "프로젝트 이름 프로젝트 이름";

  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackPage');
  }

  ionViewDidEnter() {
    this.statusBar.show();
  }

  back() {
    this.navCtrl.pop();
  }

}
