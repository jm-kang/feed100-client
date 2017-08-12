import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { CompanyTabsPage } from '../../company/company-tabs/company-tabs';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';

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
    public httpService: HttpServiceProvider,
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
      this.showBasicAlert('이메일을 입력해주세요.');
      return;
    }
    if(!this.password) {
      this.showBasicAlert('비밀번호를 입력해주세요.');
      return;
    }
    this.httpService.localLogin(this.username, this.password, this.role)
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.storage.set('accessToken', data.data.accessToken);
          this.storage.set('refreshToken', data.data.refreshToken);
          this.storage.get('accessToken').then((val) => {
            console.log('accessToken', val);
          });
          this.storage.get('refreshToken').then((val) => {
            console.log('refreshToken', val);
          });
          this.navCtrl.push(CompanyTabsPage);
        }
        else if(data.success == false) {
          switch(data.message) {
            case 'username is unregistered':
              this.showBasicAlert('이메일을 정확히 입력해주세요.');
              break;
            case 'password is not correct':
              this.showBasicAlert('비밀번호를 정확히 입력해주세요.');
              break;
          }
        }
      },
      (err) => {
        console.log(err);
        this.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  showBasicAlert(subTitle) {
    let alert = this.alertCtrl.create ({
      subTitle: subTitle,
      buttons: ['OK']
    });

    alert.present();
  }
}
