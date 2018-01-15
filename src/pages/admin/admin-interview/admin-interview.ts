import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';
/**
 * Generated class for the AdminInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-interview',
  templateUrl: 'admin-interview.html',
})
export class AdminInterviewPage {
  activeAccordion: boolean = false;

  projectInterviews = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminInterviewPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminInterviewPage');
    let loading = this.commonService.presentLoading();
    
    this.adminService.getInterviews()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectInterviews = data.data;
          this.adminService.setAlarmAndInterviewNum();
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

  accordion() {
    if(this.activeAccordion) {
      this.activeAccordion = false;
    } else {
      this.activeAccordion = true;
    }
  }

  openAdminProjectInterviewPage(project_id) {
    this.navCtrl.push('AdminProjectInterviewPage', { "project_id" : project_id });
  }

  openAdminAlarmPage() {
    this.navCtrl.push('AdminAlarmPage');
  }

  openAdminConfigurePage() {
    this.navCtrl.push('AdminConfigurePage');
  }

  getAlarmNum() {
    return this.adminService.alarmNum;
  }

}
