import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  minExchangeDay: number = 15;
  name: String = "";
  bankName: String = "";
  banks = ['경남은행','광주은행','국민은행','기업은행','농협중앙회','대구은행','부산은행','산업은행','서울은행','수협','시티은행','신한은행','신협','우리은행','우체국','시티은행','전북은행','SC','제주은행','하나은행','새마을금고'];
  accountNumber: number;
  exchangePoint: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPointExchangePage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserPointExchangePage');
  }

  back() {
    this.navCtrl.pop();
  }
  
  exchange() {
    // 환전 버튼
    this.navCtrl.pop();
  }
}
