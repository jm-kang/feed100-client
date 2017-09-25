import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { UserAccountModificationFormPage } from '../user-account-modification-form/user-account-modification-form';

import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { UserProfileModificationFormPage } from '../user-profile-modification-form/user-profile-modification-form';
import { UserProjectStoryPage } from '../user-project-story/user-project-story';
import { UserProjectParticipationConditionFormPage } from '../user-project-participation-condition-form/user-project-participation-condition-form';
import { UserProjectRewardFormPage } from '../user-project-reward-form/user-project-reward-form';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

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
  // avatarImage: String = '';
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
  proceedingProjects = [
    {
      projectMainImage: 'assets/img/project-main-image1.png',
      avatarImage: 'assets/img/company-avatar-image1.png',
      nickname: 'Anchor Labs',
      projectName: 'ANCHOR CABLE lorem ipsum',
      projectSummary: '세계 최초의 스테인레스 스틸 마그네틱 CROSS DEVICE 충전 케이블 및 평생 보증.',
      participantNum: '30',
      maxParticipantNum: '30',
      progressPercent: '100',
      progressState: '3일 남음',
    },
    {
      projectMainImage: 'assets/img/project-main-image2.png',
      avatarImage: 'assets/img/company-avatar-image2.png',
      nickname: 'NEXUM',
      projectName: 'AQUA+',
      projectSummary: '세계에서 가장 강력한 무선 헤드폰 앰프',
      participantNum: '27',
      maxParticipantNum: '30',
      progressPercent: '90',
      progressState: '5일 남음',
    },
  ];

  rewardProjects = [
    {
      projectMainImage: 'assets/img/project-main-image3.png',
      avatarImage: 'assets/img/company-avatar-image3.png',
      nickname: 'POLAR SEAL',
      projectName: 'PolarSeal Heated Tops',
      projectSummary: '버튼 한 번에 따뜻함. 슈퍼 라이트, 편안하게 디자인 된 스마트 히트 탑.',
      participantNum: '3',
      maxParticipantNum: '30',
      progressPercent: '10',
      progressState: '6일 남음',
    },
  ];

  endProjects = [
    {
      projectMainImage: 'assets/img/project-main-image2.png',
      avatarImage: 'assets/img/company-avatar-image2.png',
      nickname: 'NEXUM',
      projectName: 'AQUA+',
      projectSummary: '세계에서 가장 강력한 무선 헤드폰 앰프',
      participantNum: '27',
      maxParticipantNum: '30',
      progressPercent: '90',
      progressState: '5일 남음',
    },
    {
      projectMainImage: 'assets/img/project-main-image1.png',
      avatarImage: 'assets/img/company-avatar-image1.png',
      nickname: 'Anchor Labs',
      projectName: 'ANCHOR CABLE lorem ipsum',
      projectSummary: '세계 최초의 스테인레스 스틸 마그네틱 CROSS DEVICE 충전 케이블 및 평생 보증.',
      participantNum: '30',
      maxParticipantNum: '30',
      progressPercent: '100',
      progressState: '3일 남음',
    },
    {
      projectMainImage: 'assets/img/project-main-image3.png',
      avatarImage: 'assets/img/company-avatar-image3.png',
      nickname: 'POLAR SEAL',
      projectName: 'PolarSeal Heated Tops',
      projectSummary: '버튼 한 번에 따뜻함. 슈퍼 라이트, 편안하게 디자인 된 스마트 히트 탑.',
      participantNum: '3',
      maxParticipantNum: '30',
      progressPercent: '10',
      progressState: '6일 남음',
    },
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public appCtrl: App,
    public httpService: HttpServiceProvider) {
    this.segmentProjectCondition = "proceedingProject";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserMypagePage');
    let loading = this.httpService.presentLoading();
    
    this.httpService.getUserInfo()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.avatarImage = data.data.avatar_image;
          this.level = data.data.level;
          this.levelClass = data.data.level_class;
          this.nickname = data.data.nickname;
          this.username = data.data.username;
          this.introduction = data.data.introduction;
          this.point = data.data.point;
          this.exp = data.data.experience_point;
          this.maxExp = data.data.required_experience_point;
          this.expPercent = ((this.exp / this.maxExp) * 100).toFixed(1);
          this.proceedingProjects = data.data.proceeding_projects;
          this.rewardProjects = data.data.reward_projects;
          this.endProjects = data.data.end_projects;
          this.proceedingProjectNum = this.proceedingProjects.length;
          this.rewardProjectNum = this.rewardProjects.length;
          this.endProjectNum = this.endProjects.length;
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

  openUserAccountModificationFormPage() {
    let userAccountModificationFormModal = this.modalCtrl.create(UserAccountModificationFormPage, {
      "avatarImage" : this.avatarImage,
      "nickname" : this.nickname,
      "username" : this.username,
      "introduction" : this.introduction
    });
    userAccountModificationFormModal.present();
    userAccountModificationFormModal.onWillDismiss(
      (data) => {
        if(data == "modified") {
          this.ionViewDidLoad();
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
