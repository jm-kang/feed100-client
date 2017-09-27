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
  feedback_id;

  projectName: String = "프로젝트 이름 프로젝트 이름 프로젝트 이름 프로젝트 이름";
  projectMainImage: String = "assets/img/project-main-image1.png"
  avatarImage: String = "assets/img/company-avatar-image1.png";
  nickname: String = "더콰이엇";
  maxHeight: any =  "";
  maxWidth: any =  "";
  height: any =  "";
  width: any =  "";
  left: any =  "";
  top: any =  "";

  participantNum:number = 20;
  maxParticipantNum:number = 30;
  totalCompanyInterviewNum:number = 10;
  maxCompanyInterviewNum:number = 60;


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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectSideMenuPage');
    // let loading = this.httpService.presentLoading();
    // this.project_id = this.navParams.get('project_id');

    // this.httpService.getSideMenuData(this.project_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.projectName = data.data.project.project_name;
    //       this.avatarImage = data.data.avatar_image;
    //       this.nickname = data.data.nickname;
    //       this.level = data.data.level;
    //       this.levelClass = data.data.levelClass;
    //       this.isBest = data.data.feedback.is_best;
    //       this.empathyNum = data.data.feedback.empathy_num;
    //       this.nonEmpathyNum = data.data.feedback.non_empathy_num;
    //       this.feedbackNum = data.data.project.participant_num;
    //       this.myOpinionNum = data.data.my_opinion_num;
    //       this.completedInterviewNum = data.data.project.completed_interview_num;
    //       this.interviewNum = data.data.project.interview_num;

    //       this.feedback_id = data.data.feedback.project_participant_id;

    //       this.feedbackPoint = this.feedbackReward + ((this.isBest) ? this.bestFeedbackReward : 0);
    //       this.opinionPoint = this.opinionReward * this.myOpinionNum;
    //       this.maxOpinionPoint = this.opinionReward * this.feedbackNum;
    //       this.interviewPoint = this.interviewReward * this.completedInterviewNum;
    //       this.projectPoint = this.feedbackPoint + this.opinionPoint + this.interviewPoint;
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidLoad();
    //       });
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );

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

  onAvatarImageLoad(img) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;

    console.log("img : (" + img.width + " * " + img.height + ")");

    if(img.width/16 >= img.height/9) {
      tempHeight = img.width*9/16 + 'px';
      tempWidth = 'auto';
      tempTop = 'initial';
      tempLeft = "-" + (img.width-img.height*16/9)/2  + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      tempWidth = img.height*16/9 + 'px';
      tempHeight = 'auto';
      tempLeft = 'initial';
      tempTop = "-" + (img.height-img.width*9/16)/2 + 'px';
      tempMaxWidth = '100%';
      tempMaxHeight = 'initial';
    }
    this.width = tempWidth;
    this.height = tempHeight;
    this.left = tempLeft;
    this.top = tempTop;
    this.maxHeight = tempMaxHeight;
    this.maxWidth = tempMaxWidth;
  }

  openCompanyProjectReportPage() {
    this.navCtrl.push(CompanyProjectReportPage);
  }

  openCompanyProjectUserInfoPage() {
    this.navCtrl.push(CompanyProjectUserInfoPage);
  }

  openCompanyProjectStatsPage() {
    this.navCtrl.push(CompanyProjectStatsPage);
  }

  openCompanyProjectStorySummaryPage() {
    this.navCtrl.push(CompanyProjectStorySummaryPage);
  }

  openCompanyProjectPriceStatementPage() {
    this.navCtrl.push(CompanyProjectPriceStatementPage);
  }
}
