import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, NavParams, ModalController } from 'ionic-angular';

import { CompanyLoginFormPage } from '../company-login-form/company-login-form';
import { CompanyInterviewPage } from '../../company/company-interview/company-interview';

import { UserLoginFormPage } from '../user-login-form/user-login-form';
import { RegistrationPage } from '../registration/registration';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Slides) childSlides: Slides;
  loginSlides = [
    {
      loginBg: 'assets/img/login-bg0.png',
      loginTopImg: 'assets/img/logo.png',
      title: '',
      content: 'FEED100은 정성적 데이터를 통해 아이디어<br>검증 및 시장 분석에 도움을 주는 서비스입니다.'
    },
    {
      loginBg: 'assets/img/login-bg1.png',
      loginTopImg: 'assets/img/login-top-img1.png',
      title: '신뢰할 수 있는 피드백',
      content: '실제로 사용해 본 테스터들의 피드백으로<br>원하는 답변과 놓친 부분을 알려주는 서비스입니다.'
    },
    {
      loginBg: 'assets/img/login-bg2.png',
      loginTopImg: 'assets/img/login-top-img2.png',
      title: '빠르게 살펴보는 결과',
      content: 'Dashboard를 이용해보세요.<br>다양한 정보를 관리하고 한눈에 찾을 수 있습니다.'
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openCompanyLoginFormPage() {
    this.navCtrl.push(CompanyLoginFormPage);
  }

  openUserLoginFormPage() {
    this.navCtrl.push(UserLoginFormPage);
  }

  openRegistrationPage() {
    // this.modalCtrl.create(RegistrationPage).present();
    this.navCtrl.push(RegistrationPage);
  }
}
