import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { UserProfileModificationFormPage } from '../user-profile-modification-form/user-profile-modification-form';
import { UserProjectStoryPage } from '../user-project-story/user-project-story';
import { UserProjectParticipationConditionFormPage } from '../user-project-participation-condition-form/user-project-participation-condition-form';

/**
 * Generated class for the UserProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project',
  templateUrl: 'user-project.html',
})
export class UserProjectPage {
  // endScroll:boolean = true;
  // projects = [
  // ];

  // mockProjects = [
  //   {
  //     projectMainImage: 'assets/img/project-main-image1.png',
  //     avatarImage: 'assets/img/company-avatar-image1.png',
  //     nickname: 'Anchor Labs',
  //     projectName: 'ANCHOR CABLE lorem ipsum',
  //     projectSummary: '세계 최초의 스테인레스 스틸 마그네틱 CROSS DEVICE 충전 케이블 및 평생 보증.',
  //     participantNum: '30',
  //     maxParticipantNum: '30',
  //     progressPercent: '100',
  //     progressState: '3일 남음',
  //   },
  //   {
  //     projectMainImage: 'assets/img/project-main-image2.png',
  //     avatarImage: 'assets/img/company-avatar-image2.png',
  //     nickname: 'NEXUM',
  //     projectName: 'AQUA+',
  //     projectSummary: '세계에서 가장 강력한 무선 헤드폰 앰프',
  //     participantNum: '27',
  //     maxParticipantNum: '30',
  //     progressPercent: '90',
  //     progressState: '5일 남음',
  //   },
  //   {
  //     projectMainImage: 'assets/img/project-main-image3.png',
  //     avatarImage: 'assets/img/company-avatar-image3.png',
  //     nickname: 'POLAR SEAL',
  //     projectName: 'PolarSeal Heated Tops',
  //     projectSummary: '버튼 한 번에 따뜻함. 슈퍼 라이트, 편안하게 디자인 된 스마트 히트 탑.',
  //     participantNum: '3',
  //     maxParticipantNum: '30',
  //     progressPercent: '10',
  //     progressState: '6일 남음',
  //   },
  // ];

  projects = [
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    // for (let i = 0; i < 2; i++) {
    //   this.projects.push( this.mockProjects[i] );
    // }
    // console.log('constructor');

  }

  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //     let originalProjectsLength = this.projects.length;
  //     for (let i = originalProjectsLength; i < originalProjectsLength + 2; i++) {
  //       if(i < this.mockProjects.length) {
  //         this.projects.push( this.mockProjects[i] );
  //       }
  //     }

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();

  //     if(this.projects.length == this.mockProjects.length) {
  //       this.endScroll = false;
  //     }
  //   }, 500);
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectPage');
  }

  accessProjectCard() {
    this.openUserProjectParticipationConditionFormPage();
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
