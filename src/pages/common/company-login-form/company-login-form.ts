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

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyLoginFormPage');
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

    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();

    if(this.username == 'admin@feed100.me') {
      this.commonService.localLogin(this.username, this.password, 'admin')
      .finally(() => {
        loading.dismiss();
      })  
      .subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          if(data.success == true) {
            this.storage.set('accessToken', data.data.accessToken);
            this.storage.set('refreshToken', data.data.refreshToken);
            this.navCtrl.setRoot('AdminTabsPage', {}, {animate: true, direction: 'forward'});
          }
          else if(data.success == false) {
            if(data.message == 'username is unregistered') {
              this.commonService.showBasicAlert('이메일을 정확히 입력해주세요.');
            }
            else if(data.message == 'password is not correct') {
              this.commonService.showBasicAlert('비밀번호를 정확히 입력해주세요.');
            }
            else { 
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
      .finally(() => {
        loading.dismiss();
      })  
      .subscribe(
        (data) => {
          console.log(JSON.stringify(data));
          if(data.success == true) {
            this.storage.set('accessToken', data.data.accessToken);
            this.storage.set('refreshToken', data.data.refreshToken);
            this.navCtrl.setRoot('CompanyProjectHomePage', {}, {animate: true, direction: 'forward'});
          }
          else if(data.success == false) {
            if(data.message == 'username is unregistered') {
              this.commonService.showBasicAlert('이메일을 정확히 입력해주세요.');
            }
            else if(data.message == 'password is not correct') {
              this.commonService.showBasicAlert('비밀번호를 정확히 입력해주세요.');
            }
            else { 
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
