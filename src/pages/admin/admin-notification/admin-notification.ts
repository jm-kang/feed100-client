import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminNotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-notification',
  templateUrl: 'admin-notification.html',
})
export class AdminNotificationPage {
  // notifications = [
  //   {
  //     project_id: 1,
  //     notification_id: 1,
  //     // 해당 유저 interview detail로 이동
  //     notification_link: "newUser",
  //     notification_image: "./../../assets/img/user-avatar-image-man1.png",
  //     notification_tag: "유저 참여",
  //     notification_name: "유저 이름",
  //     notification_content: "새로운 유저와 매칭이 성사되었습니다. 인터뷰를 진행해주세요!",
  //     is_read: false,
  //     notification_registration_date: "2018-01-29 10:00:00",
  //   },
  //   {
  //     project_id: 1,
  //     notification_id: 1,
  //     // 해당 유저 interview detail로 이동
  //     notification_link: "newInterview",
  //     notification_image: "./../../assets/img/user-avatar-image-man2.png",
  //     notification_tag: "인터뷰",
  //     notification_name: "유저 이름",
  //     notification_content: "인터뷰 답변이 도착했습니다. 확인해주세요!",
  //     is_read: false,
  //     notification_registration_date: "2018-01-29 10:00:00",
  //   },
  //   {
  //     project_id: 1,
  //     notification_id: 2,
  //     // 종합보고서로 이동
  //     notification_link: "endProject",
  //     notification_image: "./../../assets/img/project-main-image2.png",
  //     notification_tag: "프로젝트 종료",
  //     notification_name: "프로젝트 제목",
  //     notification_content: "프로젝트가 종료되었습니다. 종합 보고서를 확인해주세요!",
  //     is_read: false,
  //     notification_registration_date: "2018-01-29 10:00:00",
  //   },
  // ];
  notifications = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminNotificationPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminNotificationPage');
    let loading = this.commonService.presentLoading();
    
    this.adminService.getNotifications()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.notifications = data.data;
          this.adminService.setNotificationNum();
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

  accessNotificationItem(link, notification) {
    switch(link) {
      case "endProject":
        this.openAdminProjectReportPage(notification.project_id);
        break;
      case "newUser":
      case "newInterview":
        this.openAdminProjectInterviewDetailPage(notification.project_id, notification.project_participant_id);
        break;
    }
  }

  back() {
    this.navCtrl.pop();
  }

  openAdminProjectInterviewDetailPage(project_id, project_participant_id) {
    this.navCtrl.push('AdminProjectInterviewDetailPage', { 'project_id' : project_id, 'project_participant_id' : project_participant_id });
  }

  openAdminProjectReportPage(project_id) {
    this.navCtrl.push('AdminProjectReportPage', { 'project_id' : project_id })
  }

  openAdminConfigurePage() {
    this.navCtrl.push('AdminConfigurePage');
  }

}
