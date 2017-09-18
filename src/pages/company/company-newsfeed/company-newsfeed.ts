import { Component, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CompanyNewsfeedStoryPage } from '../company-newsfeed-story/company-newsfeed-story';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the CompanyNewsfeedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-newsfeed',
  templateUrl: 'company-newsfeed.html',
})
export class CompanyNewsfeedPage {

  newsfeeds = [
    {
      newsfeed_id:1,
      newsfeed_main_image: 'assets/img/newsfeed-main-image1.png',
      newsfeed_name: '뉴스피드 이름 뉴스피드 이름 뉴스피드 이름',
    },
    {
      newsfeed_id:2,
      newsfeed_main_image: 'assets/img/newsfeed-main-image2.png',
      newsfeed_name: '뉴스피드 이름2',
    },
    {
      newsfeed_id:3,
      newsfeed_main_image: 'assets/img/newsfeed-main-image3.png',
      newsfeed_name: '뉴스피드 이름3 뉴스피드 이름3 뉴스피드 이름3 뉴스피드 이름3 뉴스피드 이름3',
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public httpService: HttpServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyNewsfeedPage');
    // let loading = this.httpService.presentLoading();

    // this.httpService.getNewsfeeds()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.newsfeeds = data.data;
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidLoad();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(JSON.stringify(err));
    //     this.httpService.showBasicAlert('오류가 발생했습니다.')
    //   }
    // )
  }

  openCompanyNewsfeedStoryPage(newsfeed_id) {
    this.appCtrl.getRootNav().push(CompanyNewsfeedStoryPage, { "newsfeed_id" : newsfeed_id });
  }


}
