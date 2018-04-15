import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminMypagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-mypage',
  templateUrl: 'admin-mypage.html',
})
export class AdminMypagePage {
  avatarImage = "assets/img/company-avatar-image.png";
  nickname = "관리자";;
  username = "admin@feed100.me";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMypagePage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminMypagePage');
  }

  doRefresh(refresher) {
    // this.commonService.isLoadingActive = true;
    // this.ionViewWillEnter();
    // refresher.complete();
  }

  openAdminConfigurePage() {
    this.navCtrl.push('AdminConfigurePage');
  }

}
