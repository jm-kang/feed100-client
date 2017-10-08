import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CompanyProjectInterviewPage } from '../company-project-interview/company-project-interview';

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
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyInterviewPage');
    let loading = this.commonService.presentLoading();
    
    this.companyService.getInterviews()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectInterviews = data.data;
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInterviewPage');
  }

  accordion() {
    if(this.activeAccordion) {
      this.activeAccordion = false;
    } else {
      this.activeAccordion = true;
    }
  }
  
  openCompanyProjectInterviewPage(project_id) {
    this.appCtrl.getRootNavs()[0].push(CompanyProjectInterviewPage, { "project_id" : project_id });
  }

}
