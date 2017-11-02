import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserMypagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-mypage',
  templateUrl: 'user-mypage.html',
})
export class UserMypagePage {
  avatarImage: String = '';
  level = 0;
  levelClass: String = '';
  nickname: String = '';
  username;
  introduction;
  point = 0;
  exp = 0;
  maxExp = 0;
  expPercent = '';
  proceedingProjectNum = 0;
  rewardProjectNum = 0;
  endProjectNum = 0;
  segmentProjectCondition: String = '';

  // 진행중인 프로젝트
  proceedingProjects = [];

  rewardProjects = [];

  endProjects = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
      this.segmentProjectCondition = "proceedingProject";
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserMypagePage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getUserInfo()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          // 추가된 문장
          this.userService.alarmNum = data.data.alarm_num;
          // 추가된 문장 끝
          this.avatarImage = data.data.avatar_image;
          this.level = data.data.level;
          this.levelClass = data.data.level_class;
          this.nickname = data.data.nickname;
          this.username = data.data.username;
          this.introduction = data.data.introduction;
          this.point = data.data.point;
          this.exp = data.data.experience_point;
          this.maxExp = data.data.required_experience_point;
          this.expPercent = (this.maxExp != 0) ? ((this.exp / this.maxExp) * 100).toFixed(1) : "0";
          this.proceedingProjects = data.data.proceeding_projects;
          this.rewardProjects = data.data.reward_projects;
          this.endProjects = data.data.end_projects;
          this.proceedingProjectNum = this.proceedingProjects.length;
          this.rewardProjectNum = this.rewardProjects.length;
          this.endProjectNum = this.endProjects.length;
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

  openUserAccountModificationFormPage() {
    let userAccountModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {
      page: 'UserAccountModificationFormPage',
      params: {
        "avatarImage" : this.avatarImage,
        "nickname" : this.nickname,
        "username" : this.username,
        "introduction" : this.introduction
      }
    });
    userAccountModificationFormModal.present();
    userAccountModificationFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();
        }
      }
    );
  }

  openUserProjectPage() {
    this.navCtrl.parent.select(1);
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
    let loading = this.commonService.presentLoading();
    let messages = [
      '현재 참여중인 프로젝트입니다!<br/>프로젝트 페이지로 이동하시겠습니까?',
      '아쉽게도 프로젝트 정원이 초과되었습니다!<br/>스토리 페이지로 이동하시겠습니까?',
      '프로젝트에 참가하려면 먼저 프로필을 등록해야 합니다!<br/>프로필 등록 페이지로 이동하시겠습니까?',
      '프로젝트에 참가하려면 먼저 간단한 설문조사에 응해야 합니다!<br/>참가하시겠습니까?',
      '프로젝트를 성공적으로 수행하여 보상을 받을 수 있습니다!<br/>보상 페이지로 이동하시겠습니까?',
      '종료된 프로젝트입니다!<br/>스토리 페이지로 이동하시겠습니까?'
    ]

    this.userService.getUserAndProjectAndParticipation(project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.project_info.isProceeding) {
            if(data.data.project_participation_info) {
              this.commonService.showConfirmAlert(messages[0], 
                () => {
                  this.openUserProjectHomePage(project_id);
                }
              );
            }
            else {
              if(data.data.project_info.participant_num >= data.data.project_info.max_participant_num) {
                this.commonService.showConfirmAlert(messages[1], 
                  () => {
                    this.openUserProjectStoryPage(project_id);
                  }
                );
              }
              else {
                if(!data.data.age) {
                  this.commonService.showConfirmAlert(messages[2], 
                    () => {
                      this.openUserProfileModificationFormPage();
                    }
                  );
                }
                else {
                  this.commonService.showConfirmAlert(messages[3], 
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
                this.commonService.showConfirmAlert(messages[4], 
                  () => {
                    this.openUserProjectRewardFormPage(project_id);
                  }
                );
              }
              else {
                this.commonService.showConfirmAlert(messages[5], 
                  () => {
                    this.openUserProjectStoryPage(project_id);
                  }
                );
              }
            }
            else {
              this.commonService.showConfirmAlert(messages[5], 
                () => {
                  this.openUserProjectStoryPage(project_id);
                }
              );
            }
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.accessProjectCard(project_id);
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  openUserProjectHomePage(project_id) {
    // let userProjectHomeModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectHomePage', params: { "project_id" : project_id }});
    // userProjectHomeModal.present();
    this.navCtrl.push('UserProjectHomePage', { "project_id" : project_id });
  }

  openUserProfileModificationFormPage() {
    let userProfileModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProfileModificationFormPage'});
    userProfileModificationFormModal.present();
  }

  openUserProjectStoryPage(project_id) {
    this.navCtrl.push('UserProjectStoryPage', { "project_id" : project_id });
  }

  openUserProjectParticipationConditionFormPage(project_id) {
    let userProjectParticipationConditionFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectParticipationConditionFormPage', params: { "project_id" : project_id }});
    userProjectParticipationConditionFormModal.present();
  }

  openUserProjectRewardFormPage(project_id) {
    let userProjectRewardFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectRewardFormPage', params: { "project_id" : project_id }});
    userProjectRewardFormModal.present();
    userProjectRewardFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();
        }
      }
    );
  }

  // 추가된 함수

  getAlarmNum() {
    return this.userService.alarmNum;
  }

  openUserAlarmPage() {
    this.navCtrl.push('UserAlarmPage');
  }

  openUserConfigurePage() {
    this.navCtrl.push('UserConfigurePage');
  }

  // 추가된 함수 끝

}
