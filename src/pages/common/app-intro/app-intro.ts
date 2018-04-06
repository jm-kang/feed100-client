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
      title: '잘 쓴 FEED100 하나<br>열 설문조사 안 부럽다!',
      imageUrl: 'assets/img/appintro1.png',
      description: '소중한 의견이 모여 더 나은 서비스를 만듭니다.',
    },
    {
      title: '원하는 고객과<br>직접 인터뷰를!',
      imageUrl: 'assets/img/appintro2.png',
      description: '고객과 직접 소통하며<br>고객이 진짜 원하는 것을 찾으세요!',
    },
    {
      title: '포인트가 쭉쭉~<br>현금으로 환전까지!',
      imageUrl: 'assets/img/appintro3.png',
      description: '다양한 서비스를 경험하고<br>소중한 피드백을 들려주세요!',
    },
    {
      title: '스타트업에 적합한<br>고객반응조사 플랫폼',
      imageUrl: 'assets/img/appintro4.png',
      description: '가치를 같이 만들어가는<br>맞춤형 피드백 플랫폼!',
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppIntroPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AppIntroPage');
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
