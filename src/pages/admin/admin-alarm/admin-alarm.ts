import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';
/**
 * Generated class for the AdminAlarmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-alarm',
  templateUrl: 'admin-alarm.html',
})
export class AdminAlarmPage {
  alarms = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter AdminAlarmPage');
    let loading = this.commonService.presentLoading();
    
    this.adminService.getAlarms()
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
            this.ionViewDidEnter();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  accessAlarmItem(link, project_id, alarm_id) {
    switch(link) {
      case "endProject":
      case "newFeedback":
      case "warnProject":
      case "newReport":
        this.accessProjectCard(project_id);
        break;
      case "newInterview":
        this.openAdminProjectInterviewPage(project_id);
        break;
    }
  }

  back() {
    this.navCtrl.pop();
  }

  openAdminProjectInterviewPage(project_id) {
    this.navCtrl.push('AdminProjectInterviewPage', { "project_id" : project_id });
  }

  accessProjectCard(project_id) {
    this.openAdminProjectHomePage(project_id);
  }

  openAdminProjectHomePage(project_id) {
    this.navCtrl.push('AdminProjectHomePage', { "project_id" : project_id });
  }

}
