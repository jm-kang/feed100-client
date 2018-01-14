import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyProjectSideMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-side-menu',
  templateUrl: 'company-project-side-menu.html',
})
export class CompanyProjectSideMenuPage {
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
    public companyService: CompanyServiceProvider) {

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectSideMenuPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectSideMenuPage');
    let loading = this.commonService.presentLoading();

    this.companyService.getSideMenuData(this.project_id)
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

  openCompanyProjectReportPage() {
    this.navCtrl.push('CompanyProjectReportPage', { "project_id" : this.project_id });
  }

  openCompanyProjectUserInfoPage() {
    this.navCtrl.push('CompanyProjectUserInfoPage', { "project_id" : this.project_id });
  }

  openCompanyProjectStatsPage() {
    this.navCtrl.push('CompanyProjectStatsPage', { "project_id" : this.project_id });
  }

  openCompanyProjectStorySummaryPage() {
    this.navCtrl.push('CompanyProjectStorySummaryPage', { "project_id" : this.project_id });
  }

  openCompanyProjectPriceStatementPage() {
    this.navCtrl.push('CompanyProjectPriceStatementPage', { "project_id" : this.project_id });
  }

  openCompanyProjectUserReportPage() {
    this.navCtrl.push('CompanyProjectUserReportPage', { "project_id" : this.project_id });
  }
}
