import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { CompanyProjectReportPage } from '../company-project-report/company-project-report';
import { CompanyProjectUserInfoPage } from '../company-project-user-info/company-project-user-info';
import { CompanyProjectStatsPage } from '../company-project-stats/company-project-stats';
import { CompanyProjectStorySummaryPage } from '../company-project-story-summary/company-project-story-summary';
import { CompanyProjectPriceStatementPage } from '../company-project-price-statement/company-project-price-statement';

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
    public statusBar: StatusBar,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {

  }
  
  back() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectSideMenuPage');
    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

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

  scrollingFun(e) {
    // if (e.scrollTop < 30) {
    //   // console.log("top: " + e.scrollingFun);
    //   document.querySelector(".side-menu-header")['style'].background = 'transparent';
    //   document.querySelector(".side-menu-header")['style'].borderBottom = '0';
    //   document.querySelector(".side-menu-header .pop-button ion-icon")['style'].color = '#fff';
    //   document.querySelector(".side-menu-header .project-header-title")['style'].color = '#fff';
    // } else {
    //   // console.log("bottom: " + e.scrollingFun);
    //   document.querySelector(".side-menu-header")['style'].background = '#fff';
    //   document.querySelector(".side-menu-header")['style'].borderBottom = '0.55px solid #e8e8e8';
    //   document.querySelector(".side-menu-header .pop-button ion-icon")['style'].color = '#787878';
    //   document.querySelector(".side-menu-header .project-header-title")['style'].color = '#383838';
    // }
  }

  openCompanyProjectReportPage() {
    this.navCtrl.push(CompanyProjectReportPage, { "project_id" : this.project_id });
  }

  openCompanyProjectUserInfoPage() {
    this.navCtrl.push(CompanyProjectUserInfoPage, { "project_id" : this.project_id });
  }

  openCompanyProjectStatsPage() {
    this.navCtrl.push(CompanyProjectStatsPage, { "project_id" : this.project_id });
  }

  openCompanyProjectStorySummaryPage() {
    this.navCtrl.push(CompanyProjectStorySummaryPage, { "project_id" : this.project_id });
  }

  openCompanyProjectPriceStatementPage() {
    this.navCtrl.push(CompanyProjectPriceStatementPage, { "project_id" : this.project_id });
  }
}
