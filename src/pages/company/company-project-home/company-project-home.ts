import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController, Content } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { CompanyProjectSideMenuPage } from '../company-project-side-menu/company-project-side-menu';
import { CompanyProjectStoryPage } from '../company-project-story/company-project-story';
import { CompanyProjectLinkPage } from '../company-project-link/company-project-link';
import { CompanyProjectFeedbackPage } from '../company-project-feedback/company-project-feedback';
import { CompanyProjectInterviewDetailPage } from '../company-project-interview-detail/company-project-interview-detail';
import { CompanyProjectSearchPage } from '../company-project-search/company-project-search';
import { CompanyProjectSearchResultPage } from '../company-project-search-result/company-project-search-result';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-home',
  templateUrl: 'company-project-home.html',
})
export class CompanyProjectHomePage {
  @ViewChild("contentRef") contentHandle: Content;

  project_id;

  // projectMainImage: String = "";
  // avatarImage: String = "";
  // nickname: String = "";
  // projectName: String = "";
  // projectSummary: String = "";
  // participantNum: number = 0;
  // maxParticipantNum: number = 0;
  // progressState: String = "";
  // isLink: boolean = false;
  // interview_num: number = 0;

  projectMainImage: String = "assets/img/project-main-image1.png";
  avatarImage: String = "assets/img/company-avatar-image1.png";
  nickname: String = "더콰이엇";
  projectName: String = "프로젝트 이름";
  projectSummary: String = "프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명";
  participantNum: number = 20;
  maxParticipantNum: number = 30;
  progressState: String = "2017-09-16 00:00:00";
  isLink: boolean = false;
  interview_num: number = 0;
  
  feedbacks = [
    {
      avatar_image: 'assets/img/user-avatar-image.png',
      is_best: true,
      nickname: '지코',
      empathy_num: 10,
      non_empathy_num: 2,
      project_feedback_registration_date: '2017-09-16 00:00:00',
      project_participant_id: 1,
      project_feedback: "[\"We are we are we artist baby We are we are we artist ZICO 뭔가 예감 좋아 번뜩 악상이 떠올라 금토일도 월요일같이 사는 내게 상 줄 거야 Alright 올해도 스케줄 꽉 찼고 길 가면 다 알아보고 Fanxy child 겁나 핫하고 그런데도 나 외로워 What should I do\"]",
      project_feedback_hashtags: "[\"기능\", \"기타\"]",
    }
  ];

  projectHashtags = [
    {value: '기능', isActiveHashtag: false},
    {value: '개선사항', isActiveHashtag: false},
    {value: 'Shes a Baby', isActiveHashtag: false},
    {value: '전지전능', isActiveHashtag: false},
    {value: '로비', isActiveHashtag: false},
    {value: '설현', isActiveHashtag: false},
  ];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public statusBar: StatusBar, 
    public appCtrl: App, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
    // this.participantNum = this.feedbacks.length;
    // 베스트 피드백 조건 
    // 현재 피드백의 순위가 전체 참여 가능 인원의 10퍼센트 이하 
    // 현재 참여자수(피드백수)가 최대 전체 참여 가능 인원의 반 이상 
    // 현재 피드백의 공감수가 현재 참여자수의 반 초과 
    // if(this.participantNum >= this.maxParticipantNum/2) {
    //   for(let i = 0; i < this.maxParticipantNum; i ++) {
    //     if(this.maxParticipantNum/10 > i && this.feedbacks[i].empathyNum > this.participantNum/2) {
    //       this.feedbacks[i].isBest = true;
    //     }
    //   }
    // }
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      this.statusBar.show();
      this.viewCtrl.dismiss();
    }
    if (e.scrollTop < 30) {
      // console.log("top: " + e.scrollingFun);
      document.querySelector(".project-header-wrapper")['style'].background = 'transparent';
      document.querySelector(".project-header-wrapper")['style'].borderBottom = '0';
      document.querySelector(".project-header-wrapper .dismiss-button ion-icon")['style'].color = '#fff';
      document.querySelector(".project-header-wrapper .menu-button ion-icon")['style'].color = '#fff';
      document.querySelector(".project-header-wrapper ion-title")['style'].display = 'none';
    } else {
      // console.log("bottom: " + e.scrollingFun);
      document.querySelector(".project-header-wrapper")['style'].background = '#fff';
      document.querySelector(".project-header-wrapper")['style'].borderBottom = '0.55px solid #e8e8e8';
      document.querySelector(".project-header-wrapper .menu-button ion-icon")['style'].color = '#383838';
      document.querySelector(".project-header-wrapper .dismiss-button ion-icon")['style'].color = '#383838';
      document.querySelector(".project-header-wrapper ion-title")['style'].display = 'flex';
    }
  }

  ionViewDidLoad() {    
    console.log('ionViewDidLoad CompanyProjectHomePage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter CompanyProjectHomePage');
    this.statusBar.hide(); 
    
    // let loading = this.httpService.presentLoading();
    // this.project_id = this.navParams.get('project_id');

    // this.httpService.getProjectHome(this.project_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.projectMainImage = data.data.project_main_image;
    //       this.avatarImage = data.data.avatar_image;
    //       this.nickname = data.data.nickname;
    //       this.projectName = data.data.project_name;
    //       this.projectSummary = data.data.project_summary;
    //       this.participantNum = data.data.participant_num;
    //       this.maxParticipantNum = data.data.max_participant_num;
    //       this.progressState = data.data.project_end_date;
    //       this.isLink = (data.data.project_link != null) ? true : false;
    //       this.interview_num = data.data.interview_num;

    //       this.projectHashtags = JSON.parse(data.data.project_hashtags);

    //       this.feedbacks = data.data.feedbacks;
        
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

  dismiss() {
    this.statusBar.show();
    this.viewCtrl.dismiss();
  }

  openCompanyProjectSideMenuPage() {
    this.statusBar.show();
    this.navCtrl.push(CompanyProjectSideMenuPage, { "project_id" : this.project_id });
  }

  openCompanyProjectStoryPage() {
    this.statusBar.show();
    this.navCtrl.push(CompanyProjectStoryPage, { "project_id" : this.project_id });
  }

  openCompanyProjectLinkPage() {
    this.statusBar.show();
    let companyProjectLinkModal = this.modalCtrl.create(CompanyProjectLinkPage);
    companyProjectLinkModal.present();
  }

  openCompanyProjectFeedbackPage(feedback_id) {
    this.navCtrl.push(CompanyProjectFeedbackPage, { "project_id" : this.project_id, "feedback_id" : feedback_id });
  }

  openCompanyProjectInterviewDetailPage() {
    this.navCtrl.push(CompanyProjectInterviewDetailPage);
  }

  openCompanyProjectSearchPage() {
    this.navCtrl.push(CompanyProjectSearchPage, 
      { "project_hashtags" : JSON.parse(JSON.stringify(this.projectHashtags)),
        "project_main_image" : this.projectMainImage,
        "project_name" : this.projectName,
        "feedbacks" : JSON.parse(JSON.stringify(this.feedbacks)) });
  }

  openCompanyProjectSearchResultPage(hashtags) {
    let companyProjectSearchResultModal = this.modalCtrl.create(CompanyProjectSearchResultPage, 
      { "hashtags" : hashtags,
      "project_id" : this.project_id });
    companyProjectSearchResultModal.present();
  }
}
