import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

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

  getInterviewNum() {
    return this.userService.interviewNum;
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter UserTabsPage');
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
        }
        else {
          console.log('background');
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
  }  

}
