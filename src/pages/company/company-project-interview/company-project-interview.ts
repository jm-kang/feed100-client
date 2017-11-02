import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyProjectInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-interview',
  templateUrl: 'company-project-interview.html',
})
export class CompanyProjectInterviewPage {
  project_id;

  projectName: String = '';
  projectEndDate: String = '';
  totalInterviewNum: number = 0;
  maxInterviewNum: number = 0;
  interviews = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  back() {
    this.navCtrl.pop();
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter CompanyProjectInterviewPage');
    this.project_id = this.navParams.get('project_id');

    let loading = this.commonService.presentLoading();

    this.companyService.getProjectInterviews(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          console.log(JSON.stringify(data.data));
          this.projectName = data.data.project_name;
          this.projectEndDate = data.data.project_end_date;
          this.totalInterviewNum = data.data.total_interview_num;
          this.maxInterviewNum = data.data.max_interview_num;
          this.interviews = data.data.interviews;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidEnter();
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
    console.log('ionViewDidLoad CompanyProjectInterviewPage');
  }

  openCompanyProjectInterviewDetailPage(project_participant_id) {
    this.navCtrl.push('CompanyProjectInterviewDetailPage', { "project_participant_id" : project_participant_id });
  }
}
