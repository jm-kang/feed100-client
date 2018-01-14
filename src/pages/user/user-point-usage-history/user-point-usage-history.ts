import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

/**
 * Generated class for the UserPointUsageHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-point-usage-history',
  templateUrl: 'user-point-usage-history.html',
})
export class UserPointUsageHistoryPage {
  @ViewChild(Content) content: Content;

  segmentHistoryCondition: String = "";
  savePointUsageNum: number = 2;
  exchangePointUsageNum: number = 1;
  totalPoint = 4000;
  totalSavePoint = 24000;
  totalExchangePoint = 20000;

  pointUsages = [
    {
      type: "exchange",
      content: "피드백 2017123001055 홍길동",
      point: "20000",
      totalPoint: "4000",
      date: "2017-12-14 12:00:00",
    },
    {
      type: "save",
      content: "대학생의 공부자료실, 클래스에이드",
      point: "14000",
      totalPoint: "24000",
      date: "2017-12-13 23:00:00",
    },
    {
      type: "save",
      content: "강연 / 컨퍼런스 지원 실시간 소통 응답서비스 CON",
      point: "10000",
      totalPoint: "10000",
      date: "2017-12-12 06:00:00",
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPointUsageHistoryPage');
    this.segmentHistoryCondition = "all";
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserPointUsageHistoryPage');
  }

  back() {
    this.navCtrl.pop();
  }

  changeSegment() {
    this.content.scrollToTop();
  }

}
