import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';

import { ModalWrapperPage } from './../modal-wrapper/modal-wrapper';

/**
 * Generated class for the AppIntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-intro',
  templateUrl: 'app-intro.html',
})
export class AppIntroPage {
  @ViewChild('slider') slider: Slides;
  slideIndex = 0;
  slides = [
    {
      title: '잘 쓴 피드백 하나<br>열 설문조사 안 부럽다!',
      imageUrl: 'assets/img/appintro1.png',
      description: '소중한 의견이 모여 더 나은 서비스를 만듭니다.',
    },
    {
      title: '서비스를 소개하고<br>잠재 고객과 소통하세요!',
      imageUrl: 'assets/img/appintro2.png',
      description: 'FEED100으로 서비스를<br>더 나은 방향으로 발전시켜보세요!',
    },
    {
      title: '다양한 서비스를<br>경험하고 피드백 해주세요!',
      imageUrl: 'assets/img/appintro3.png',
      description: '프로젝트에서 피드백과 인터뷰로<br><strong>포인트</strong>를 쌓아보세요!',
    },
    {
      title: 'FEED100<br>지금 사용해 보세요!',
      imageUrl: 'assets/img/appintro4.png',
      description: '새로운 서비스들을 지금 바로 만나보세요!',
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppIntroPage');
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.slideIndex);
  }

  goToApp() {
    this.dismiss();
  }

  skip() {
    this.dismiss();
  }

}
