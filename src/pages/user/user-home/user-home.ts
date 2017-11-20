import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
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
      title: '도움말 확인하기',
      content: '도움말을 확인해보세요<br>FEED100이 필요한 이유를 찾을 수 있습니다.',
    },
    // {
    //   link: 'FaqPage',
    //   bg: 'assets/img/feed100-intro-slide4.png',
    //   title: 'FEED100의 빠른 대답',
    //   content: '',
    // }
  ];
  
  // 진행중인 프로젝트
  proceedingProjects = [];

  // 새로운 프로젝트
  newProjects = [];

  // 새로운 뉴스피드
  newNewsfeeds = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter UserHomePage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getUserHome()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.proceedingProjects = data.data.proceeding_projects;
          this.newProjects = data.data.new_projects;
          this.newNewsfeeds = data.data.new_newsfeeds;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidEnter();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
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

  openAppIntroPage() {
    let appIntroModal = this.modalCtrl.create('ModalWrapperPage', {page: 'AppIntroPage'});
    appIntroModal.present();
  }

  openTutorialPage() {
    let tutorialModal = this.modalCtrl.create('ModalWrapperPage', {page: 'TutorialPage'});
    tutorialModal.present();
  }

  openManualPage() {
    let manualModal = this.modalCtrl.create('ModalWrapperPage', {page: 'ManualPage'});
    manualModal.present();
  }

  openFaqPage() {
    let faqModal = this.modalCtrl.create('ModalWrapperPage', {page: 'FaqPage'});
    faqModal.present();
  }

  openUserNewsfeedStoryPage(newsfeed_id) {
    this.navCtrl.push('UserNewsfeedStoryPage', { "newsfeed_id" : newsfeed_id });
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
          // 추가된 문장
          this.userService.alarmNum = data.data.alarm_num;
          // 추가된 문장 끝
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
  }

  // 추가된 함수

  openProjectPage() {
    this.navCtrl.parent.select(1);
  }

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
