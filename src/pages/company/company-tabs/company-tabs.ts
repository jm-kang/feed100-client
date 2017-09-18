import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CompanyAlarmPage } from '../company-alarm/company-alarm';
import { CompanyConfigurePage } from '../company-configure/company-configure';
import { CompanyHomePage } from '../company-home/company-home';
import { CompanyProjectPage } from '../company-project/company-project';
import { CompanyNewsfeedPage } from '../company-newsfeed/company-newsfeed';
import { CompanyMypagePage } from '../company-mypage/company-mypage';
import { CompanyInterviewPage } from '../company-interview/company-interview';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

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
    public navParams: NavParams,
    private push: Push,
    private uniqueDeviceId: UniqueDeviceID,
    public httpService: HttpServiceProvider) {

  }

  getAlarmNum() {
    return this.httpService.alarmNum;
  }

  getInterviewNum() {
    return this.httpService.interviewNum;
  }

  ionViewDidEnter() {
    // console.log('ionViewDidEnter UserTabsPage');
    // let loading = this.httpService.presentLoading();

    // this.httpService.getAlarmAndInterviewNum()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.httpService.alarmNum = data.data.alarm_num;
    //       this.httpService.interviewNum = data.data.interview_num;
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidEnter();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CompanyTabsPage');
    // let isLogin = this.navParams.get('isLogin');
    // if(isLogin) {
    //         // to check if we have permission
    //   this.push.hasPermission()
    //     .then((res: any) => {
    //       if (res.isEnabled) {
    //         console.log('We have permission to send push notifications');
    //       } else {
    //         console.log('We do not have permission to send push notifications');
    //       }
    //     });


    //   // to initialize push notifications

    //   const options: PushOptions = {
    //     android: {
    //         senderID: '889490373924'
    //     },
    //     ios: {
    //         alert: true,
    //         badge: true,
    //         sound: true,
    //         clearBadge: true
    //     },
    //     windows: {}
    //   };

    //   const pushObject: PushObject = this.push.init(options);
  
    //   pushObject.on('notification').subscribe((notification: any) => { 
    //     console.log('Received a notification', notification);
    //     if(notification.additionalData.foreground) {
    //       this.httpService.showBasicAlert(notification.message);
    //     }
    //   });
      

    //   pushObject.on('registration').subscribe((registration: any) => {
    //     console.log('Device registered', registration);
    //     console.log(registration.registrationId);
    //     this.uniqueDeviceId.get()
    //     .then((uuid: any) => {
    //       console.log('uuid:', uuid);
    //       this.httpService.registerDeviceToken(uuid, registration.registrationId)
    //       .subscribe(
    //         (data) => {
    //           console.log(data);
    //           this.httpService.showBasicAlert('device token 등록 성공');
    //         },
    //         (err) => {
    //           console.log(err);
    //           this.httpService.showBasicAlert('device token 등록 실패');
    //         }
    //       );
          
    //     })
    //     .catch((error: any) => console.log(error));
    //   });

    //   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

      
    
    // }
  }


  openUserAlarmPage() {
    this.navCtrl.push(CompanyAlarmPage);
  }

  openUserConfigurePage() {
    this.navCtrl.push(CompanyConfigurePage);
  }

}
