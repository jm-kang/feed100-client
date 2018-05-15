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
  waitingNotice: string = "현재 인터뷰 대기 중입니다.<br>인터뷰는 프로젝트 기간 동안 진행되며 1회 당 최대<br>500P로 총 5회까지 추가 지급됩니다.<br>인터뷰에 성실히 응답하지 않을 시 프로젝트에서<br>제외 될 수 있습니다.<br>만족스러웠던 유저를 선정하여 2000P를<br>지급해 드립니다.";
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

  openUserProjectStoryVerticalPage() {
    console.log('story open');
    let userProjectStoryVerticalModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectStoryVerticalPage', params: { "project_id" : this.project_id }});
    userProjectStoryVerticalModal.present();
  }

  openUserProjectInterviewDetailPage() {
    console.log('detail open');
    let userProjectInterviewDetailModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectInterviewDetailPage', params: { "project_participant_id" : this.project_participant_id }});
    userProjectInterviewDetailModal.present();
  }

}
