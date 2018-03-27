import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Content, ModalController, App, Config } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project',
  templateUrl: 'user-project.html',
})
export class UserProjectPage {
  @ViewChild(Slides) childSlides: Slides;
  
  // 보상받을 프로젝트
  rewardProjects = [
    {
      project_id: 1,
      project_main_image:"./../../assets/img/project-main-image1.png"
    },
    {
      project_id: 1,
      project_main_image:"./../../assets/img/project-main-image2.png"
    }
  ];
  
  // 진행중인 프로젝트
  participatingProjects = [
    {
      project_id: 1,
      project_main_image:"./../../assets/img/project-main-image3.png",
      //새 인터뷰 도착시 true
      is_new_interview: true, 
      project_name: "스마트 거치대 CUBIT : 스마트폰을 이용한 편리한 촬영 도구"
    },
    {
      project_id: 1,
      project_main_image:"./../../assets/img/project-main-image4.png",
      //새 인터뷰 도착시 true
      is_new_interview: false, 
      project_name: "CON : 강연 / 컨퍼런스 지원 실시간 소통 응답서비스 CON"
    }
  ];
  
  // 추천 프로젝트
  recommendedProjects = [
    {
      project_id: 1,
      project_main_image:"./../../assets/img/feed100-intro-slide5.png",
      project_name: "하플리 : 예쁜 한복들만 모았다! 허리치마, 저고리, 한복원피스 등.",
      max_reward: 5500,
    },
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public config: Config) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectPage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectPage');
    // let loading = this.commonService.presentLoading();
    
    // this.userService.getUserHome()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.proceedingProjects = data.data.proceeding_projects;
    //       this.newProjects = data.data.new_projects;
    //       this.newNewsfeeds = data.data.new_newsfeeds;
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

  accessProjectCard(project_id) {
    this.userService.accessProjectCard(this, project_id);
  }

  openUserProjectPage() {
    this.navCtrl.parent.select(1);
  }

  openProjectPage() {
    this.navCtrl.parent.select(1);
  }

  openUserConfigurePage() {
    this.navCtrl.push('UserConfigurePage');
  }
  
  // 모든 프로젝트 리스트 페이지로 이동
  openUserAllProjectList() {
    // this.navCtrl.push("UserAllProjectListPage");
    // this.navCtrl.push("UserProjectParticipationConditionFormPage");
    let userProfileModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectInterviewAnswerPage'});
    userProfileModificationFormModal.present();
  }

  filterParticipatingProjects(bool) {
    return this.participatingProjects.filter(x => x.is_new_interview == bool);
  }
}
