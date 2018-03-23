import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-home',
  templateUrl: 'user-project-home.html',
})
export class UserProjectHomePage {
  projectName: string = "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십";
  currentReward: string = "1000";
  maxReward: string = "5500";
  progressState: string = "2018-03-31 00:00:00";
  waitingNotice: string = "프로젝트 안내 프로젝트 안내 프로젝트 안내프로젝트 안내프로젝트 안내프로젝트 안내 프로젝트 안내";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectHomePage');
  }

  back() {
    this.navCtrl.pop();
  }

}
