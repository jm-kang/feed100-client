import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController, App, Config } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from './../../../providers/admin-service/admin-service';


/**
 * Generated class for the AdminProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project',
  templateUrl: 'admin-project.html',
})
export class AdminProjectPage {
  @ViewChild(Slides) childSlides: Slides;
  // 진행중인 프로젝트
  proceedingProjects = [
    // {
    //   project_id: 1,
    //   project_main_image:"./../../assets/img/project-main-image5.png",
    //   project_name: "하플리 : 예쁜 한복들만 모았다! 허리치마, 저고리, 한복원피스 등.",
    //   project_max_reward: 5500,
    // },
    // {
    //   project_id: 2,
    //   project_main_image:"./../../assets/img/project-main-image4.png",
    //   project_name: "CUBIT : 예쁜 한복들만 모았다! 허리치마, 저고리, 한복원피스 등.",
    //   project_max_reward: 5500,
    // }
  ];

  // 진행중인 프로젝트
  // proceedingProjects = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider,
    public config: Config) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectPage');
    let loading = this.commonService.presentLoading();
    
    this.adminService.getProjects()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.proceedingProjects = data.data.proceedingProjects;
          this.adminService.setNotificationNum();
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

  accessProjectCard(project_id) {
    this.openAdminProjectHomePage(project_id);
  }

  openAdminProjectHomePage(project_id) {
    this.navCtrl.push('AdminProjectHomePage', { "project_id" : project_id });
  }

  openAdminConfigurePage() {
    this.navCtrl.push('AdminConfigurePage');
  }
  
  // 모든 프로젝트 리스트 페이지로 이동
  openAdminAllProjectList() {
    this.navCtrl.push('AdminAllProjectListPage');
  }

}
