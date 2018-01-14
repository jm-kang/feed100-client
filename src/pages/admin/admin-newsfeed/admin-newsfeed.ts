import { Component, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';
/**
 * Generated class for the AdminNewsfeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-newsfeed',
  templateUrl: 'admin-newsfeed.html',
})
export class AdminNewsfeedPage {

  newsfeeds = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminNewsfeedPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminNewsfeedPage');
    let loading = this.commonService.presentLoading();

    this.adminService.getNewsfeeds()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.newsfeeds = data.data;
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

  openAdminNewsfeedStoryPage(newsfeed_id) {
    this.navCtrl.push('AdminNewsfeedStoryPage', { "newsfeed_id" : newsfeed_id });
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
