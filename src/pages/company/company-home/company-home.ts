import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController, App } from 'ionic-angular';

import { AppIntroPage } from '../../common/app-intro/app-intro';
import { TutorialPage } from '../../common/tutorial/tutorial'
import { ManualPage } from '../../common/manual/manual';
import { FaqPage } from '../../common/faq/faq';
import { CompanyNewsfeedStoryPage } from '../company-newsfeed-story/company-newsfeed-story';
import { CompanyProjectRegistrationPage } from '../company-project-registration/company-project-registration';

import { CompanyProjectHomePage } from '../company-project-home/company-project-home';
import { CompanyProjectStoryPage } from '../company-project-story/company-project-story';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the CompanyHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-home',
  templateUrl: 'company-home.html',
})
export class CompanyHomePage {
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
      project_id: 1,
      project_main_image: 'assets/img/project-main-image1.png',
      project_end_date: '2017-09-20 00:00:00',
      participant_num: 20,
      max_participant_num: 30,
      project_name: '프로젝트 이름',
      project_summary: '프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명',
      avatar_image: 'assets/img/company-avatar-image1.png',
      nickname: '닉네임',
    },
    {
      project_id: 2,
      project_main_image: 'assets/img/project-main-image2.png',
      project_end_date: '2017-09-22 00:00:00',
      participant_num: 30,
      max_participant_num: 30,
      project_name: '프로젝트 이름2',
      project_summary: '프로젝트 설명2 프로젝트 설명2 프로젝트 설명2 프로젝트 설명2 프로젝트 설명2 프로젝트 설명2 프로젝트 설명2',
      avatar_image: 'assets/img/company-avatar-image2.png',
      nickname: '닉네임2',
    }
  ];

  // 새로운 프로젝트
  newProjects = [
    {
      project_id: 1,
      project_main_image: 'assets/img/project-main-image1.png',
      project_end_date: '2017-09-20 00:00:00',
      participant_num: 20,
      max_participant_num: 30,
      project_name: '프로젝트 이름',
      project_summary: '프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명',
      avatar_image: 'assets/img/company-avatar-image1.png',
      nickname: '닉네임',
    },
    {
      project_id: 2,
      project_main_image: 'assets/img/project-main-image2.png',
      project_end_date: '2017-09-22 00:00:00',
      participant_num: 30,
      max_participant_num: 30,
      project_name: '프로젝트 이름2',
      project_summary: '프로젝트 설명2 프로젝트 설명2 프로젝트 설명2 프로젝트 설명2 프로젝트 설명2 프로젝트 설명2 프로젝트 설명2',
      avatar_image: 'assets/img/company-avatar-image2.png',
      nickname: '닉네임2',
    }
  ];

  // 새로운 뉴스피드
  newNewsfeeds = [
    {
      newsfeed_id:1,
      newsfeed_main_image: 'assets/img/newsfeed-main-image1.png',
      newsfeed_name: '뉴스피드 이름 뉴스피드 이름 뉴스피드 이름',
    },
    {
      newsfeed_id:2,
      newsfeed_main_image: 'assets/img/newsfeed-main-image2.png',
      newsfeed_name: '뉴스피드 이름2',
    },
    {
      newsfeed_id:3,
      newsfeed_main_image: 'assets/img/newsfeed-main-image3.png',
      newsfeed_name: '뉴스피드 이름3 뉴스피드 이름3 뉴스피드 이름3 뉴스피드 이름3 뉴스피드 이름3',
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public httpService: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyHomePage');
    // let loading = this.httpService.presentLoading();
    
    // this.httpService.getCompanyHome()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.proceedingProjects = data.data.proceeding_projects;
    //       this.newProjects = data.data.new_projects;
    //       this.newNewsfeeds = data.data.new_newsfeeds;
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidLoad();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );
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

  openCompanyProjectPage() {
    this.navCtrl.parent.select(1);
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

  openCompanyNewsfeedStoryPage() {
    this.appCtrl.getRootNav().push(CompanyNewsfeedStoryPage);
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
    // let loading = this.httpService.presentLoading();
    // let messages = [
    //   '현재 참여중인 프로젝트입니다!<br/>프로젝트 페이지로 이동하시겠습니까?',
    //   '아쉽게도 프로젝트 정원이 초과되었습니다!<br/>스토리 페이지로 이동하시겠습니까?',
    //   '프로젝트에 참가하려면 먼저 프로필을 등록해야 합니다!<br/>프로필 등록 페이지로 이동하시겠습니까?',
    //   '프로젝트에 참가하려면 먼저 간단한 설문조사에 응해야 합니다!<br/>참가하시겠습니까?',
    //   '프로젝트를 성공적으로 수행하여 보상을 받을 수 있습니다!<br/>보상 페이지로 이동하시겠습니까?',
    //   '종료된 프로젝트입니다!<br/>스토리 페이지로 이동하시겠습니까?'
    // ]

    // this.httpService.getCompanyAndProjectAndParticipation(project_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       // 기업의 프로젝트이면, CompanyProjectHomePage로 아닐경우에는 CompanyProjectStoryPage로
    //       // if(data.data.project_info.isProceeding) {
    //       //   if(data.data.project_participation_info) {
    //       //     this.httpService.showConfirmAlert(messages[0], 
    //       //       () => {
    //       //         this.openCompanyProjectHomePage(project_id);
    //       //       }
    //       //     );
    //       //   }
    //       //   else {
    //       //     if(data.data.project_info.participant_num >= data.data.project_info.max_participant_num) {
    //       //       this.httpService.showConfirmAlert(messages[1], 
    //       //         () => {
    //       //           this.openCompanyProjectStoryPage(project_id);
    //       //         }
    //       //       );
    //       //     }
    //       //     else {
    //       //       if(!data.data.age) {
    //       //         this.httpService.showConfirmAlert(messages[2], 
    //       //           () => {
    //       //             this.openCompanyProfileModificationFormPage();
    //       //           }
    //       //         );
    //       //       }
    //       //       else {
    //       //         this.httpService.showConfirmAlert(messages[3], 
    //       //           () => {
    //       //             this.openCompanyProjectParticipationConditionFormPage(project_id);
    //       //           }
    //       //         );
    //       //       }
    //       //     }
    //       //   }
    //       // }
    //       // else {
    //       //   if(data.data.project_participation_info) {
    //       //     if(!data.data.project_participation_info.project_reward_date) {
    //       //       this.httpService.showConfirmAlert(messages[4], 
    //       //         () => {
    //       //           this.openCompanyProjectRewardFormPage(project_id);
    //       //         }
    //       //       );
    //       //     }
    //       //     else {
    //       //       this.httpService.showConfirmAlert(messages[5], 
    //       //         () => {
    //       //           this.openCompanyProjectStoryPage(project_id);
    //       //         }
    //       //       );
    //       //     }
    //       //   }
    //       //   else {
    //       //     this.httpService.showConfirmAlert(messages[5], 
    //       //       () => {
    //       //         this.openCompanyProjectStoryPage(project_id);
    //       //       }
    //       //     );
    //       //   }
    //       // }
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.accessProjectCard(project_id);
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );

    this.openCompanyProjectHomePage(project_id);

  }

  openCompanyProjectHomePage(project_id) {
    let companyProjectHomeModal = this.modalCtrl.create(CompanyProjectHomePage, { "project_id" : project_id });
    companyProjectHomeModal.present();
  }

  openCompanyProjectStoryPage(project_id) {
    this.appCtrl.getRootNavs()[0].push(CompanyProjectStoryPage, { "project_id" : project_id });
  }

  openCompanyProjectRegistrationPage() {
    let projectRegistrationModal = this.modalCtrl.create(CompanyProjectRegistrationPage);
    projectRegistrationModal.present();
  }
}
