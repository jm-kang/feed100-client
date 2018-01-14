import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';
/**
 * Generated class for the AdminProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project',
  templateUrl: 'admin-project.html',
})
export class AdminProjectPage {

  projects = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectPage');
    let loading = this.commonService.presentLoading();

    this.adminService.getProjects()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projects = data.data;
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
        console.log(JSON.stringify(err));
        this.commonService.showBasicAlert('오류가 발생했습니다.')
      }
    );
  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  accessProjectCard(project_id) {
    this.openAdminProjectHomePage(project_id);
  }

  openAdminProjectHomePage(project_id) {
    this.navCtrl.push('AdminProjectHomePage', { "project_id" : project_id });
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
