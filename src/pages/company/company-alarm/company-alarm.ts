import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyAlarmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-alarm',
  templateUrl: 'company-alarm.html',
})
export class CompanyAlarmPage {
  alarms = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyAlarmPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyAlarmPage');
    let loading = this.commonService.presentLoading();
    
    this.companyService.getAlarms()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.alarms = data.data;
          this.badge.set(0);
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  accessAlarmItem(link, project_id, alarm_id) {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();
    
    this.companyService.alarmRead(alarm_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.alarms = data.data;
          switch(link) {
            case "endProject":
            case "newFeedback":
            case "warnProject":
            case "newReport":
              this.accessProjectCard(project_id);
              break;
            case "newInterview":
              this.openCompanyProjectInterviewPage(project_id);
              break;
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  back() {
    this.navCtrl.pop();
  }

  accessProjectCard(project_id) {
    this.companyService.accessProjectCard(this, project_id);
  }

  openCompanyProjectInterviewPage(project_id) {
    this.navCtrl.push('CompanyProjectInterviewPage', { "project_id" : project_id });
  }

}
