import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserMypagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-mypage',
  templateUrl: 'user-mypage.html',
})
export class UserMypagePage {
  formData;
  avatarImage: string = "./../../assets/img/user-avatar-image-woman2.png";
  level = 1;
  levelClass: string = "인턴연구원";
  nickname: string = "피드배커";
  username: string = "feed100.help@gmail.com";
  point = 11000;
  exp = 110;
  maxExp = 440;
  expPercent = 25;
  gender: string = "여성";
  age: string = "20대";
  job: string = "장치, 기계조작 및 조립 종사자";
  region: string = "세종특별자치시";
  marriage: string = "미혼";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserMypagePage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserMypagePage');
    // let loading = this.commonService.presentLoading();
    
    // this.userService.getUserInfo()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.avatarImage = data.data.avatar_image;
    //       this.level = data.data.level;
    //       this.levelClass = data.data.level_class;
    //       this.nickname = data.data.nickname;
    //       this.username = data.data.username;
    //       this.point = data.data.point;
    //       this.exp = data.data.experience_point;
    //       this.maxExp = data.data.required_experience_point;
    //       this.expPercent = (this.maxExp != 0) ? ((this.exp / this.maxExp) * 100).toFixed(1) : "0";
    //       this.proceedingProjects = data.data.proceeding_projects;
    //       this.rewardProjects = data.data.reward_projects;
    //       this.endProjects = data.data.end_projects;
    //       this.proceedingProjectNum = this.proceedingProjects.length;
    //       this.rewardProjectNum = this.rewardProjects.length;
    //       this.endProjectNum = this.endProjects.length;
    //       this.userService.setAlarmAndInterviewNum();
    //     }
    //     else if(data.success == false) {
    //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewWillEnter();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.commonService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );
  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  openUserConfigurePage() {
    this.navCtrl.push('UserConfigurePage');
  }

  openUserProfileModificationFormPage() {
    let userProfileModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProfileModificationFormPage'});
    userProfileModificationFormModal.present();
  }

  openUserPointExchangePage() {
    this.navCtrl.push('UserPointExchangePage');
  }

  openUserPointUsageHistoryPage() {
    this.navCtrl.push('UserPointUsageHistoryPage');
  }

}
