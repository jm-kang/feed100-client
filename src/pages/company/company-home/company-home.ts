import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController, App } from 'ionic-angular';

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
      title: '',
      content: '',
    },
    {
      link: 'TutorialPage',
      bg: 'assets/img/feed100-intro-slide2.png',
      title: '',
      content: '',
    },
    {
      link: 'HelpPage',
      bg: 'assets/img/feed100-intro-slide3.png',
      title: '',
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyHomePage');
    this.commonService.isLoadingActive = true;
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
          this.companyService.setAlarmAndInterviewNum();          
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

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
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

  accessProjectCard(project_id) {
    this.companyService.accessProjectCard(this, project_id);
  }

  openCompanyProjectRegistrationPage() {
    let projectRegistrationModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyProjectRegistrationPage'});
    projectRegistrationModal.present();
  }

  openCompanyAlarmPage() {
    this.navCtrl.push('CompanyAlarmPage');
  }

  openCompanyConfigurePage() {
    this.navCtrl.push('CompanyConfigurePage');
  }

  getAlarmNum() {
    return this.companyService.alarmNum;
  }

}
