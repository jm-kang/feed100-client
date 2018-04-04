import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

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
  project_id;
  project_participant_id;

  // projectName: string = "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십";
  // currentReward: string = "1000";
  // maxReward: string = "5500";
  // progressState: string = "2018-03-31 00:00:00";
  waitingNotice: string = "프로젝트 안내 프로젝트 안내 프로젝트 안내프로젝트 안내프로젝트 안내프로젝트 안내 프로젝트 안내";
  projectName;
  currentReward;
  maxReward;
  progressState;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectHomePage');
    this.project_id = this.navParams.get('project_id');
    this.commonService.isLoadingActive = true;
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
          this.projectName = data.data.project_name;
          this.currentReward = data.data.interview_reward;
          this.maxReward = data.data.project_max_reward;
          this.progressState = data.data.project_end_date;
          this.project_participant_id = data.data.project_participant_id;
          if(data.data.is_new_interview) {
            this.openUserProjectInterviewAnswerPage();
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          })
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

  openUserProjectInterviewAnswerPage() {
    let userProjectInterviewAnswerModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectInterviewAnswerPage', params: { "project_id" : this.project_id, "project_participant_id" : this.project_participant_id }});
    userProjectInterviewAnswerModal.present();
    userProjectInterviewAnswerModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();
        }
        else if(data == "cancel") {
          this.back();
        }
      }
    )
  }

}
