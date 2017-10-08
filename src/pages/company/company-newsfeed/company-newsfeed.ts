import { Component, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CompanyNewsfeedStoryPage } from '../company-newsfeed-story/company-newsfeed-story';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
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

  newsfeeds = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyNewsfeedPage');
    let loading = this.commonService.presentLoading();

    this.companyService.getNewsfeeds()
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
            this.ionViewWillEnter();
          })
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.commonService.showBasicAlert('오류가 발생했습니다.')
      }
    )
  }

  openCompanyNewsfeedStoryPage(newsfeed_id) {
    this.appCtrl.getRootNav().push(CompanyNewsfeedStoryPage, { "newsfeed_id" : newsfeed_id });
  }


}
