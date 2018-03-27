import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyNotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-notification',
  templateUrl: 'company-notification.html',
})
export class CompanyNotificationPage {
  notifications = [
    {
      project_id: 1,
      notification_id: 1,
      notification_link: "newInterview",
      notification_image: "./../../assets/img/feed100-intro-slide4.png",
      notification_tag: "인터뷰 요청",
      project_name: "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
      notification_content: "새로운 인터뷰가 도착했습니다. 응답해주세요!",
      notification_is_read: false,
      notification_registration_date: "2018-01-29 10:00:00",
    },
    {
      project_id: 1,
      notification_id: 2,
      notification_link: "endProject",
      notification_image: "./../../assets/img/feed100-intro-slide4.png",
      notification_tag: "프로젝트 완료",
      project_name: "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
      notification_content: "프로젝트가 종료되었습니다. 보상을 받아보세요!",
      notification_is_read: false,
      notification_registration_date: "2018-01-29 10:00:00",
    },
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyNotificationPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyNotificationPage');
    // let loading = this.commonService.presentLoading();
    
    // this.companyService.getAlarms()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.notifications = data.data;
    //       this.badge.set(0);
    //     }
    //     else if(data.success == false) {
    //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewWillEnter();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.commonService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );

  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  accessAlarmItem(link, project_id, alarm_id) {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();
    
    this.companyService.alarmRead(alarm_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.notifications = data.data;
          switch(link) {
            case "endProject":
            case "newFeedback":
            case "warnProject":
            case "newReport":
              this.accessProjectCard(project_id);
              break;
            case "newInterview":
              this.openCompanyProjectInterviewPage(project_id);
              break;
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

  accessProjectCard(project_id) {
    this.companyService.accessProjectCard(this, project_id);
  }

  openCompanyProjectInterviewPage(project_id) {
    this.navCtrl.push('CompanyProjectInterviewPage', { "project_id" : project_id });
  }
}
