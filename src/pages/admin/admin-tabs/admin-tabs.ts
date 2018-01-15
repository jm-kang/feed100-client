import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Nav } from 'ionic-angular';

import { AdminHomePage } from '../admin-home/admin-home';
import { AdminProjectPage } from '../admin-project/admin-project';
import { AdminNewsfeedPage } from '../admin-newsfeed/admin-newsfeed';
import { AdminMypagePage } from '../admin-mypage/admin-mypage';
import { AdminInterviewPage } from '../admin-interview/admin-interview';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'admin-tabs.html',
})
export class AdminTabsPage {

  tab1Root = AdminHomePage;
  tab2Root = AdminProjectPage;
  tab3Root = AdminNewsfeedPage;
  tab4Root = AdminInterviewPage;
  tab5Root = AdminMypagePage;

  constructor(
    public navCtrl: NavController,
    public appCtrl: App,
    public navParams: NavParams,
    private push: Push,
    private uniqueDeviceId: UniqueDeviceID,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider,
    public nav: Nav) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminTabsPage');
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
      this.refreshCurrentPage();      
    });


    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      console.log(registration.registrationId);
      this.uniqueDeviceId.get()
      .then((uuid: any) => {
        console.log('uuid:', uuid);
        this.adminService.registerDeviceToken(uuid, registration.registrationId)
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

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminTabsPage');
  }

  getInterviewNum() {
    return this.adminService.interviewNum;
  }

  refreshCurrentPage() {
    let instance = this.appCtrl.getActiveNavs()[0].getActive().instance;
    if(instance && instance.ionViewWillEnter && !this.commonService.modalWrapperPage) {
      console.log('refreshCurrentPage');
      instance.ionViewWillEnter();
    }
  }

}
