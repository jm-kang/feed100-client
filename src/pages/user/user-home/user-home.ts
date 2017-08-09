import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { UserAlarmPage } from '../user-alarm/user-alarm';
import { UserConfigurePage } from '../user-configure/user-configure';
import { AppIntroPage } from '../../common/app-intro/app-intro';
import { TutorialPage } from '../../common/tutorial/tutorial'
import { ManualPage } from '../../common/manual/manual';
import { FaqPage } from '../../common/faq/faq';
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
      bg: 'assets/img/feed100-intro-slide1.png',
      content: '린스타트의 첫걸음<br>FEED100과 함께하세요.',
    },
    {
      bg: 'assets/img/feed100-intro-slide2.png',
      content: '지금 바로 FEED100을 경험해보세요.',
    },
    {
      bg: 'assets/img/feed100-intro-slide3.png',
      content: 'FEED100은 정성적 데이터를 통해<br>아이디어 검증 및 시장 분석을 해주는 서비스입니다.',
    },
    {
      bg: 'assets/img/feed100-intro-slide4.png',
      content: 'FEED100의 빠른 대답!',
    }
  ];
  
  // 진행중인 프로젝트
  proceedigProjects = [
    {
      projectMainImage: '',
      avatarImage: '',
      nickname: '',
      projectName: '',
      projectSummary: '',
      participantNum: '',
      progressState: '',
    },
    {
      projectMainImage: '',
      avatarImage: '',
      nickname: '',
      projectName: '',
      projectSummary: '',
      participantNum: '',
      progressState: '',
    },
    {
      projectMainImage: '',
      avatarImage: '',
      nickname: '',
      projectName: '',
      projectSummary: '',
      participantNum: '',
      progressState: '',
    },
  ];

  // 새로운 프로젝트
  newProjects = [
    {
      projectMainImage: '',
      avatarImage: '',
      nickname: '',
      projectName: '',
      projectSummary: '',
      participantNum: '',
      progressState: '',
    },
    {
      projectMainImage: '',
      avatarImage: '',
      nickname: '',
      projectName: '',
      projectSummary: '',
      participantNum: '',
      progressState: '',
    },
    {
      projectMainImage: '',
      avatarImage: '',
      nickname: '',
      projectName: '',
      projectSummary: '',
      participantNum: '',
      progressState: '',
    },
  ];

  // 새로운 뉴스피드
  newNewsfeeds = [
    {
      newsfeedMainImage: '',
      newsfeedName: '',
    },
    {
      newsfeedMainImage: '',
      newsfeedName: '',
    },
    {
      newsfeedMainImage: '',
      newsfeedName: '',
    },
    {
      newsfeedMainImage: '',
      newsfeedName: '',
    },
    {
      newsfeedMainImage: '',
      newsfeedName: '',
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserHomePage');
  }

  openUserAlarmPage() {
    this.navCtrl.push(UserAlarmPage);
  }

  openUserConfigurePage() {
    this.navCtrl.push(UserConfigurePage);
  }
  
  openAppIntroPage() {
    this.navCtrl.push(AppIntroPage);
  }

  openTutorialPage() {
    this.navCtrl.push(TutorialPage);
  }

  openManualPage() {
    this.navCtrl.push(ManualPage);
  }

  openFaqPage() {
    this.navCtrl.push(FaqPage);
  }

  openUserProjectHomePage() {
    this.navCtrl.push(UserProjectHomePage);
  }

  accessProjectCard() {
    this.openUserProjectParticipationConditionFormPage();
  }

  openUserProfileModificationFormPage() {
    this.navCtrl.push(UserProfileModificationFormPage);
  }

  openUserProjectStoryPage() {
    this.navCtrl.push(UserProjectStoryPage);
  }

  openUserProjectParticipationConditionFormPage() {
    this.navCtrl.push(UserProjectParticipationConditionFormPage);
  }

  openUserNewsfeedStoryPage() {
    this.navCtrl.push(UserNewsfeedStoryPage);
  }
}
