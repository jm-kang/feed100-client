import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { UserProjectInterviewDetailPage } from '../user-project-interview-detail/user-project-interview-detail';

import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { UserProfileModificationFormPage } from '../user-profile-modification-form/user-profile-modification-form';
import { UserProjectStoryPage } from '../user-project-story/user-project-story';
import { UserProjectParticipationConditionFormPage } from '../user-project-participation-condition-form/user-project-participation-condition-form';
import { UserProjectRewardFormPage } from '../user-project-reward-form/user-project-reward-form';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the UserAlarmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-alarm',
  templateUrl: 'user-alarm.html',
})
export class UserAlarmPage {
  alarms = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public httpService: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAlarmPage');
    let loading = this.httpService.presentLoading();
    
    this.httpService.getAlarms()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.alarms = data.data;
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          })
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  accessAlarmItem(link, project_id, alarm_id) {
    let loading = this.httpService.presentLoading();
    
    this.httpService.alarmRead(alarm_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.alarms = data.data;
          switch(link) {
            case "endProject":
            case "newFeedback":
            case "warnProject":
              this.accessProjectCard(project_id);
              break;
            case "newInterview":
              this.openUserProjectInterviewDetailPage(project_id);
              break;
          }
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.accessAlarmItem(link, project_id, alarm_id);
          })
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  back() {
    this.navCtrl.pop();
  }

  openUserProjectInterviewDetailPage(project_id) {
    this.navCtrl.push(UserProjectInterviewDetailPage, { "project_id" : project_id });
  }

  // 진행중
  // 	참여o - 프로젝트 홈
  // 	참여x
  // 		인원 꽉참 - 스토리
  // 		인원 안참
  // 			프로필 노등록 - 프로필 수정 후 참여조건 검사 후 스토리
  // 			프로필 등록 - 참여조건 검사 후 스토리
  // 종료
  // 	참여o
  // 		보상 전 - 보상 페이지
  // 		보상 후 - 스토리
  // 	참여x - 스토리
  accessProjectCard(project_id) {
    let loading = this.httpService.presentLoading();
    let messages = [
      '현재 참여중인 프로젝트입니다!<br/>프로젝트 페이지로 이동하시겠습니까?',
      '아쉽게도 프로젝트 정원이 초과되었습니다!<br/>스토리 페이지로 이동하시겠습니까?',
      '프로젝트에 참가하려면 먼저 프로필을 등록해야 합니다!<br/>프로필 등록 페이지로 이동하시겠습니까?',
      '프로젝트에 참가하려면 먼저 간단한 설문조사에 응해야 합니다!<br/>참가하시겠습니까?',
      '프로젝트를 성공적으로 수행하여 보상을 받을 수 있습니다!<br/>보상 페이지로 이동하시겠습니까?',
      '종료된 프로젝트입니다!<br/>스토리 페이지로 이동하시겠습니까?'
    ]

    this.httpService.getUserAndProjectAndParticipation(project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.project_info.isProceeding) {
            if(data.data.project_participation_info) {
              this.httpService.showConfirmAlert(messages[0], 
                () => {
                  this.openUserProjectHomePage(project_id);
                }
              );
            }
            else {
              if(data.data.project_info.participant_num >= data.data.project_info.max_participant_num) {
                this.httpService.showConfirmAlert(messages[1], 
                  () => {
                    this.openUserProjectStoryPage(project_id);
                  }
                );
              }
              else {
                if(!data.data.age) {
                  this.httpService.showConfirmAlert(messages[2], 
                    () => {
                      this.openUserProfileModificationFormPage();
                    }
                  );
                }
                else {
                  this.httpService.showConfirmAlert(messages[3], 
                    () => {
                      this.openUserProjectParticipationConditionFormPage(project_id);
                    }
                  );
                }
              }
            }
          }
          else {
            if(data.data.project_participation_info) {
              if(!data.data.project_participation_info.project_reward_date) {
                this.httpService.showConfirmAlert(messages[4], 
                  () => {
                    this.openUserProjectRewardFormPage(project_id);
                  }
                );
              }
              else {
                this.httpService.showConfirmAlert(messages[5], 
                  () => {
                    this.openUserProjectStoryPage(project_id);
                  }
                );
              }
            }
            else {
              this.httpService.showConfirmAlert(messages[5], 
                () => {
                  this.openUserProjectStoryPage(project_id);
                }
              );
            }
          }
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.accessProjectCard(project_id);
          })
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  openUserProjectHomePage(project_id) {
    let userProjectHomeModal = this.modalCtrl.create(UserProjectHomePage, { "project_id" : project_id });
    userProjectHomeModal.present();
  }

  openUserProfileModificationFormPage() {
    let userProfileModificationFormModal = this.modalCtrl.create(UserProfileModificationFormPage);
    userProfileModificationFormModal.present();
  }

  openUserProjectStoryPage(project_id) {
    this.appCtrl.getRootNavs()[0].push(UserProjectStoryPage, { "project_id" : project_id });
  }

  openUserProjectParticipationConditionFormPage(project_id) {
    let userProjectParticipationConditionFormModal = this.modalCtrl.create(UserProjectParticipationConditionFormPage, { "project_id" : project_id });
    userProjectParticipationConditionFormModal.present();
  }

  openUserProjectRewardFormPage(project_id) {
    let userProjectRewardFormModal = this.modalCtrl.create(UserProjectRewardFormPage, { "project_id" : project_id });
    userProjectRewardFormModal.present();
  }


}
