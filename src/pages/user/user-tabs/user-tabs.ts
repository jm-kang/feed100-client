
import { Component, NgZone } from '@angular/core';
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
    public zone: NgZone,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabsPage');
    this.verifyUserProfileAndTutorial();

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
        this.refreshCurrentPage();
      }
      else {
        console.log('background');
        if(notification.additionalData.project_id) {
          if(!notification.additionalData.coldstart) { // 새로고침 아닐 시
            this.zone.run(() => {
              console.log('cold');
              this.commonService.dismissAllModal();
              this.appCtrl.getRootNavs()[0].setRoot('UserTabsPage');
            }); 
          }
          this.userService.accessProject(this, notification.additionalData.project_id);
        }
      }
      this.commonService.showToast(notification.message);      
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
    console.log(this.commonService.getDevice().isVirtual);
    console.log(this.commonService.getDevice().manufacturer);
    console.log(this.commonService.getDevice().model);
    console.log(this.commonService.getDevice().platform);
    console.log(this.commonService.getDevice().serial);
    console.log(this.commonService.getDevice().uuid);
    console.log(this.commonService.getDevice().version);
  }

  verifyUserProfileAndTutorial() {
    this.userService.getUserInfo()
    .subscribe(
      (data) => {
        if(data.success == true) {
          // 프로필 등록 안한 경우
          if(!data.data.gender || !data.data.age || !data.data.job || !data.data.region || !data.data.marriage || !data.data.interests) {
            this.openUserProfileModificationFormPage();
          }
          // 튜토리얼 안한 경우
          else if(!data.data.is_tutorial_completed) {
            this.openUserTutorialPage();
          }
        }
        else if(data.success == false) {
          this.commonService.showBasicAlert('오류가 발생했습니다.');
          this.commonService.logout(this.navCtrl);
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
        this.commonService.logout(this.navCtrl);
      }
    )
  }

  getNotificationNum() {
    return this.userService.notificationNum;
  }

  refreshCurrentPage() {
    let instance = this.appCtrl.getActiveNavs()[0].getActive().instance;
    if(instance && instance.ionViewWillEnter && !this.commonService.modalWrapperPages.length) {
      console.log('refreshCurrentPage');
      instance.ionViewWillEnter();
    }
  }

  openNoticePage() {
    let noticeModal = this.modalCtrl.create('ModalWrapperPage', {page: 'NoticePage'});
    noticeModal.present();
  }

  openUserProfileModificationFormPage() {
    this.navCtrl.setRoot('UserProfileModificationFormPage');
  }

  openUserTutorialPage() {
    this.navCtrl.setRoot('UserTutorialPage');
  }

}
