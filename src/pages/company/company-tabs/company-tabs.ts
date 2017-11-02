import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Nav } from 'ionic-angular';

import { CompanyAlarmPage } from '../company-alarm/company-alarm';
import { CompanyConfigurePage } from '../company-configure/company-configure';
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

  getAlarmNum() {
    return this.companyService.alarmNum;
  }

  getInterviewNum() {
    return this.companyService.interviewNum;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyTabsPage');
    // let loading = this.commonService.presentLoading();

    this.companyService.getAlarmAndInterviewNum()
    .finally(() => {
      // loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.companyService.alarmNum = data.data.alarm_num;
          this.companyService.interviewNum = data.data.interview_num;
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
    console.log('ionViewDidEnter CompanyTabsPage');
    console.log(this.appCtrl.getActiveNavs()[0].getType());
    if(this.appCtrl.getActiveNavs()[0].getType() == 'tab') {
      let activeView = this.appCtrl.getActiveNavs()[0].getActive();
      console.log(activeView.name);
      switch(activeView.name) {
        case 'CompanyInterviewPage':
          activeView.instance.ionViewWillEnter();
          break;
        case 'CompanyMypagePage':
          activeView.instance.ionViewWillEnter();
          break;
      }
    }

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


  // openCompanyAlarmPage() {
  //   // this.navCtrl.push(CompanyAlarmPage);
  //   this.appCtrl.getActiveNav().push(CompanyAlarmPage);
  // }

  // openCompanyConfigurePage() {
  //   // this.navCtrl.push(CompanyConfigurePage);
  //   this.nav.push(CompanyConfigurePage);
  // }

}
