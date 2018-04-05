import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from './../../../providers/company-service/company-service';


/**
 * Generated class for the CompanyProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-home',
  templateUrl: 'company-project-home.html',
})
export class CompanyProjectHomePage {
  isProjectProceeding:boolean = true;
  project_name: string = "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십";
  project_main_image: string = "./../../assets/img/project-main-image2.png"
  first_impression_score: number = 7.5;
  participants_num: number = 30;
  project_end_date = "2018-04-04 00:00:00";
  man_percent: number = 80;
  woman_percent: number = 20;
  max_value: number;
  ages = [
    {
      title: "10대",
      percent: 10,
    },
    {
      title: "20대",
      percent: 30,
    },
    {
      title: "30대",
      percent: 20,
    },
    {
      title: "40대",
      percent: 15,
    },
    {
      title: "50대+",
      percent: 5,
    }
  ];

  interviews = [
    {
      project_participant_id: 1,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "우리형",
      content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
      interview_answer_registration_date: "2018-03-20 00:00:00",
      interview_num: 2,
    },
    {
      project_participant_id: 1,
      avatar_image: "./../../assets/img/user-avatar-image-man2.png",
      nickname: "우리형",
      content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
      interview_answer_registration_date: "2018-03-20 00:00:00",
      interview_num: 2,
    },
    {
      project_participant_id: 1,
      avatar_image: "./../../assets/img/user-avatar-image-man3.png",
      nickname: "우리형",
      content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
      interview_answer_registration_date: "2018-03-20 00:00:00",
      interview_num: 2,
    },
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider,) {
  }
  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectHomePage');
    this.maxValue();
    console.log(this.max_value);
  }

  ionViewWillEnter(){
    console.log('ionWillDidLoad CompanyProjectHomePage');
  }
  
  openCompanyTutorialPage() {
    this.navCtrl.push("CompanyTutorialPage");
  }

  openCompanyProjectRegistrationPage() {
    let companyProjectRegistrationModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyProjectRegistrationPage'});
    companyProjectRegistrationModal.present();
  }

  openCompanyConfigurePage() {
    this.navCtrl.push("CompanyConfigurePage");
  }

  openCompanyNotificationPage() {
    this.navCtrl.push("CompanyNotificationPage");
  }

  maxValue() {
    let max = this.ages[0].percent;
    for (let age of this.ages)
      if (age.percent > max) max = age.percent;
    this.max_value = max
  }

  openCompanyProjectInterviewDetailPage(project_participant_id) {
    this.navCtrl.push('CompanyProjectInterviewDetailPage', { "project_participant_id" : project_participant_id });
  }

  openCompanyProjectStoryHorizontalPage() {
    this.navCtrl.push('CompanyProjectStoryHorizontalPage');
  }

  openCompanyProjectReportPage() {
    this.navCtrl.push('CompanyProjectReportPage');
  }

  openCompanyProjectGroupInterviewPage() {
    this.navCtrl.push('CompanyProjectGroupInterviewPage');
  }

  getNotificationNum() {
    // alarmNum -> notificationNum으로
    return this.companyService.alarmNum;
  }

}
