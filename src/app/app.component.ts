import { Component } from '@angular/core';
import { Platform, App, ModalCmp, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/common/login/login';
import { UserTabsPage } from '../pages/user/user-tabs/user-tabs';
import { CompanyTabsPage } from '../pages/company/company-tabs/company-tabs';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { CommonServiceProvider } from '../providers/common-service/common-service';

import { UserProjectReportFormPage } from '../pages/user/user-project-report-form/user-project-report-form';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  // rootPage:any = UserProjectReportFormPage;

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

      let isAppIntroChecked = localStorage.getItem('isAppIntroChecked');
      if (!isAppIntroChecked) {
        this.openAppIntroPage();
        localStorage.setItem('isAppIntroChecked', 'true');
      }
    });
  }

  verifyLoginState() {
    this.userService.getUserInfo()
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.role == 'user') {
            this.rootPage = UserTabsPage;
          }
          else if(data.data.role == 'company') {
            this.rootPage = CompanyTabsPage;
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.app.getActiveNav())
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
