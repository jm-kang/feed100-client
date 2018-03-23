import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserNotificationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-notification',
  templateUrl: 'user-notification.html',
})
export class UserNotificationPage {
  notifications = [
    {
      project_id: 1,
      notification_id: 1,
      notification_link: "newInterview",
      notification_image: "./../../assets/img/feed100-intro-slide4.png",
      notification_tag: "인터뷰 요청",
      project_name: "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
      notification_content: "새로운 인터뷰가 도착했습니다. 응답해주세요!",
      is_read: false,
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
      is_read: false,
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
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserNotificationPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserAlarmPage');
    // let loading = this.commonService.presentLoading();
    
    // this.userService.getAlarms()
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

  openUserConfigurePage() {
    this.navCtrl.push('UserConfigurePage');
  }

  accessNotificationItem(link, project_id, notification_id) {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();
    
    this.userService.alarmRead(notification_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.notifications = data.data;
          switch(link) {
            case "newInterview":
            case "endProject":
              this.accessProjectCard(project_id);
              break;
            case "warning":
              this.commonService.showBasicAlert('부적절한 활동으로 인하여 해당 프로젝트에서 제외되었습니다.<br>경고 3회 누적 시 서비스 이용이<br>제한될 수 있습니다.');
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

  accessProjectCard(project_id) {
    this.userService.accessProjectCard(this, project_id);
  }

}
