import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from './../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyProjectGroupInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-group-interview',
  templateUrl: 'company-project-group-interview.html',
})
export class CompanyProjectGroupInterviewPage {
  interviews = [
    {
      project_participant_id: 1,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "우리형",
      content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
      score: 7.5,
      age: '20대',
      gender: '남자',
      interview_answer_registration_date: "2018-03-20 00:00:00",
      interview_num: 2,
      isCheck: false,
    },
    {
      project_participant_id: 2,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "우리형",
      content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
      score: 7.5,
      age: '20대',
      gender: '남자',
      interview_answer_registration_date: "2018-03-20 00:00:00",
      interview_num: 2,
      isCheck: false,
    },
    {
      project_participant_id: 3,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "우리형",
      content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
      score: 7.5,
      age: '20대',
      gender: '남자',
      interview_answer_registration_date: "2018-03-20 00:00:00",
      interview_num: 2,
      isCheck: false,
    },
    {
      project_participant_id: 4,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "우리형",
      content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
      score: 7.5,
      age: '20대',
      gender: '남자',
      interview_answer_registration_date: "2018-03-20 00:00:00",
      interview_num: 2,
      isCheck: false,
    },
    {
      project_participant_id: 5,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "우리형",
      content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
      score: 7.5,
      age: '20대',
      gender: '남자',
      interview_answer_registration_date: "2018-03-20 00:00:00",
      interview_num: 2,
      isCheck: false,
    },
  ];

  group = [];
  isGroupEmpty = true;

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
    console.log('ionViewDidLoad CompanyProjectGroupInterviewPage');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter CompanyProjectGroupInterviewPage');
  }

  back() {
    this.navCtrl.pop();
  }

  check(i) {
    if (this.interviews[i].isCheck) {
      this.interviews[i].isCheck = false;
      let index = this.group.indexOf(this.interviews[i]);
      this.group.splice(index, 1);
    } else {
      this.interviews[i].isCheck = true;
      this.group.unshift(this.interviews[i]);
    }
    this.isEmpty(this.group);
    
    console.log(this.isGroupEmpty);
  }

  inactive(user) {
    let group_index = this.group.indexOf(user);
    let interview_index = this.interviews.indexOf(user);
    this.interviews[interview_index].isCheck = false;
    this.group.splice(group_index, 1);
    this.isEmpty(this.group);
    console.log(this.isGroupEmpty);
  }

  isEmpty(array) {
    if(array.length == 0) {
      this.isGroupEmpty = true;
    } else {
      this.isGroupEmpty = false;
    }
  }

  openCompanyProjectGroupInterviewQuestionEditorPage() {
    let companyProjectGroupInterviewQuestionEditorModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyProjectGroupInterviewQuestionEditorPage'});
    companyProjectGroupInterviewQuestionEditorModal.present();
  }
}
