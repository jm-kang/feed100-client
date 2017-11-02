import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-interview',
  templateUrl: 'user-interview.html',
})
export class UserInterviewPage {
  activeAccordion: boolean = false;

  interviews = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserInterviewPage');

    let loading = this.commonService.presentLoading();

    this.userService.getInterviews()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          // 추가된 문장
          this.userService.alarmNum = data.data.alarm_num;
          // 추가된 문장 끝
          this.interviews = data.data;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInterviewPage');
  }

  accordion() {
    if(this.activeAccordion) {
      this.activeAccordion = false;
    } else {
      this.activeAccordion = true;
    }
  }

  openUserProjectInterviewDetailPage(project_id, progressState) {
    if(progressState == '종료') {
      this.commonService.showBasicAlert('이미 종료된 프로젝트입니다.');
    }
    else {
      this.navCtrl.push('UserProjectInterviewDetailPage', { "project_id" : project_id });
    }
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
