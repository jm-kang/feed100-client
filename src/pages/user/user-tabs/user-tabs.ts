import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserAlarmPage } from '../user-alarm/user-alarm';
import { UserConfigurePage } from '../user-configure/user-configure';
import { UserHomePage } from '../user-home/user-home';
import { UserProjectPage } from '../user-project/user-project';
import { UserNewsfeedPage } from '../user-newsfeed/user-newsfeed';
import { UserMypagePage } from '../user-mypage/user-mypage';
import { UserInterviewPage } from '../user-interview/user-interview';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

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
  alarmNum: number = 5;
  isInterview: number = 2;

  tab1Root = UserHomePage;
  tab2Root = UserProjectPage;
  tab3Root = UserNewsfeedPage;
  tab4Root = UserInterviewPage;
  tab5Root = UserMypagePage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private push: Push, 
    private uniqueDeviceID: UniqueDeviceID,
    public httpSerivce: HttpServiceProvider) {
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
            sound: true,
            clearBadge: true
        },
        windows: {}
      };

      const pushObject: PushObject = this.push.init(options);
  
      pushObject.on('notification').subscribe((notification: any) => { 
        console.log('Received a notification', notification);
        if(notification.additionalData.foreground) {
          this.httpSerivce.showBasicAlert(notification.message);
        }
      });
      

      pushObject.on('registration').subscribe((registration: any) => {
        console.log('Device registered', registration);
        console.log(registration.registrationId);
        this.uniqueDeviceID.get()
        .then((uuid: any) => {
          console.log('uuid:', uuid);
          this.httpSerivce.registerDeviceToken(uuid, registration.registrationId)
          .subscribe(
            (data) => {
              console.log(data);
              this.httpSerivce.showBasicAlert('device token 등록 성공');
            },
            (err) => {
              console.log(err);
              this.httpSerivce.showBasicAlert('device token 등록 실패');
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
