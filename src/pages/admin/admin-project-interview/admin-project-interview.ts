import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';
/**
 * Generated class for the AdminProjectInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-interview',
  templateUrl: 'admin-project-interview.html',
})
export class AdminProjectInterviewPage {
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
    public adminService: AdminServiceProvider) {
  }

  back() {
    this.navCtrl.pop();
  }


  ionViewDidEnter() {
    console.log('ionViewDidEnter AdminProjectInterviewPage');
    this.project_id = this.navParams.get('project_id');

    let loading = this.commonService.presentLoading();

    this.adminService.getProjectInterviews(this.project_id)
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
    console.log('ionViewDidLoad AdminProjectInterviewPage');
  }

  openAdminProjectInterviewDetailPage(project_participant_id) {
    this.navCtrl.push('AdminProjectInterviewDetailPage', { "project_participant_id" : project_participant_id });
  }
}
