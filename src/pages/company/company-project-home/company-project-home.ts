import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController, Content } from 'ionic-angular';

// import { StatusBar } from '@ionic-native/status-bar';

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
  projectRegistrationDate: String = "";

  feedbacks = [];

  projectHashtags = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public appCtrl: App,
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectHomePage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter CompanyProjectHomePage');

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

  openCompanyProjectSideMenuPage() {
    this.navCtrl.push('CompanyProjectSideMenuPage', { "project_id" : this.project_id });
  }

  openCompanyProjectStoryPage() {
    this.navCtrl.push('CompanyProjectStoryPage', { "project_id" : this.project_id });
  }

  openCompanyProjectLinkPage() {
    let companyProjectLinkModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyProjectLinkPage'});
    companyProjectLinkModal.present();
  }

  openCompanyProjectFeedbackPage(feedback_id) {
    this.navCtrl.push('CompanyProjectFeedbackPage', { "project_id" : this.project_id, "feedback_id" : feedback_id });
  }

  openCompanyProjectInterviewPage() {
    this.navCtrl.push('CompanyProjectInterviewPage', { "project_id" : this.project_id });
  }

  openCompanyProjectSearchPage() {
    this.navCtrl.push('CompanyProjectSearchPage',
      { "project_hashtags" : JSON.parse(JSON.stringify(this.projectHashtags)),
        "project_main_image" : this.projectMainImage,
        "project_name" : this.projectName,
        "project_id" : this.project_id
      });
  }

  openCompanyProjectSearchResultPage(hashtags) {
    this.navCtrl.push('CompanyProjectSearchResultPage', { "hashtags" : hashtags, "project_id" : this.project_id });
  }

  openCompanyProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('CompanyProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

  openCompanyProjectUserReportPage() {
    this.navCtrl.push('CompanyProjectUserReportPage', { "project_id" : this.project_id });
  }
}
