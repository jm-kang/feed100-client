import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CompanyProjectUserProfileStatsPage } from '../company-project-user-profile-stats/company-project-user-profile-stats';
import { CompanyProjectUserParticipationConditionStatsPage } from '../company-project-user-participation-condition-stats/company-project-user-participation-condition-stats';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';

/**
 * Generated class for the CompanyProjectUserInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-user-info',
  templateUrl: 'company-project-user-info.html',
})
export class CompanyProjectUserInfoPage {
  participantNum:number = 30;
  users = [
    {
      avatar_image: 'assets/img/user-avatar-image.png',
      nickname: '스윙스',
      level: 1,
      level_class: '연구원',
      opinion_num: 10,
      reply_interview_num: 3,
    },
    {
      avatar_image: 'assets/img/user-avatar-image.png',
      nickname: '스윙스',
      level: 1,
      level_class: '연구원',
      opinion_num: 10,
      reply_interview_num: 3,
    },
    {
      avatar_image: 'assets/img/user-avatar-image.png',
      nickname: '스윙스',
      level: 1,
      level_class: '연구원',
      opinion_num: 10,
      reply_interview_num: 3,
    },
    {
      avatar_image: 'assets/img/user-avatar-image.png',
      nickname: '스윙스',
      level: 1,
      level_class: '연구원',
      opinion_num: 10,
      reply_interview_num: 3,
    },
    {
      avatar_image: 'assets/img/user-avatar-image.png',
      nickname: '스윙스',
      level: 1,
      level_class: '연구원',
      opinion_num: 10,
      reply_interview_num: 3,
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectUserInfoPage');
  }

  back() {
    this.navCtrl.pop();
  }

  openCompanyProjectUserProfileStatsPage() {
    this.navCtrl.push(CompanyProjectUserProfileStatsPage);
  }

  openCompanyProjectUserParticipationConditionStatsPage() {
    this.navCtrl.push(CompanyProjectUserParticipationConditionStatsPage);
  }
  
  openCompanyProjectUserProfilePage() {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage);
    companyProjectUserProfileModal.present();
  }

}
