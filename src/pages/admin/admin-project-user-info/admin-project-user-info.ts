import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectUserInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-user-info',
  templateUrl: 'admin-project-user-info.html',
})
export class AdminProjectUserInfoPage {
  project_id;

  participantNum: number = 0;
  users = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectUserInfoPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectUserInfoPage');
    let loading = this.commonService.presentLoading();

    this.adminService.getProjectParticipants(this.project_id)
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
            this.ionViewWillEnter();
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

  openAdminProjectUserProfileStatsPage() {
    this.navCtrl.push('AdminProjectUserProfileStatsPage', { "project_id" : this.project_id });
  }

  openAdminProjectUserParticipationConditionStatsPage() {
    this.navCtrl.push('AdminProjectUserParticipationConditionStatsPage', { "project_id" : this.project_id });
  }

  openAdminProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('AdminProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

}
