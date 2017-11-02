import { Component } from '@angular/core';
import { Platform, App, ModalCmp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/common/login/login';
import { UserTabsPage } from '../pages/user/user-tabs/user-tabs';
import { CompanyTabsPage } from '../pages/company/company-tabs/company-tabs';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { CommonServiceProvider } from '../providers/common-service/common-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    keyboard: Keyboard,
    screenOrientation: ScreenOrientation,
    public userService: UserServiceProvider,
    public commonService: CommonServiceProvider,
    public app: App
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.verifyLoginState();
      keyboard.disableScroll(true);
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
      ModalCmp.prototype._viewWillEnter = () => {};
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
            this.verifyLoginState();
          })
        }
      },
      (err) => {
        this.rootPage = LoginPage;
      }
    )

  }
}
