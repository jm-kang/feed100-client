import { Component } from '@angular/core';
import { Platform, App, ModalCmp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/common/login/login';
import { UserTabsPage } from '../pages/user/user-tabs/user-tabs';
import { CompanyTabsPage } from '../pages/company/company-tabs/company-tabs';
import { UserProjectStoryPage } from '../pages/user/user-project-story/user-project-story';
import { UserNewsfeedStoryPage } from '../pages/user/user-newsfeed-story/user-newsfeed-story';
import { UserConfigurePage } from '../pages/user/user-configure/user-configure';
import { UserProjectHomePage } from '../pages/user/user-project-home/user-project-home';
import { UserProjectFeedbackPage } from '../pages/user/user-project-feedback/user-project-feedback';
import { UserProjectInterviewDetailPage } from '../pages/user/user-project-interview-detail/user-project-interview-detail'
import { UserProjectRewardFormPage } from '../pages/user/user-project-reward-form/user-project-reward-form'

import { CompanyProjectHomePage } from '../pages/company/company-project-home/company-project-home';
import { CompanyProjectFeedbackPage } from '../pages/company/company-project-feedback/company-project-feedback';
import { CompanyProjectStoryPage } from '../pages/company/company-project-story/company-project-story';
import { CompanyNewsfeedStoryPage } from '../pages/company/company-newsfeed-story/company-newsfeed-story';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { CommonServiceProvider } from '../providers/common-service/common-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  // rootPage:any = ModalPage;
  // rootPage:any = UserTabsPage;
  // rootPage:any = UserProjectInterviewDetailPage;
  // rootPage:any = UserProjectFeedbackPage;
  // rootPage:any = UserProjectHomePage;
  // rootPage:any = CompanyTabsPage;
  // rootPage:any = CompanyProjectHomePage;
  // rootPage:any = UserProjectRewardFormPage;
  // rootPage:any = CompanyNewsfeedStoryPage;


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
            this.commonService.showBasicAlert('자동 로그인 되었습니다.');
          }
          else if(data.data.role == 'company') {
            this.rootPage = CompanyTabsPage;
            this.commonService.showBasicAlert('자동 로그인 되었습니다.');
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
