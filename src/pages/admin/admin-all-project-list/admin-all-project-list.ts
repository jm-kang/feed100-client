import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminAllProjectListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-all-project-list',
  templateUrl: 'admin-all-project-list.html',
})
export class AdminAllProjectListPage {

  // 모든 프로젝트
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
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminAllProjectListPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminAllProjectListPage');
    // let loading = this.commonService.presentLoading();
    
    // this.adminService.getAllProjects()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.allProjects = data.data;
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

  back() {
    this.navCtrl.pop();
  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  accessProjectCard(project_id) {
    this.openAdminProjectHomePage(project_id);
  }

  openAdminProjectHomePage(project_id) {
    this.navCtrl.push('AdminProjectHomePage', { "project_id" : project_id });
  }
}
