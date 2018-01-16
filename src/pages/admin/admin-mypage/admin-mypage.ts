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
  avatarImage: String = '';
  levelClass: String = '';
  username: String = '';
  nickname: String = '';
  proceedingProjectNum = 0;
  endProjectNum = 0;
  segmentProjectCondition: String = '';

  // 진행중인 프로젝트
  proceedingProjects = [];

  endProjects = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
    this.segmentProjectCondition = "proceedingProject";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMypagePage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminMypagePage');
    let loading = this.commonService.presentLoading();
    
    this.adminService.getAdminInfo()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.avatarImage = data.data.avatar_image;
          this.levelClass = 'Admin';
          this.username = data.data.username;
          this.nickname = data.data.nickname;
          this.proceedingProjects = data.data.proceeding_projects;
          this.endProjects = data.data.end_projects;
          this.proceedingProjectNum = this.proceedingProjects.length;
          this.endProjectNum = this.endProjects.length;
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

  openAdminAccountModificationFormPage() {
    let adminAccountModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page : 'AdminAccountModificationFormPage'});
    adminAccountModificationFormModal.present();
    adminAccountModificationFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();
        }
      }
    );
  }

  openAdminProjectPage() {
    this.navCtrl.parent.select(1);
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
