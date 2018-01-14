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
  avatarImage: String = '';
  level = 0;
  levelClass: String = '';
  nickname: String = '';
  username;
  introduction;
  point = 0;
  exp = 0;
  maxExp = 0;
  expPercent = '';
  proceedingProjectNum = 0;
  rewardProjectNum = 0;
  endProjectNum = 0;
  segmentProjectCondition: String = '';

  // 진행중인 프로젝트
  proceedingProjects = [];

  rewardProjects = [];

  endProjects = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
      this.segmentProjectCondition = "proceedingProject";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserMypagePage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserMypagePage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getUserInfo()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.avatarImage = data.data.avatar_image;
          this.level = data.data.level;
          this.levelClass = data.data.level_class;
          this.nickname = data.data.nickname;
          this.username = data.data.username;
          this.introduction = data.data.introduction;
          this.point = data.data.point;
          this.exp = data.data.experience_point;
          this.maxExp = data.data.required_experience_point;
          this.expPercent = (this.maxExp != 0) ? ((this.exp / this.maxExp) * 100).toFixed(1) : "0";
          this.proceedingProjects = data.data.proceeding_projects;
          this.rewardProjects = data.data.reward_projects;
          this.endProjects = data.data.end_projects;
          this.proceedingProjectNum = this.proceedingProjects.length;
          this.rewardProjectNum = this.rewardProjects.length;
          this.endProjectNum = this.endProjects.length;
          this.userService.setAlarmAndInterviewNum();
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

  openUserProjectPage() {
    this.navCtrl.parent.select(1);
  }

  accessProjectCard(project_id) {
    this.userService.accessProjectCard(this, project_id);
  }

  openUserAccountModificationFormPage() {
    let userAccountModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserAccountModificationFormPage'});
    userAccountModificationFormModal.present();
    userAccountModificationFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();
        }
      }
    );
  }

  openUserProfileModificationFormPage() {
    let userProfileModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProfileModificationFormPage'});
    userProfileModificationFormModal.present();
    userProfileModificationFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();
        }
      }
    );
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

}
