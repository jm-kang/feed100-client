import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserAllProjectListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-all-project-list',
  templateUrl: 'user-all-project-list.html',
})
export class UserAllProjectListPage {

  // 추천 프로젝트
  // allProjects = [
  //   {
  //     project_id: 1,
  //     project_main_image:"./../../assets/img/feed100-intro-slide4.png",
  //     project_name: "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
  //     project_max_reward: 5500,
  //   },
  //   {
  //     project_id: 1,
  //     project_main_image:"./../../assets/img/feed100-intro-slide4.png",
  //     project_name: "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
  //     project_max_reward: 5500,
  //   },
  //   {
  //     project_id: 1,
  //     project_main_image:"./../../assets/img/feed100-intro-slide4.png",
  //     project_name: "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
  //     project_max_reward: 5500,
  //   },
  //   {
  //     project_id: 1,
  //     project_main_image:"./../../assets/img/feed100-intro-slide4.png",
  //     project_name: "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십",
  //     project_max_reward: 5500,
  //   },
  // ];
  allProjects = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAllProjectListPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserAllProjectListPage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getAllProjects()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.allProjects = data.data;
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

  back() {
    this.navCtrl.pop();
  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  accessProjectCard(project_id) {
    this.userService.accessProjectCard(this, project_id);
  }

  openUserConfigurePage() {
    this.navCtrl.push('UserConfigurePage');
  }

}
