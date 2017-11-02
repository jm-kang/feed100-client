import { Component, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserNewsfeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-newsfeed',
  templateUrl: 'user-newsfeed.html',
})
export class UserNewsfeedPage {

  newsfeeds = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserNewsfeedPage');
    let loading = this.commonService.presentLoading();

    this.userService.getNewsfeeds()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          // 추가된 문장
          this.userService.alarmNum = data.data.alarm_num;
          // 추가된 문장 끝
          this.newsfeeds = data.data;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          })
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.commonService.showBasicAlert('오류가 발생했습니다.')
      }
    )
  }

  openUserNewsfeedStoryPage(newsfeed_id) {
    this.navCtrl.push('UserNewsfeedStoryPage', { "newsfeed_id" : newsfeed_id });
  }

  // 추가된 함수

  getAlarmNum() {
    return this.userService.alarmNum;
  }

  openUserAlarmPage() {
    this.navCtrl.push('UserAlarmPage');
  }

  openUserConfigurePage() {
    this.navCtrl.push('UserConfigurePage');
  }

  // 추가된 함수 끝

}
