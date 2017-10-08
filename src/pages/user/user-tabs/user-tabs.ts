import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { UserAlarmPage } from '../user-alarm/user-alarm';
import { UserConfigurePage } from '../user-configure/user-configure';
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
    private push: Push, 
    private uniqueDeviceID: UniqueDeviceID,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  getAlarmNum() {
    return this.userService.alarmNum;
  }

  getInterviewNum() {
    return this.userService.interviewNum;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserTabsPage');
    // let loading = this.commonService.presentLoading();

    this.userService.getAlarmAndInterviewNum()
    .finally(() => {
      // loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.userService.alarmNum = data.data.alarm_num;
          this.userService.interviewNum = data.data.interview_num;
          this.badge.set(data.data.alarm_num);
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

  ionViewDidEnter() {
    console.log('ionViewDidEnter UserTabsPage');
    console.log(this.appCtrl.getActiveNavs()[0].getType());
    if(this.appCtrl.getActiveNavs()[0].getType() == 'tab') {
      let activeView = this.appCtrl.getActiveNavs()[0].getActive();
      console.log(activeView.name);
      switch(activeView.name) {
        case 'UserInterviewPage':
          activeView.instance.ionViewWillEnter();
          break;
        case 'UserMypagePage':
          activeView.instance.ionViewWillEnter();
          break;
      }
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabsPage');
    let isLogin = this.navParams.get('isLogin');
    if(isLogin) {
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
          this.ionViewWillEnter();
        }
        else {
          console.log('background');
          this.ionViewWillEnter();
        }
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
              this.commonService.showBasicAlert('device token 등록 성공');
            },
            (err) => {
              console.log(err);
              this.commonService.showBasicAlert('device token 등록 실패');
            }
          );
          
        })
        .catch((error: any) => console.log(error));
      });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

      
    
    }
  }

  openUserAlarmPage() {
    this.navCtrl.push(UserAlarmPage);
  }

  openUserConfigurePage() {
    this.navCtrl.push(UserConfigurePage);
  }
  

}
