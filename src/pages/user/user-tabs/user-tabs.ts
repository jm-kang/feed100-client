
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Nav, ModalController } from 'ionic-angular';

import { UserProjectPage } from './../user-project/user-project';
import { UserNotificationPage } from './../user-notification/user-notification';
import { UserMypagePage } from './../user-mypage/user-mypage';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';


/**
 * Generated class for the UserTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-tabs',
  templateUrl: 'user-tabs.html',
})
export class UserTabsPage {

  tab1Root = UserProjectPage;
  tab2Root = UserNotificationPage;
  tab3Root = UserMypagePage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public nav: Nav,
    public modalCtrl: ModalController,
    private push: Push, 
    private uniqueDeviceID: UniqueDeviceID,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabsPage');
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });


    // to initialize push notifications

    const options: PushOptions = {
      android: {
          senderID: '889490373924'
      },
      ios: {
          alert: true,
          badge: true,
          sound: true
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);
    
    pushObject.on('notification').subscribe((notification: any) => { 
      console.log('Received a notification', notification);
      console.log(JSON.stringify(notification.additionalData));
      if(notification.additionalData.foreground) {
        console.log('foreground');
        this.commonService.showBasicAlert(notification.message);
      }
      else {
        console.log('background');
      }
      this.refreshCurrentPage();
    });
    

    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      console.log(registration.registrationId);
      this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log('uuid:', uuid);
        this.userService.registerDeviceToken(uuid, registration.registrationId)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
        
      })
      .catch((error: any) => console.log(error));
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

    // 공지사항 주석
    // this.commonService.showNoticeAlert('현재 베타테스트 진행중입니다.<br>공지사항을 반드시 확인해주세요!', 
    // () => {
    //   if(!this.commonService.isDevMode) {
    //     this.openNoticePage();
    //   }
    // });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserTabsPage');
  }

  getAlarmNum() {
    return this.userService.alarmNum;
  }

  refreshCurrentPage() {
    let instance = this.appCtrl.getActiveNavs()[0].getActive().instance;
    if(instance && instance.ionViewWillEnter && !this.commonService.modalWrapperPage) {
      console.log('refreshCurrentPage');
      instance.ionViewWillEnter();
    }
  }

  openNoticePage() {
    let noticeModal = this.modalCtrl.create('ModalWrapperPage', {page: 'NoticePage'});
    noticeModal.present();
  }


}
