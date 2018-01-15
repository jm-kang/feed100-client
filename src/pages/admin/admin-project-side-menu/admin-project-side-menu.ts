import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectSideMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-side-menu',
  templateUrl: 'admin-project-side-menu.html',
})
export class AdminProjectSideMenuPage {
  @ViewChild("contentRef") contentHandle: Content;

  project_id;

  projectName: String = "";
  projectMainImage: String = ""
  avatarImage: String = "";
  nickname: String = "";
  maxHeight: any =  "";
  maxWidth: any =  "";
  height: any =  "";
  width: any =  "";
  left: any =  "";
  top: any =  "";

  participantNum:number = 0;
  maxParticipantNum:number = 0;
  totalInterviewNum:number = 0;
  maxInterviewNum:number = 0;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectSideMenuPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectSideMenuPage');
    let loading = this.commonService.presentLoading();

    this.adminService.getSideMenuData(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectName = data.data.project_name;
          this.projectMainImage = data.data.project_main_image;
          this.avatarImage = data.data.avatar_image;
          this.nickname = data.data.nickname;
          this.participantNum = data.data.participant_num;
          this.maxParticipantNum = data.data.max_participant_num;
          this.totalInterviewNum = data.data.total_interview_num;
          this.maxInterviewNum = data.data.max_interview_num;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          });
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

  back() {
    this.navCtrl.pop();
  }

  openAdminProjectReportPage() {
    this.navCtrl.push('AdminProjectReportPage', { "project_id" : this.project_id });
  }

  openAdminProjectUserInfoPage() {
    this.navCtrl.push('AdminProjectUserInfoPage', { "project_id" : this.project_id });
  }

  openAdminProjectStatsPage() {
    this.navCtrl.push('AdminProjectStatsPage', { "project_id" : this.project_id });
  }

  openAdminProjectStorySummaryPage() {
    this.navCtrl.push('AdminProjectStorySummaryPage', { "project_id" : this.project_id });
  }

  openAdminProjectPriceStatementPage() {
    this.navCtrl.push('AdminProjectPriceStatementPage', { "project_id" : this.project_id });
  }

  openAdminProjectUserReportPage() {
    this.navCtrl.push('AdminProjectUserReportPage', { "project_id" : this.project_id });
  }
}
