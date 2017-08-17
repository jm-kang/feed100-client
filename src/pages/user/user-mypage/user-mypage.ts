import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

// import { LoginPage } from  '../../common/login/login';
import { UserProjectPage } from  '../user-project/user-project';
import { UserAccountModificationFormPage } from '../user-account-modification-form/user-account-modification-form';
import { UserProfileModificationFormPage } from '../user-profile-modification-form/user-profile-modification-form';
import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { UserProjectRewardFormPage } from '../user-project-reward-form/user-project-reward-form';
import { UserProjectStoryPage } from '../user-project-story/user-project-story';

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
  avatarImage: String = '';
  level = 0;
  levelClass: String = '';
  nickname: String = '';
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
    public httpService: HttpServiceProvider) {
    this.segmentProjectCondition = "proceedingProject";
    this.proceedingProjectNum = this.proceedingProjects.length;
    this.rewardProjectNum = this.rewardProjects.length;
    this.endProjectNum = this.endProjects.length;
  }

  openUserProjectPage() {
    this.navCtrl.parent.select(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserMypagePage');
    this.httpService.getUserInfo()
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.avatarImage = data.data.avatar_image;
          this.level = data.data.level;
          this.levelClass = data.data.level_class;
          this.nickname = data.data.nickname;
          this.point = data.data.point;
          this.exp = data.data.experience_point;
          this.maxExp = data.data.required_experience_point;
          this.expPercent = ((this.exp / this.maxExp) * 100).toFixed(1);
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
    let userAccountModificationFormModal = this.modalCtrl.create(UserAccountModificationFormPage);
    userAccountModificationFormModal.present();
  }

  openUserProfileModificationFormPage() {
    let userProfileModificationFormModal = this.modalCtrl.create(UserProfileModificationFormPage);
    userProfileModificationFormModal.present();
  }

  openUserProjectHomePage() {
    let userProjectHomeModal = this.modalCtrl.create(UserProjectHomePage);
    userProjectHomeModal.present();
  }

  openUserProjectRewardFormPage() {
    let userProjectRewardFormModal = this.modalCtrl.create(UserProjectRewardFormPage);
    userProjectRewardFormModal.present();
  }

  openUserProjectStoryPage() {
    this.navCtrl.push(UserProjectStoryPage);
  }

}
