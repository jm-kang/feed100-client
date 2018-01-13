import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Nav } from 'ionic-angular';

import { UserHomePage } from '../user-home/user-home';
import { UserProjectPage } from '../user-project/user-project';
import { UserNewsfeedPage } from '../user-newsfeed/user-newsfeed';
import { UserMypagePage } from '../user-mypage/user-mypage';
import { UserInterviewPage } from '../user-interview/user-interview';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Badge } from '@ionic-native/badge';

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
  templateUrl: 'user-tabs.html',
})
export class UserTabsPage {
  tab1Root = UserHomePage;
  tab2Root = UserProjectPage;
  tab3Root = UserNewsfeedPage;
  tab4Root = UserInterviewPage;
  tab5Root = UserMypagePage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public nav: Nav,
    private push: Push, 
    private uniqueDeviceID: UniqueDeviceID,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  getInterviewNum() {
    return this.userService.interviewNum;
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
      this.getAlarmAndInterviewNum(notification.message);
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

  }

  getAlarmAndInterviewNum(message) {
    this.commonService.isLoadingActive = false;
    if(message == '새로운 인터뷰가 도착했습니다. 응답해주세요!') {
      if(this.userService.userProjectSideMenuPage) this.userService.userProjectSideMenuPage.ionViewDidLoad();
      if(this.userService.userProjectHomePage) this.userService.userProjectHomePage.ionViewDidLoad();
      if(this.userService.userProjectInterviewDetailPage) this.userService.userProjectInterviewDetailPage.ionViewDidLoad();
      if(this.userService.userAlarmPage) this.userService.userAlarmPage.ionViewDidLoad();
      if(this.userService.userInterviewPage) this.userService.userInterviewPage.ionViewDidLoad();
      else {
        this.userService.getAlarmAndInterviewNum()
        .subscribe(
          (data) => {
            if(data.success == true) {
              this.userService.alarmNum = data.data.alarm_num;
              this.userService.interviewNum = data.data.interview_num;
              this.badge.set(data.data.alarm_num);
            }
          },
          (err) => {
            console.log(err);
          }
        );  
      }
    }
    else {
      this.userService.getAlarmAndInterviewNum()
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.userService.alarmNum = data.data.alarm_num;
            this.userService.interviewNum = data.data.interview_num;
            this.badge.set(data.data.alarm_num);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.commonService.isLoadingActive = true;
  }
}
