import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

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
  savePointNum: number = 0;
  exchangePointNum: number = 0;
  totalPoint = 0;
  totalSavePoint = 0;
  totalExchangePoint = 0;
  isFold: boolean = true;

  pointHistories = []

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPointUsageHistoryPage');
    this.commonService.isLoadingActive = true;
    this.segmentHistoryCondition = "all";
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserPointUsageHistoryPage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getPointHistory()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.pointHistories = data.data;
          this.savePointNum = this.exchangePointNum = this.totalSavePoint = this.totalExchangePoint = this.totalPoint = 0;
          for(let pointHistory of this.pointHistories) {
            if(pointHistory.is_accumulated) {
              this.savePointNum++;
              this.totalSavePoint += pointHistory.point;
            }
            else {
              this.exchangePointNum++;
              this.totalExchangePoint += pointHistory.point;
            }
          }
          this.totalPoint = this.totalSavePoint - this.totalExchangePoint;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );    
  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  back() {
    this.navCtrl.pop();
  }

  changeSegment() {
    this.content.scrollToTop();
  }

  fold(fold:number) {
    if(fold == 0) {
      this.isFold = false;
    } else {
      this.isFold = true;
    }
  }

}
