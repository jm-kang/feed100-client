import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController, Content, Platform } from 'ionic-angular';

// import { StatusBar } from '@ionic-native/status-bar';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';
/**
 * Generated class for the AdminProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-home',
  templateUrl: 'admin-project-home.html',
})
export class AdminProjectHomePage {
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
  projectRegistrationDate: String = "";
  project_link;

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
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectHomePage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter AdminProjectHomePage');

    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.adminService.getProjectHome(this.project_id)
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

        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidEnter();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  back() {
    this.navCtrl.pop();
  }

  openAdminProjectSideMenuPage() {
    this.navCtrl.push('AdminProjectSideMenuPage', { "project_id" : this.project_id });
  }

  openAdminProjectStoryPage() {
    this.navCtrl.push('AdminProjectStoryPage', { "project_id" : this.project_id });
  }

  openAdminProjectLinkPage() {
    let adminProjectLinkModal = this.modalCtrl.create('ModalWrapperPage', {page: 'AdminProjectLinkPage', params: { "project_link" : this.project_link }});
    adminProjectLinkModal.present();
  }

  openAdminProjectFeedbackPage(feedback_id) {
    this.navCtrl.push('AdminProjectFeedbackPage', { "project_id" : this.project_id, "feedback_id" : feedback_id });
  }

  openAdminProjectInterviewPage() {
    this.navCtrl.push('AdminProjectInterviewPage', { "project_id" : this.project_id });
  }

  openAdminProjectSearchPage() {
    this.navCtrl.push('AdminProjectSearchPage',
      { "project_hashtags" : JSON.parse(JSON.stringify(this.projectHashtags)),
        "project_main_image" : this.projectMainImage,
        "project_name" : this.projectName,
        "project_id" : this.project_id
      });
  }

  openAdminProjectSearchResultPage(hashtags) {
    this.navCtrl.push('AdminProjectSearchResultPage', { "hashtags" : hashtags, "project_id" : this.project_id });
  }

  openAdminProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('AdminProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

  openAdminProjectUserReportPage() {
    this.navCtrl.push('AdminProjectUserReportPage', { "project_id" : this.project_id });
  }
}
