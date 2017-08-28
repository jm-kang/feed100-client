import { Component,ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, MenuController, ViewController } from 'ionic-angular';

import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { UserProjectFeedbackPage } from '../user-project-feedback/user-project-feedback';
import { UserProjectHistoryPage } from '../user-project-history/user-project-history';
import { UserProjectInterviewDetailPage } from '../user-project-interview-detail/user-project-interview-detail';

import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the UserProjectSideMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-side-menu',
  templateUrl: 'user-project-side-menu.html',
})
export class UserProjectSideMenuPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public statusBar: StatusBar
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectSideMenuPage');
  }

}
