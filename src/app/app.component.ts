import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/common/login/login';
import { UserTabsPage } from '../pages/user/user-tabs/user-tabs';
import { CompanyTabsPage } from '../pages/company/company-tabs/company-tabs';
import { UserProjectStoryPage } from '../pages/user/user-project-story/user-project-story';
import { UserNewsfeedStoryPage } from '../pages/user/user-newsfeed-story/user-newsfeed-story';
import { UserConfigurePage } from '../pages/user/user-configure/user-configure';
import { HttpServiceProvider } from '../providers/http-service/http-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  // rootPage:any = UserConfigurePage;
  // rootPage:any = UserNewsfeedStoryPage;
  // rootPage:any = UserTabsPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    public httpService: HttpServiceProvider,
    public app: App) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.verifyLoginState();
    });
  }

  verifyLoginState() {
    this.httpService.getUserInfo()
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.role == 'user') {
            this.rootPage = UserTabsPage;
            this.httpService.showBasicAlert('자동 로그인 되었습니다.');
          }
          else if(data.data.role == 'company') {
            this.rootPage = CompanyTabsPage;
            this.httpService.showBasicAlert('자동 로그인 되었습니다.');
          }
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.app.getActiveNav())
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
