import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { UserProjectInterviewDetailPage } from '../user-project-interview-detail/user-project-interview-detail';
import { UserProjectRewardFormPage } from '../user-project-reward-form/user-project-reward-form';
import { UserProfileModificationFormPage } from '../user-profile-modification-form/user-profile-modification-form';
import { UserProjectStoryPage } from '../user-project-story/user-project-story';
import { UserProjectParticipationConditionFormPage } from '../user-project-participation-condition-form/user-project-participation-condition-form';


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
  alarms = [
    {
      avatarImage: "assets/img/company-avatar-image1.png",
      alarmTag: "새 프로젝트",
      alarmTitle: "ANCHOR CABLE",
      alarmContent: "지금 바로 프로젝트에 참여해 보세요!",
      alarmRegistrationDate: "오후 8:20",
      isNew: true,
      link: "newProject"
    },
    {
      avatarImage: "assets/img/company-avatar-image2.png",
      alarmTag: "새 피드백",
      alarmTitle: "AQUA+",
      alarmContent: "새로운 피드백에 의견을 남겨주세요!",
      alarmRegistrationDate: "어제",
      isNew: true,
      link: "newFeedback"
    },
    {
      avatarImage: "assets/img/company-avatar-image1.png",
      alarmTag: "새 인터뷰",
      alarmTitle: "ANCHOR CABLE",
      alarmContent: "새로운 인터뷰에 의견을 남겨주세요!",
      alarmRegistrationDate: "2일 전",
      isNew: false,
      link: "newInterview"
    },
    {
      avatarImage: "assets/img/company-avatar-image3.png",
      alarmTag: "프로젝트 마감",
      alarmTitle: "PolarSeal Heated Tops",
      alarmContent: "프로젝트 마감 하루전입니다.",
      alarmRegistrationDate: "7월 31일",
      isNew: true,
      link: "warnProject"
    },
    {
      avatarImage: "assets/img/company-avatar-image2.png",
      alarmTag: "프로젝트 완료",
      alarmTitle: "AQUA+",
      alarmContent: "보상을 받아 보세요!",
      alarmRegistrationDate: "2016.9.12",
      isNew: false,
      link: "endProject"
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAlarmPage');
  }

  accessAlarmItem(link: String) {
    switch(link) {
      case "newProject":
        this.accessProjectCard();
        break;
      case "newFeedback":
        this.accessNewFeedbackAlarmItem();
        break;
      case "newInterview":
        this.openUserProjectInterviewDetailPage();
        break;
      case "warnProject":
        this.accessWarnProjectAlarmItem();
        break;
      case "endProject":
        this.accessEndProjectAlarmItem();
    }
  }

  back() {
    this.navCtrl.pop();
  }

  openUserProjectHomePage() {
    let userProjectHomeModal = this.modalCtrl.create(UserProjectHomePage);
    userProjectHomeModal.present();
  }

  openUserProjectInterviewDetailPage() {
    this.navCtrl.push(UserProjectInterviewDetailPage);
  }

  accessProjectCard() {
    // 프로필 수정 페이지 이동 (프로필 작성을 하지 않은 경우)
    // 프로젝트 스토리 이동 (인원이 다 찼거나 프로젝트 기간이 끝난 경우)
    // 프로젝트 참여조건 페이지 이동 (프로젝트 기간이고 인원이 다 차지 않은 경우)
    // 프로젝트 홈 페이지 이동 (프로젝트에 참여했고 프로젝트 기간인 경우)
    this.openUserProjectParticipationConditionFormPage();
  }

  accessNewFeedbackAlarmItem() {
    // 프로젝트 홈 페이지 이동 (프로젝트 기간이 끝나지 않은 경우)
    // 보상 페이지 이동 (프로젝트가 기간이 지나고 보상을 받지 않은 경우)
    // 프로젝트 스토리 이동 (프로젝트가 기간이 지나고 보상을 받은 경우)
    this.openUserProjectHomePage();
  }

  accessWarnProjectAlarmItem() {
    // 프로젝트 홈 페이지 이동 (프로젝트 기간이 끝나지 않았고 마감 하루전에서 기간 끝날때까지)
    // 보상 페이지 이동 (프로젝트가 기간이 지나고 보상을 받지 않은 경우)
    // 프로젝트 스토리 이동 (프로젝트가 기간이 지나고 보상을 받은 경우)
    this.openUserProjectHomePage();
  }

  accessEndProjectAlarmItem() {
    // 보상 페이지 이동 (프로젝트 기간이 끝나고 보상을 받지 않은 경우)
    // 프로젝트 스토리 이동 (프로젝트 기간이 끝나고 보상을 받고나서 다시 알림 아이템을 클릭한 경우)
    this.openUserProjectRewardPage();
  }

  openUserProjectRewardPage() {
    let userProjectRewardModal = this.modalCtrl.create(UserProjectRewardFormPage);
    userProjectRewardModal.present();
  }

  openUserProfileModificationFormPage() {
    let userProfileModificationFormModal = this.modalCtrl.create(UserProfileModificationFormPage);
    userProfileModificationFormModal.present();
  }

  openUserProjectStoryPage() {
    this.navCtrl.push(UserProjectStoryPage);
  }

  openUserProjectParticipationConditionFormPage() {
    let userProjectParticipationConditionFormModal = this.modalCtrl.create(UserProjectParticipationConditionFormPage);
    userProjectParticipationConditionFormModal.present();
  }
}
