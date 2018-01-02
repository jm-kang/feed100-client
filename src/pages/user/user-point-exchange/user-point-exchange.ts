import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the UserPointExchangePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-point-exchange',
  templateUrl: 'user-point-exchange.html',
})
export class UserPointExchangePage {

  totalPoint: number = 22000;
  minExchangePoint: number = 10000;
  minExchangeDay: number = 3;
  name: String = "";
  bankName: String = "";
  banks = ['경남은행','광주은행','국민은행','기업은행','농협중앙회','대구은행','부산은행','산업은행','서울은행','수협','시티은행','신한은행','신협','우리은행','우체국','시티은행','전북은행','SC','제주은행','하나은행','새마을금고'];
  accountNumber: number;
  exchangePoint: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public emailComposer: EmailComposer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPointExchangePage');
  }

  back() {
    this.navCtrl.pop();
  }
  
  sendEmail() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: 'feed100.help@gmail.com',
       subject: '[포인트 환전 문의]',
       body: '<br>아이디: <br>이름: <br>문의 내용: <br>은행명: <br>계좌번호: <br><br>- FEED100 Version: 1.0.0',
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
  }

  selectOptions = {
    title: '은행명'
  }

  exchange() {
    // 환전 버튼
    this.navCtrl.pop();
  }
}
