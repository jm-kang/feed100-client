import { Component, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { UserNewsfeedStoryPage } from '../user-newsfeed-story/user-newsfeed-story';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserNewsfeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-newsfeed',
  templateUrl: 'user-newsfeed.html',
})
export class UserNewsfeedPage {

  newsfeeds = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserNewsfeedPage');
    let loading = this.commonService.presentLoading();

    this.userService.getNewsfeeds()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.newsfeeds = data.data;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          })
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.commonService.showBasicAlert('오류가 발생했습니다.')
      }
    )
  }

  openUserNewsfeedStoryPage(newsfeed_id) {
    this.appCtrl.getRootNav().push(UserNewsfeedStoryPage, { "newsfeed_id" : newsfeed_id });
  }

}
