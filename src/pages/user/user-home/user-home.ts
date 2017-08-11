import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController } from 'ionic-angular';

import { AppIntroPage } from '../../common/app-intro/app-intro';
import { TutorialPage } from '../../common/tutorial/tutorial'
import { ManualPage } from '../../common/manual/manual';
import { FaqPage } from '../../common/faq/faq';
import { UserProjectPage } from  '../user-project/user-project';
import { UserNewsfeedPage } from '../user-newsfeed/user-newsfeed';
import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { UserProfileModificationFormPage } from '../user-profile-modification-form/user-profile-modification-form';
import { UserProjectStoryPage } from '../user-project-story/user-project-story';
import { UserProjectParticipationConditionFormPage } from '../user-project-participation-condition-form/user-project-participation-condition-form';
import { UserNewsfeedStoryPage } from '../user-newsfeed-story/user-newsfeed-story';

/**
 * Generated class for the UserHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {
  @ViewChild(Slides) childSlides: Slides;

  // 상단 외부링크 슬라이드
  feed100IntroSlides = [
    {
      link: 'AppIntroPage',
      bg: 'assets/img/feed100-intro-slide1.png',
      title: '린 스타트업의 첫걸음',
      content: 'FEED100은 정성적 데이터를 통해<br>아이디어 검증 및 시장 분석하는 서비스입니다.',
    },
    {
      link: 'TutorialPage',
      bg: 'assets/img/feed100-intro-slide2.png',
      title: '튜토리얼 진행하기',
      content: 'FEED100을 사용하기 전에<br>미리 FEED100을 경험해보세요.',
    },
    {
      link: 'ManualPage',
      bg: 'assets/img/feed100-intro-slide3.png',
      title: '매뉴얼 확인하기',
      content: '매뉴얼을 확인해보세요<br>FEED100이 필요한 이유를 찾을 수 있습니다.',
    },
    {
      link: 'FaqPage',
      bg: 'assets/img/feed100-intro-slide4.png',
      title: 'FEED100의 빠른 대답',
      content: '',
    }
  ];
  
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

  // 새로운 프로젝트
  newProjects = [
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

  // 새로운 뉴스피드
  newNewsfeeds = [
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image1.png',
      newsfeedName: 'Singled [Out] : 선택의 시대에 싱글 여성에 관한 영화',
    },
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image2.png',
      newsfeedName: '무연 커피 소다 | 운전 가능',
    },
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image3.png',
      newsfeedName: '레오나르도 다빈치, 베르메르 & 렘브란트 액션 피규어',
    },
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image4.png',
      newsfeedName: '백색 방랑자 : 기후 변화 사운드 트랙',
    },
    {
      newsfeedMainImage: 'assets/img/newsfeed-main-image5.png',
      newsfeedName: 'Salem Cinema의 디지털 프로젝션 업그레이드 챌린지',
    }
  ];

  tab2Root = UserProjectPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserHomePage');
  }

  openPageWrapper(page) {
    switch(page) {
      case 'AppIntroPage':
        this.openAppIntroPage();
        break;
      case 'TutorialPage':
        this.openTutorialPage();
        break;
      case 'ManualPage':
        this.openManualPage();
        break;
      case 'FaqPage':
        this.openFaqPage();
        break;
    }
  }

  openUserProjectPage() {
    this.navCtrl.parent.select(1);
  }

  openUserNewsfeedPage() {
    this.navCtrl.parent.select(2);
  }

  openAppIntroPage() {
    let appIntroModal = this.modalCtrl.create(AppIntroPage);
    appIntroModal.present();
  }

  openTutorialPage() {
    let tutorialModal = this.modalCtrl.create(TutorialPage);
    tutorialModal.present();
  }

  openManualPage() {
    let manualModal = this.modalCtrl.create(ManualPage);
    manualModal.present();
  }

  openFaqPage() {
    let faqModal = this.modalCtrl.create(FaqPage);
    faqModal.present();
  }

  openUserProjectHomePage() {
    let userProjectHomeModal = this.modalCtrl.create(UserProjectHomePage);
    userProjectHomeModal.present();
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

  openUserNewsfeedStoryPage() {
    this.navCtrl.push(UserNewsfeedStoryPage);
  }
}
