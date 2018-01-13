import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';

/**
 * Generated class for the CompanyLoginFormPage page.
 */

@IonicPage()
@Component({
  selector: 'page-company-login-form',
  templateUrl: 'company-login-form.html',
})
export class CompanyLoginFormPage {
  username: string = '';
  password: string = '';
  role: string = 'company';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public commonService: CommonServiceProvider,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyLoginFormPage');
  }

  back() {
    this.navCtrl.pop();
  }

  localLogin() {
    if(!this.username) {
      this.commonService.showBasicAlert('이메일을 입력해주세요.');
      return;
    }
    if(!this.password) {
      this.commonService.showBasicAlert('비밀번호를 입력해주세요.');
      return;
    }
    if(this.username == 'admin@feed100.me') {
      this.commonService.localLogin(this.username, this.password, 'admin')
      .subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          if(data.success == true) {
            this.storage.set('accessToken', data.data.accessToken);
            this.storage.set('refreshToken', data.data.refreshToken);
            this.navCtrl.setRoot('AdminTabsPage', {"isLogin" : true}, {animate: true, direction: 'forward'});
          }
          else if(data.success == false) {
            switch(data.message) {
              case 'username is unregistered':
                this.commonService.showBasicAlert('이메일을 정확히 입력해주세요.');
                break;
              case 'password is not correct':
                this.commonService.showBasicAlert('비밀번호를 정확히 입력해주세요.');
                break;
              default:
                this.commonService.apiRequestErrorHandler(data, this.navCtrl);
            }
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );        
    }
    else {
      this.commonService.localLogin(this.username, this.password, this.role)
      .subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          if(data.success == true) {
            this.storage.set('accessToken', data.data.accessToken);
            this.storage.set('refreshToken', data.data.refreshToken);
            this.navCtrl.setRoot('CompanyTabsPage', {"isLogin" : true}, {animate: true, direction: 'forward'});
          }
          else if(data.success == false) {
            switch(data.message) {
              case 'username is unregistered':
                this.commonService.showBasicAlert('이메일을 정확히 입력해주세요.');
                break;
              case 'password is not correct':
                this.commonService.showBasicAlert('비밀번호를 정확히 입력해주세요.');
                break;
              case 'email is not verified':
                this.commonService.showBasicAlert('이메일 인증 완료 후 다시 시도해주세요.');
                break;
              case 'warning count is over':
                this.commonService.showBasicAlert('해당 계정은 경고 3회 누적으로 인해 서비스를 이용하실 수 없습니다.');
                break;  
              default:
                this.commonService.apiRequestErrorHandler(data, this.navCtrl);
            }
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );
    }
  }

}
