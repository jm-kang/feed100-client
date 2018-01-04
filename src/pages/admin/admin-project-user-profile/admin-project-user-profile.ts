import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectUserProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-user-profile',
  templateUrl: 'admin-project-user-profile.html',
})
export class AdminProjectUserProfilePage {
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
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAccountModificationFormPage');
    let loading = this.commonService.presentLoading();
    this.project_participant_id = this.navParams.get('project_participant_id');

    this.adminService.getProjectParticipant(this.project_participant_id)
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

  back() {
    this.navCtrl.pop();
  }

  openAdminProjectFeedbackPage() {
    this.navCtrl.push('AdminProjectFeedbackPage', { "project_id" : this.project_id, "feedback_id" : this.project_participant_id });
  } 
  openAdminProjectInterviewDetailPage() {
    this.navCtrl.push('AdminProjectInterviewDetailPage', { "project_participant_id" : this.project_participant_id });
  }
}

