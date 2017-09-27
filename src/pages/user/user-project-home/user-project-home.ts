import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController, Content } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { UserProjectSideMenuPage } from '../user-project-side-menu/user-project-side-menu';
import { UserProjectStoryPage } from '../user-project-story/user-project-story';
import { UserProjectLinkPage } from '../user-project-link/user-project-link';
import { UserProjectFeedbackPage } from '../user-project-feedback/user-project-feedback';
import { UserProjectInterviewDetailPage } from '../user-project-interview-detail/user-project-interview-detail';
import { UserProjectSearchResultPage } from '../user-project-search-result/user-project-search-result';
import { UserProjectFeedbackListPage } from '../user-project-feedback-list/user-project-feedback-list';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-home',
  templateUrl: 'user-project-home.html',
})
export class UserProjectHomePage {
  @ViewChild("contentRef") contentHandle: Content;

  project_id;

  projectMainImage: String = "";
  avatarImage: String = "";
  nickname: String = "";
  projectName: String = "";
  projectSummary: String = ""
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
    public userService: UserServiceProvider) {
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
    console.log('ionViewDidLoad UserProjectHomePage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectHomePage');
    this.statusBar.hide(); 
    
    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.userService.getProjectHome(this.project_id)
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

  openUserProjectSideMenuPage() {
    this.statusBar.show();
    this.navCtrl.push(UserProjectSideMenuPage, { "project_id" : this.project_id });
  }

  openUserProjectStoryPage() {
    this.statusBar.show();
    this.navCtrl.push(UserProjectStoryPage, { "project_id" : this.project_id });
  }

  openUserProjectLinkPage() {
    this.statusBar.show();
    let userProjectLinkModal = this.modalCtrl.create(UserProjectLinkPage);
    userProjectLinkModal.present();
  }

  openUserProjectFeedbackPage(feedback_id) {
    this.navCtrl.push(UserProjectFeedbackPage, { "project_id" : this.project_id, "feedback_id" : feedback_id });
  }

  openUserProjectInterviewDetailPage() {
    this.navCtrl.push(UserProjectInterviewDetailPage, { "project_id" : this.project_id });
  }

  // openUserProjectSearchPage() {
  //   this.navCtrl.push(UserProjectSearchPage, 
  //     { "project_hashtags" : JSON.parse(JSON.stringify(this.projectHashtags)),
  //       "project_main_image" : this.projectMainImage,
  //       "project_name" : this.projectName,
  //       "feedbacks" : JSON.parse(JSON.stringify(this.feedbacks)) });
  // }

  openUserProjectSearchResultPage(hashtags) {
    let userProjectSearchResultModal = this.modalCtrl.create(UserProjectSearchResultPage, 
      { "hashtags" : hashtags,
      "project_id" : this.project_id });
    userProjectSearchResultModal.present();
  }

  openUserProjectFeedbackListPage() {
    this.navCtrl.push(UserProjectFeedbackListPage, { "project_id" : this.project_id });
  }
}

