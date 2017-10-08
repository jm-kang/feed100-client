import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController, Content } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { CompanyProjectSideMenuPage } from '../company-project-side-menu/company-project-side-menu';
import { CompanyProjectStoryPage } from '../company-project-story/company-project-story';
import { CompanyProjectLinkPage } from '../company-project-link/company-project-link';
import { CompanyProjectFeedbackPage } from '../company-project-feedback/company-project-feedback';
import { CompanyProjectInterviewPage } from '../company-project-interview/company-project-interview';
import { CompanyProjectSearchPage } from '../company-project-search/company-project-search';
import { CompanyProjectSearchResultPage } from '../company-project-search-result/company-project-search-result';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';

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

  projectMainImage: String = "";
  avatarImage: String = "";
  nickname: String = "";
  projectName: String = "";
  projectSummary: String = "";
  participantNum: number = 0;
  maxParticipantNum: number = 0;
  progressState: String = "";
  isLink: boolean = false;
  interview_num: number = 0;
  
  feedbacks = [];

  projectHashtags = [];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public statusBar: StatusBar, 
    public appCtrl: App, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
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

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectHomePage');
    this.statusBar.hide(); 
    
    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.companyService.getProjectHome(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectMainImage = data.data.project_main_image;
          this.avatarImage = data.data.avatar_image;
          this.nickname = data.data.nickname;
          this.projectName = data.data.project_name;
          this.projectSummary = data.data.project_summary;
          this.participantNum = data.data.participant_num;
          this.maxParticipantNum = data.data.max_participant_num;
          this.progressState = data.data.project_end_date;
          this.isLink = (data.data.project_link != null) ? true : false;
          this.interview_num = data.data.interview_num;

          this.projectHashtags = JSON.parse(data.data.project_hashtags);

          this.feedbacks = data.data.feedbacks;
        
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

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

  openCompanyProjectInterviewPage() {
    this.navCtrl.push(CompanyProjectInterviewPage, { "project_id" : this.project_id });
  }

  openCompanyProjectSearchPage() {
    this.navCtrl.push(CompanyProjectSearchPage, 
      { "project_hashtags" : JSON.parse(JSON.stringify(this.projectHashtags)),
        "project_main_image" : this.projectMainImage,
        "project_name" : this.projectName,
        "project_id" : this.project_id
      });
  }

  openCompanyProjectSearchResultPage(hashtags) {
    let companyProjectSearchResultModal = this.modalCtrl.create(CompanyProjectSearchResultPage, 
      { "hashtags" : hashtags,
      "project_id" : this.project_id });
    companyProjectSearchResultModal.present();
  }

  openCompanyProjectUserProfilePage(project_participant_id) {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage, { "project_participant_id" : project_participant_id });
    companyProjectUserProfileModal.present();
  }
}
