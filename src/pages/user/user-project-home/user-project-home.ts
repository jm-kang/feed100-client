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
  waitingNotice: string = "현재 인터뷰 대기 중입니다.<br>인터뷰는 프로젝트 기간 동안 진행되며 1회 당 최대 500P로 총 5회까지 추가 지급됩니다.<br>인터뷰에 성실히 응답하지 않을 시 프로젝트에서 제외 될 수 있습니다.<br>만족스러웠던 유저를 선정하여 추가로 2000P를 지급해 드립니다.<br>도전해 보세요!";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectHomePage');
  }

  back() {
    this.navCtrl.pop();
  }

}
