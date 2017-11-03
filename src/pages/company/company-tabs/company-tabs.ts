import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Nav } from 'ionic-angular';

import { CompanyHomePage } from '../company-home/company-home';
import { CompanyProjectPage } from '../company-project/company-project';
import { CompanyNewsfeedPage } from '../company-newsfeed/company-newsfeed';
import { CompanyMypagePage } from '../company-mypage/company-mypage';
import { CompanyInterviewPage } from '../company-interview/company-interview';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'company-tabs.html',
})
export class CompanyTabsPage {

  tab1Root = CompanyHomePage;
  tab2Root = CompanyProjectPage;
  tab3Root = CompanyNewsfeedPage;
  tab4Root = CompanyInterviewPage;
  tab5Root = CompanyMypagePage;

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    private push: Push,
    private uniqueDeviceId: UniqueDeviceID,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider,
    public nav: Nav) {

  }

  getInterviewNum() {
    return this.companyService.interviewNum;
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter CompanyTabsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyTabsPage');
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
        this.uniqueDeviceId.get()
        .then((uuid: any) => {
          console.log('uuid:', uuid);
          this.companyService.registerDeviceToken(uuid, registration.registrationId)
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
