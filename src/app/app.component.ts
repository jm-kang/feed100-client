import { UserProjectInterviewFormPage } from './../pages/user/user-project-interview-form/user-project-interview-form';
import { Component } from '@angular/core';
import { Platform, App, ModalCmp, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/common/login/login';
import { UserTabsPage } from '../pages/user/user-tabs/user-tabs';
import { CompanyProjectHomePage } from '../pages/company/company-project-home/company-project-home';
import { AdminTabsPage } from '../pages/admin/admin-tabs/admin-tabs';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { CommonServiceProvider } from '../providers/common-service/common-service';

import { UserProjectHomePage } from '../pages/user/user-project-home/user-project-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = UserProjectHomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    keyboard: Keyboard,
    screenOrientation: ScreenOrientation,
    public userService: UserServiceProvider,
    public commonService: CommonServiceProvider,
    public app: App,
    public modalCtrl: ModalController
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.verifyLoginState();
      // keyboard.disableScroll(true);
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
      ModalCmp.prototype._viewWillEnter = () => {};

      setTimeout(() => {
        let isAppIntroChecked = localStorage.getItem('isAppIntroChecked');
        if (!isAppIntroChecked) {
          this.openAppIntroPage();
          localStorage.setItem('isAppIntroChecked', 'true');
        }
      }, 1000);
    });
  }

  verifyLoginState() {
    this.userService.getUserInfo()
    .subscribe(
      (data) => {
        if(data.success == true) {
          console.log(data.data.is_verified, data.data.role, data.data.warn_count);
          if(data.data.warn_count >= 3) {
            this.commonService.logout(this.app.getActiveNavs()[0]);
            this.commonService.showBasicAlert('해당 계정은 경고 3회 누적으로 인해 서비스를 이용하실 수 없습니다.');
          }
          else if(data.data.role == 'user') {
            this.rootPage = UserTabsPage;
          }
          else if(data.data.role == 'company') {
            this.rootPage = CompanyProjectHomePage;
          }
          else if(data.data.role == 'admin') {
            this.rootPage = AdminTabsPage;
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.app.getActiveNavs()[0])
          .then(() => {
            console.log('apiRequestErrorHandler');
            this.verifyLoginState();
          })
        }
      },
      (err) => {
        this.rootPage = LoginPage;
      }
    )

  }

  openAppIntroPage() {
    let appIntroModal = this.modalCtrl.create('ModalWrapperPage', {page: 'AppIntroPage'});
    appIntroModal.present();
  }
}
