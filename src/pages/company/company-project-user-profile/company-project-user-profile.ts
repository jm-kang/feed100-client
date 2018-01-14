import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyProjectUserProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-user-profile',
  templateUrl: 'company-project-user-profile.html',
})
export class CompanyProjectUserProfilePage {
  @ViewChild("contentRef") contentHandle: Content;
  project_id;
  project_participant_id;

  avatarImage: String = "";
  nickname: String = "";
  level: number = 1;
  levelClass: String = ""
  maxHeight: any =  "";
  maxWidth: any =  "";
  height: any =  "";
  width: any =  "";
  left: any =  "";
  top: any =  "";
  gender: String = "";
  age: String = "";
  job: String = "";
  region: String = "";
  marriage: String = "";
  storySummary: String = "";

  participationConditions = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public alertCtrl: AlertController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectUserProfilePage');
    this.commonService.isLoadingActive = true;
    this.project_participant_id = this.navParams.get('project_participant_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectUserProfilePage');
    let loading = this.commonService.presentLoading();

    this.companyService.getProjectParticipant(this.project_participant_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.project_id = data.data.project_id;
          this.avatarImage = data.data.avatar_image;;
          this.nickname = data.data.nickname;
          this.level = data.data.level;
          this.levelClass = data.data.level_class;
          this.gender = data.data.gender;
          this.age = data.data.age;
          this.job = data.data.job;
          this.region = data.data.region;
          this.marriage = data.data.marriage;
          this.storySummary = data.data.project_story_summary;
          this.participationConditions = JSON.parse(data.data.project_participation_objective_conditions);
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

  back() {
    this.navCtrl.pop();
  }

  openCompanyProjectFeedbackPage() {
    this.navCtrl.push('CompanyProjectFeedbackPage', { "project_id" : this.project_id, "feedback_id" : this.project_participant_id });
  } 
  openCompanyProjectInterviewDetailPage() {
    this.navCtrl.push('CompanyProjectInterviewDetailPage', { "project_participant_id" : this.project_participant_id });
  }
}

