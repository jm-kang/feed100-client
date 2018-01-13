import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

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
      title: '가치를 같이 만들어가요!',
      content: '기업은 유저가 원하는 가치가 무엇인지!<br/>유저는 기업의 서비스를 더욱 가치있게!',
    },
    {
      link: 'TutorialPage',
      bg: 'assets/img/feed100-intro-slide2.png',
      title: '이렇게 진행합니다!',
      content: 'FEED100 서비스 튜토리얼을 확인해 주세요.<br/>단계별로 어떻게 진행하는지 확인할 수 있습니다.',
    },
    {
      link: 'HelpPage',
      bg: 'assets/img/feed100-intro-slide3.png',
      title: '어려움이 있으신가요?',
      content: '궁금한 점이 있다면 도움말을 확인해 보세요!<br/>여러분을 위하여 최선을 다하겠습니다.',
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
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyHomePage');
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
          this.getAlarmAndInterviewNum();          
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  getAlarmAndInterviewNum() {
    this.companyService.getAlarmAndInterviewNum()
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.companyService.alarmNum = data.data.alarm_num;
          this.companyService.interviewNum = data.data.interview_num;
          this.badge.set(data.data.alarm_num);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    refresher.complete();
  }

  openPageWrapper(page) {
    switch(page) {
      case 'AppIntroPage':
        this.openAppIntroPage();
        break;
      case 'TutorialPage':
        this.openCompanyTutorialPage();
        break;
      case 'HelpPage':
        this.openCompanyHelpPage();
        break;
    }
  }

  openCompanyProjectPage() {
    this.navCtrl.parent.select(1);
  }

  openAppIntroPage() {
    let appIntroModal = this.modalCtrl.create('ModalWrapperPage', {page: 'AppIntroPage'});
    appIntroModal.present();
  }

  openCompanyTutorialPage() {
    this.navCtrl.push('CompanyTutorialPage');
  }

  openCompanyHelpPage() {
    let manualModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyHelpPage'});
    manualModal.present();
  }

  openCompanyNewsfeedStoryPage(newsfeed_id) {
    this.navCtrl.push('CompanyNewsfeedStoryPage', { "newsfeed_id" : newsfeed_id });
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
    // let companyProjectHomeModal = this.modalCtrl.create(CompanyProjectHomePage, { "project_id" : project_id });
    // companyProjectHomeModal.present();
    this.navCtrl.push('CompanyProjectHomePage', { "project_id" : project_id });
  }

  openCompanyProjectStoryPage(project_id) {
    this.navCtrl.push('CompanyProjectStoryPage', { "project_id" : project_id });
  }

  openCompanyProjectRegistrationPage() {
    let projectRegistrationModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyProjectRegistrationPage'});
    projectRegistrationModal.present();
  }

  openCompanyAlarmPage() {
    // this.navCtrl.push(CompanyAlarmPage);
    this.navCtrl.push('CompanyAlarmPage');
  }

  openCompanyConfigurePage() {
    // this.navCtrl.push(CompanyConfigurePage);
    this.navCtrl.push('CompanyConfigurePage');
  }

  getAlarmNum() {
    return this.companyService.alarmNum;
  }

}
