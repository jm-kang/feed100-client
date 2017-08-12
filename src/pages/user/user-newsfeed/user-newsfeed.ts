import { Component, ViewContainerRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserNewsfeedStoryPage } from '../user-newsfeed-story/user-newsfeed-story';

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
  endScroll:boolean = true;

  newsfeeds = [];

  mockNewsfeeds = [
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image1.png',
      newsfeedName: 'Singled [Out] : 선택의 시대에 싱글 여성에 관한 영화',
    },
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image2.png',
      newsfeedName: '무연 커피 소다 | 운전 가능',
    },
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image3.png',
      newsfeedName: '레오나르도 다빈치, 베르메르 & 렘브란트 액션 피규어',
    },
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image4.png',
      newsfeedName: '백색 방랑자 : 기후 변화 사운드 트랙',
    },
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image5.png',
      newsfeedName: 'Salem Cinema의 디지털 프로젝션 업그레이드 챌린지',
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // if(this.mockNewsfeeds.length < 11) {
    //   for (let i = 0; i < this.mockNewsfeeds.length; i++) {
    //     this.newsfeeds.push( this.mockNewsfeeds[i] );
    //   }

    //   if(this.newsfeeds.length == this.mockNewsfeeds.length) {
    //     this.endScroll = false;
    //   }
    // } else {
    //   for (let i = 0; i < 10; i++) {
    //     this.newsfeeds.push( this.mockNewsfeeds[i] );
    //   }
    // }
    // console.log('constructor');
    for (let i = 0; i < 5; i++) {
      this.newsfeeds.push( this.mockNewsfeeds[i] );
    }
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      let originalnewsfeedsLength = this.newsfeeds.length;
      for (let i = originalnewsfeedsLength; i < originalnewsfeedsLength + 4; i++) {
        if(i < this.mockNewsfeeds.length) {
          this.newsfeeds.push( this.mockNewsfeeds[i] );
        }
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();

      if(this.newsfeeds.length == this.mockNewsfeeds.length) {
        this.endScroll = false;
      }
    }, 500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserNewsfeedPage');
  }

  openUserNewsfeedStoryPage() {
    this.navCtrl.push(UserNewsfeedStoryPage);
  }

}
