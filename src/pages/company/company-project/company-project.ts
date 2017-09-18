import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { CompanyProjectHomePage } from '../company-project-home/company-project-home';
import { CompanyProjectStoryPage } from '../company-project-story/company-project-story';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the CompanyProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project',
  templateUrl: 'company-project.html',
})
export class CompanyProjectPage {

  projects = [
    {
      project_id: 1,
      project_main_image: 'assets/img/project-main-image1.png',
      project_end_data: '2017-09-20 00:00:00',
      participant_num: 20,
      max_participant_num: 30,
      project_name: '프로젝트 이름',
      project_summary: '프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명',
      avatar_image: 'assets/img/company-avatar-image1.png',
      nickname: '닉네임',
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public httpService: HttpServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectPage');
    // let loading = this.httpService.presentLoading();

    // this.httpService.getProjects()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.projects = data.data;
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidLoad();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(JSON.stringify(err));
    //     this.httpService.showBasicAlert('오류가 발생했습니다.')
    //   }
    // );

  }

  // 진행중
  // 	참여o - 프로젝트 홈
  // 	참여x
  // 		인원 꽉참 - 스토리
  // 		인원 안참
  // 			프로필 노등록 - 프로필 수정 후 참여조건 검사 후 스토리
  // 			프로필 등록 - 참여조건 검사 후 스토리
  // 종료
  // 	참여o
  // 		보상 전 - 보상 페이지
  // 		보상 후 - 스토리
  // 	참여x - 스토리
  accessProjectCard(project_id) {
    // let loading = this.httpService.presentLoading();
    // let messages = [
    //   '현재 참여중인 프로젝트입니다!<br/>프로젝트 페이지로 이동하시겠습니까?',
    //   '아쉽게도 프로젝트 정원이 초과되었습니다!<br/>스토리 페이지로 이동하시겠습니까?',
    //   '프로젝트에 참가하려면 먼저 프로필을 등록해야 합니다!<br/>프로필 등록 페이지로 이동하시겠습니까?',
    //   '프로젝트에 참가하려면 먼저 간단한 설문조사에 응해야 합니다!<br/>참가하시겠습니까?',
    //   '프로젝트를 성공적으로 수행하여 보상을 받을 수 있습니다!<br/>보상 페이지로 이동하시겠습니까?',
    //   '종료된 프로젝트입니다!<br/>스토리 페이지로 이동하시겠습니까?'
    // ]

    // this.httpService.getCompanyAndProjectAndParticipation(project_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       // 기업의 프로젝트이면, CompanyProjectHomePage로 아닐경우에는 CompanyProjectStoryPage로
    //       // if(data.data.project_info.isProceeding) {
    //       //   if(data.data.project_participation_info) {
    //       //     this.httpService.showConfirmAlert(messages[0], 
    //       //       () => {
    //       //         this.openCompanyProjectHomePage(project_id);
    //       //       }
    //       //     );
    //       //   }
    //       //   else {
    //       //     if(data.data.project_info.participant_num >= data.data.project_info.max_participant_num) {
    //       //       this.httpService.showConfirmAlert(messages[1], 
    //       //         () => {
    //       //           this.openCompanyProjectStoryPage(project_id);
    //       //         }
    //       //       );
    //       //     }
    //       //     else {
    //       //       if(!data.data.age) {
    //       //         this.httpService.showConfirmAlert(messages[2], 
    //       //           () => {
    //       //             this.openCompanyProfileModificationFormPage();
    //       //           }
    //       //         );
    //       //       }
    //       //       else {
    //       //         this.httpService.showConfirmAlert(messages[3], 
    //       //           () => {
    //       //             this.openCompanyProjectParticipationConditionFormPage(project_id);
    //       //           }
    //       //         );
    //       //       }
    //       //     }
    //       //   }
    //       // }
    //       // else {
    //       //   if(data.data.project_participation_info) {
    //       //     if(!data.data.project_participation_info.project_reward_date) {
    //       //       this.httpService.showConfirmAlert(messages[4], 
    //       //         () => {
    //       //           this.openCompanyProjectRewardFormPage(project_id);
    //       //         }
    //       //       );
    //       //     }
    //       //     else {
    //       //       this.httpService.showConfirmAlert(messages[5], 
    //       //         () => {
    //       //           this.openCompanyProjectStoryPage(project_id);
    //       //         }
    //       //       );
    //       //     }
    //       //   }
    //       //   else {
    //       //     this.httpService.showConfirmAlert(messages[5], 
    //       //       () => {
    //       //         this.openCompanyProjectStoryPage(project_id);
    //       //       }
    //       //     );
    //       //   }
    //       // }
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.accessProjectCard(project_id);
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );
    
    this.openCompanyProjectHomePage(project_id);
  }

  openCompanyProjectHomePage(project_id) {
    let userProjectHomeModal = this.modalCtrl.create(CompanyProjectHomePage, { "project_id" : project_id });
    userProjectHomeModal.present();
  }

  openCompanyProjectStoryPage(project_id) {
    this.appCtrl.getRootNavs()[0].push(CompanyProjectStoryPage, { "project_id" : project_id });
  }
}
