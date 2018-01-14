import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController, Content, Platform } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { platformBrowser } from '@angular/platform-browser/src/browser';
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
  projectRegistrationDate: String = "";
  project_link = "";

  myOpinionNum: number = 0;
  minOpinionNum: number = 0;

  isReportWrited: boolean = false; // 심층 피드백을 작성했는지 판단하는 변수

  feedbacks = [];

  projectHashtags = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appCtrl: App,
    public modalCtrl: ModalController,
    public platform: Platform,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectHomePage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectHomePage');
    let loading = this.commonService.presentLoading();

    this.userService.getProjectHome(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(this.platform.is('android')) {
            this.isLink = (data.data.project_android_link != null) ? true : false;
            this.project_link = data.data.project_android_link;
          }
          else if(this.platform.is('ios')) {
            this.isLink = (data.data.project_ios_link != null) ? true : false;
            this.project_link = data.data.project_ios_link;
          }
          this.projectMainImage = data.data.project_main_image;
          this.avatarImage = data.data.avatar_image;
          this.nickname = data.data.nickname;
          this.projectName = data.data.project_name;
          this.projectSummary = data.data.project_summary;
          this.participantNum = data.data.participant_num;
          this.maxParticipantNum = data.data.max_participant_num;
          this.progressState = data.data.project_end_date;
          this.interview_num = data.data.interview_num;
          this.projectRegistrationDate = data.data.project_registration_date;
          this.projectHashtags = JSON.parse(data.data.project_hashtags);
          
          this.feedbacks = data.data.feedbacks;
          
          this.minOpinionNum = Math.round(data.data.max_participant_num / 3);
          
          this.myOpinionNum = 0;
          for(let feedback of this.feedbacks) {
            if(feedback.is_my_opinion) {
              this.myOpinionNum += 1;
            }
            if(feedback.is_my_feedback) {
              this.isReportWrited = (feedback.project_report_registration_date) ? true : false;
            }
          }
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

  openUserProjectSideMenuPage() {
    this.navCtrl.push('UserProjectSideMenuPage', { "project_id" : this.project_id });
  }

  openUserProjectStoryPage() {
    this.navCtrl.push('UserProjectStoryPage', { "project_id" : this.project_id });
  }

  openUserProjectLinkPage() {
    let userProjectLinkModal = this.modalCtrl.create( 'ModalWrapperPage', {page: 'UserProjectLinkPage', params: { "project_link" : this.project_link }});
    userProjectLinkModal.present();
  }

  openUserProjectFeedbackPage(feedback_id) {
    this.navCtrl.push('UserProjectFeedbackPage', { "project_id" : this.project_id, "feedback_id" : feedback_id });
  }

  openUserProjectInterviewDetailPage() {
    this.navCtrl.push('UserProjectInterviewDetailPage', { "project_id" : this.project_id });
  }

  openUserProjectSearchResultPage(hashtags) {
    this.navCtrl.push('UserProjectSearchResultPage', { "hashtags" : hashtags, "project_id" : this.project_id });
  }

  openUserProjectFeedbackListPage() {
    this.navCtrl.push('UserProjectFeedbackListPage', { "project_id" : this.project_id });
  }

  openUserProjectReportFormPage() {
    let userProjectReportFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectReportFormPage', params: { "project_id" : this.project_id }});
    userProjectReportFormModal.present();
    userProjectReportFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();
        }
    });
  }
}
