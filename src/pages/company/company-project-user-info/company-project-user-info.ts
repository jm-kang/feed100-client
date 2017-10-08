import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CompanyProjectUserProfileStatsPage } from '../company-project-user-profile-stats/company-project-user-profile-stats';
import { CompanyProjectUserParticipationConditionStatsPage } from '../company-project-user-participation-condition-stats/company-project-user-participation-condition-stats';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

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
  project_id;

  participantNum: number = 0;
  users = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectUserInfoPage');
    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.companyService.getProjectParticipants(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.users = data.data;
          this.participantNum = this.users.length;          
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          });
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

  openCompanyProjectUserProfileStatsPage() {
    this.navCtrl.push(CompanyProjectUserProfileStatsPage, { "project_id" : this.project_id });
  }

  openCompanyProjectUserParticipationConditionStatsPage() {
    this.navCtrl.push(CompanyProjectUserParticipationConditionStatsPage, { "project_id" : this.project_id });
  }
  
  openCompanyProjectUserProfilePage(project_participant_id) {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage, { "project_participant_id" : project_participant_id });
    companyProjectUserProfileModal.present();
  }

}
