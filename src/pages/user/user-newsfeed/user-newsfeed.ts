import { Component, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { UserNewsfeedStoryPage } from '../user-newsfeed-story/user-newsfeed-story';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

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
    public httpService: HttpServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserNewsfeedPage');
    let loading = this.httpService.presentLoading();

    this.httpService.getNewsfeeds()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.newsfeeds = data.data;
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          })
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.httpService.showBasicAlert('오류가 발생했습니다.')
      }
    )
  }

  openUserNewsfeedStoryPage(newsfeed_id) {
    this.appCtrl.getRootNav().push(UserNewsfeedStoryPage, { "newsfeed_id" : newsfeed_id });
  }

}
