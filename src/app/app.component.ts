import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/common/login/login';
import { UserTabsPage } from '../pages/user/user-tabs/user-tabs';
import { UserProjectStoryPage } from '../pages/user/user-project-story/user-project-story';
import { UserNewsfeedStoryPage } from '../pages/user/user-newsfeed-story/user-newsfeed-story';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = LoginPage;
  // rootPage:any = UserNewsfeedStoryPage;
  rootPage:any = UserTabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
