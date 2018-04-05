import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

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
  totalPoint: number = 20000;
  minExchangePoint: number = 10000;
  banks = ['경남은행','광주은행','국민은행','기업은행','농협중앙회','대구은행','부산은행','산업은행','서울은행','수협','시티은행','신한은행','신협','우리은행','우체국','시티은행','전북은행','SC','제주은행','하나은행','새마을금고'];
  exchangePoints = [10000, 20000, 30000, 40000, 50000];
  exchangePoint: number;
  bankName: String = "";
  accountNumber: number;
  accountHolderName: String = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPointExchangePage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserPointExchangePage');
    // let loading = this.commonService.presentLoading();
    
    // this.userService.getUserInfo()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.totalPoint = data.data.point;
    //     }
    //     else if(data.success == false) {
    //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewWillEnter();
    //       });
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.commonService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );
  }

  back() {
    this.navCtrl.pop();
  }
  
  exchange() {
    let alertString = '입금 은행 : ' + this.bankName + '<br>계좌번호 : ' + this.accountNumber + '<br>예금주 : ' + this.accountHolderName + '<br>요청 금액 : ' + this.exchangePoint + '원<br><br><small>정확하게 입력하셨나요?<br>잘못 기입된 정보에 대한 책임은 본인에게 있습니다.</small>';
    this.commonService.showConfirmAlert(alertString, 
    () => {
      this.commonService.isLoadingActive = true;
      let loading = this.commonService.presentLoading();
      
      this.userService.pointExchange(this.exchangePoint, this.bankName, this.accountNumber, this.accountHolderName)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.ionViewWillEnter();
            this.commonService.showBasicAlert('신청되었습니다.');
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
            });
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );    
    });
  }
}
