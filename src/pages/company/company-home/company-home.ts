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

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
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
    public companyService: CompanyServiceProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyHomePage');
    let loading = this.commonService.presentLoading();
    
    this.companyService.getCompanyHome()
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

  // 내 프로젝트 or not
  accessProjectCard(project_id) {
    let loading = this.commonService.presentLoading();

    this.companyService.getIsMyProject(project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.is_my_project) {
            this.openCompanyProjectHomePage(project_id);
          }
          else {
            this.openCompanyProjectStoryPage(project_id);
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
