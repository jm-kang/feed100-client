import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-interview',
  templateUrl: 'company-interview.html',
})
export class CompanyInterviewPage {
  activeAccordion: boolean = false;

  projectInterviews = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload CompanyInterviewPage');
    this.companyService.companyInterviewPage = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInterviewPage');
    this.companyService.companyInterviewPage = this;

    let loading = this.commonService.presentLoading();
    
    this.companyService.getInterviews()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectInterviews = data.data;
          this.getAlarmAndInterviewNum();
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  getAlarmAndInterviewNum() {
    this.companyService.getAlarmAndInterviewNum()
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.companyService.alarmNum = data.data.alarm_num;
          this.companyService.interviewNum = data.data.interview_num;
          this.badge.set(data.data.alarm_num);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    refresher.complete();
  }

  accordion() {
    if(this.activeAccordion) {
      this.activeAccordion = false;
    } else {
      this.activeAccordion = true;
    }
  }

  openCompanyProjectInterviewPage(project_id) {
    this.navCtrl.push('CompanyProjectInterviewPage', { "project_id" : project_id });
  }

  openCompanyAlarmPage() {
    this.navCtrl.push('CompanyAlarmPage');
  }

  openCompanyConfigurePage() {
    this.navCtrl.push('CompanyConfigurePage');
  }

  getAlarmNum() {
    return this.companyService.alarmNum;
  }

}
