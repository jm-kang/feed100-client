import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, NavParams } from 'ionic-angular';

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
      content: '가치를 같이 만들어가요!<br>유저가 원하는 가치가 무엇인지!<br>기업의 서비스를 더욱 가치있게!'
    },
    {
      loginBg: 'assets/img/login-bg1.png',
      loginTopImg: 'assets/img/login-top-img1.png',
      title: '',
      content: '의견을 말하고 포인트를 쌓자!<br>당신의 소중한 피드백을 들려주세요~!.'
    },
    {
      loginBg: 'assets/img/login-bg2.png',
      loginTopImg: 'assets/img/login-top-img2.png',
      title: '',
      content: '원하는 고객에게 직접 묻고 직접 듣자!<br>맞춤형 피드백 플랫폼 FEED100'
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter LoginPage');
  }

  openCompanyLoginFormPage() {
    this.navCtrl.push('CompanyLoginFormPage');
  }

  openUserLoginFormPage() {
    this.navCtrl.push('UserLoginFormPage');
  }

  openRegistrationPage() {
    this.navCtrl.push('RegistrationPage');
  }
}
