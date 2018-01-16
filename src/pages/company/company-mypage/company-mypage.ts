import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

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
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
    this.segmentProjectCondition = "proceedingProject";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyMypagePage');
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyMypagePage');
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
          this.nickname = data.data.nickname;
          this.proceedingProjects = data.data.proceeding_projects;
          this.endProjects = data.data.end_projects;
          this.proceedingProjectNum = this.proceedingProjects.length;
          this.endProjectNum = this.endProjects.length;
          this.companyService.setAlarmAndInterviewNum();
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

  openCompanyAccountModificationFormPage() {
    let companyAccountModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page : 'CompanyAccountModificationFormPage'});
    companyAccountModificationFormModal.present();
    companyAccountModificationFormModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();
        }
      }
    );
  }

  openCompanyProjectPage() {
    this.navCtrl.parent.select(1);
  }

  accessProjectCard(project_id) {
    this.companyService.accessProjectCard(this, project_id);    
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
