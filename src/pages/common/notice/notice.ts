import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { ModalWrapperPage } from './../modal-wrapper/modal-wrapper';

import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

declare var cordova:any;

/**
 * Generated class for the NoticePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {
  @ViewChild("contentRef") contentHandle: Content;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  notices = [
    {
      title: "문의사항 및 요청사항은 언제든지 환영합니다!",
      subTitle: "",
      topImg: "",
      content: '안녕하세요 FEED100 회원 여러분!!<br><br>FEED100은 회원님들에게 가장 좋은 환경을 제공하고자 꾸준하게 업데이트를 해 왔습니다. 현재도 더 나은 사용자 경험과 컨텐츠를 제공하기 위해 노력 중입니다.<br><br>FEED100을 사용하는 동안 부족하고 모자란 부분을 발견하신다면 언제든지 알려주세요! FEED100 운영팀, 개발팀, 컨텐츠 제작팀은 모두 회원 여러분들의 소중한 의견을 기다리고 있습니다. 문의 및 요청사항은 <ins>feed100.help@gmail.com</ins> 으로 연락주시면 최대한 빠르고 친절하게 답변 드리겠습니다.<br><br>FEED100은 언제나 회원님들의 아이디어, 충고, 불만에 귀 기울입니다. 회원님들이 가진 궁금한 점, 건의사항, 또는 번뜩이는 아이디어는 대한민국의 최고의 피드백 서비스를 위한 좋은 밑거름이 될 수 있습니다.<br><br>감사합니다. FEED100팀 드림',
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');
  }

  ionViewDidEnter() {
    console.log('enter');
  }
  
  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      for(let i=0; i<this.notices.length; i++) {
        if(this.notices[i].icon == 'ios-remove-circle-outline') {
          this.notices[i].showDetails = false;
          this.notices[i].icon = 'ios-add-circle-outline';
        }
      }
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }

  panEnd() {
    if(this.contentHandle.scrollTop <= -90) {
      console.log('pan: ' + this.lastBgV);
      document.querySelector(".help-page-content .scroll-content")['style'].background = 'transparent';
      this.dismiss();
    }
  }

  scrollingEvent($e) {
    var stepV = $e.scrollTop /10 ;
    this.scrollVert = this.lastScrollV - stepV ;
    if (this.scrollVert < 0) {
       this.scrollVert = 0 ;
    } else {
       if (this.scrollVert > 100)
          this.scrollVert = 100 ;
    }
    if(this.scrollVert < 20) {
      // this.transparentPercent = 1 - (this.scrollVert /20);
      // document.querySelector(".help-page-content .scroll-content")['style'].background = 'rgba(0,0,0,'+this.transparentPercent+')';
    }
  }
}
