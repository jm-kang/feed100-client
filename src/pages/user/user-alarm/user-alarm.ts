import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserAlarmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-alarm',
  templateUrl: 'user-alarm.html',
})
export class UserAlarmPage {
  alarms = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAlarmPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserAlarmPage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getAlarms()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.alarms = data.data;
          this.badge.set(0);
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

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  accessAlarmItem(link, project_id, alarm_id) {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();
    
    this.userService.alarmRead(alarm_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.alarms = data.data;
          switch(link) {
            case "endProject":
            case "newFeedback":
            case "warnProject":
              this.accessProjectCard(project_id);
              break;
            case "newInterview":
              this.openUserProjectInterviewDetailPage(project_id);
              break;
            case "warning":
              this.commonService.showBasicAlert('부적절한 활동으로 인하여 해당 프로젝트에서 제외되었습니다.<br>경고 3회 누적 시 서비스 이용이 제한될 수 있습니다.');
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  back() {
    this.navCtrl.pop();
  }

  openUserProjectInterviewDetailPage(project_id) {
    this.navCtrl.push('UserProjectInterviewDetailPage', { "project_id" : project_id });
  }

  accessProjectCard(project_id) {
    this.userService.accessProjectCard(this, project_id);
  }

}
