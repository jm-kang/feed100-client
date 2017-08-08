import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { UserHomePage } from '../user-home/user-home';
import { UserProjectPage } from '../user-project/user-project';
import { UserNewsfeedPage } from '../user-newsfeed/user-newsfeed';
import { UserMypagePage } from '../user-mypage/user-mypage';
import { UserInterviewPage } from '../user-interview/user-interview';

/**
 * Generated class for the UserTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'user-tabs.html',
})
export class UserTabsPage {

  tab1Root = UserHomePage;
  tab2Root = UserProjectPage;
  tab3Root = UserNewsfeedPage;
  tab4Root = UserMypagePage;
  tab5Root = UserInterviewPage;

  constructor() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTabsPage');
  }

}
