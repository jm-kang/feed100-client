import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyMypagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-mypage',
  templateUrl: 'company-mypage.html',
})
export class CompanyMypagePage {
  avatarImage: String = '';
  levelClass: String = '';
  username: String = '';
  introduction: String = '';
  nickname: String = '';
  proceedingProjectNum = 0;
  endProjectNum = 0;
  segmentProjectCondition: String = '';

  // 진행중인 프로젝트
  proceedingProjects = [];

  endProjects = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public appCtrl: App,
    private badge: Badge,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
    this.segmentProjectCondition = "proceedingProject";
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload CompanyMypagePage');
    this.companyService.companyMypagePage = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyMypagePage');
    this.companyService.companyMypagePage = this;
    let loading = this.commonService.presentLoading();
    
    this.companyService.getCompanyInfo()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.avatarImage = data.data.avatar_image;
          this.levelClass = 'Company';
          this.username = data.data.username;
          this.introduction = data.data.introduction;
          this.nickname = data.data.nickname;
          this.proceedingProjects = data.data.proceeding_projects;
          this.endProjects = data.data.end_projects;
          this.proceedingProjectNum = this.proceedingProjects.length;
          this.endProjectNum = this.endProjects.length;
          this.getAlarmAndInterviewNum();
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  getAlarmAndInterviewNum() {
    this.companyService.getAlarmAndInterviewNum()
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.companyService.alarmNum = data.data.alarm_num;
          this.companyService.interviewNum = data.data.interview_num;
          this.badge.set(data.data.alarm_num);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();
    refresher.complete();
  }

  openCompanyAccountModificationFormPage() {
    let companyAccountModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page : 'CompanyAccountModificationFormPage'});
    companyAccountModificationFormModal.present();
    companyAccountModificationFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewDidLoad();
        }
      }
    );
  }

  openCompanyProjectPage() {
    this.navCtrl.parent.select(1);
  }

  // 내 프로젝트 or not
  accessProjectCard(project_id) {
    let loading = this.commonService.presentLoading();

    this.companyService.getIsMyProject(project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.is_my_project) {
            this.openCompanyProjectHomePage(project_id);
          }
          else {
            this.openCompanyProjectStoryPage(project_id);
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.accessProjectCard(project_id);
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  openCompanyProjectHomePage(project_id) {
    this.navCtrl.push('CompanyProjectHomePage', { "project_id" : project_id });
  }

  openCompanyProjectStoryPage(project_id) {
    this.navCtrl.push('CompanyProjectStoryPage', { "project_id" : project_id });
  }

  openCompanyProjectRegistrationPage() {
    let projectRegistrationModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyProjectRegistrationPage'});
    projectRegistrationModal.present();
  }

  openCompanyAlarmPage() {
    this.navCtrl.push('CompanyAlarmPage');
  }

  openCompanyConfigurePage() {
    this.navCtrl.push('CompanyConfigurePage');
  }

  getAlarmNum() {
    return this.companyService.alarmNum;
  }

}
