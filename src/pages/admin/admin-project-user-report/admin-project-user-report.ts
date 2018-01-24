import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectUserReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-user-report',
  templateUrl: 'admin-project-user-report.html',
})
export class AdminProjectUserReportPage {
  project_id;

  userReports = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public photoViewer: PhotoViewer,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectUserReportPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectUserReportPage');
    let loading = this.commonService.presentLoading();

    this.adminService.getProjectReports(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.userReports = data.data;
          for(let i=0; i<this.userReports.length; i++) {
            this.userReports[i].project_report_images = JSON.parse(this.userReports[i].project_report_images);
            if(this.userReports[i].project_report_images) { 
              for(let j=0; j<this.userReports[i].project_report_images.length; j++) {
                this.userReports[i].project_report_images[j] = {img : this.userReports[i].project_report_images[j]};
              }
            }
          }
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

  sanctionProject(project_id, user_id, project_participant_id) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '제재하기',
          role: 'destructive',
          handler: () => {
            this.commonService.showConfirmAlert('해당 사용자를 프로젝트에서<br>제외하시겠습니까?', 
            () => {
              this.commonService.isLoadingActive = true;
              let loading = this.commonService.presentLoading();
              
              this.adminService.sanctionProject(project_id, user_id, project_participant_id)
              .finally(() => {
                loading.dismiss();
              })
              .subscribe(
                (data) => {
                  if(data.success == true) {
                    this.ionViewWillEnter();
                    this.commonService.showBasicAlert('프로젝트에서 제외되었습니다.');
                  }
                  else if(data.success == false) {
                    this.commonService.apiRequestErrorHandler(data, this.navCtrl)
                    .then(() => {
                      this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
                    });
                  }
                },
                (err) => {
                  console.log(err);
                  this.commonService.showBasicAlert('오류가 발생했습니다.');
                }
              );    
            });        
          }
        },{
          text: '취소하기',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  back() {
    this.navCtrl.pop();
  }

  photoView(url) {
    this.photoViewer.show(url);
  }

  bestSelection(project_participant_id, nickname) {
    this.commonService.showConfirmAlert(nickname + '님의 피드백을 선정하시겠습니까?',
      () => {
        this.commonService.isLoadingActive = true;
        let loading = this.commonService.presentLoading();
        
        this.adminService.selectReport(project_participant_id)
        .finally(() => {
          loading.dismiss();
        })
        .subscribe(
          (data) => {
            if(data.success == true) {
              if(data.data) {
                for(let i=0; i<this.userReports.length; i++) {
                  if(this.userReports[i].project_participant_id == project_participant_id) {
                    this.userReports[i].project_report_is_select = true;
                    this.commonService.showBasicAlert('선정이 완료되었습니다.');
                  }
                }
              }
              else {
                if(data.message == "selected report num is over") {
                  this.commonService.showBasicAlert('선정할 수 있는 피드백 개수를 초과하였습니다.');
                }
              }    
            }
            else if(data.success == false) {
              this.commonService.apiRequestErrorHandler(data, this.navCtrl)
              .then(() => {
                this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
              });
            }
          },
          (err) => {
            console.log(err);
            this.commonService.showBasicAlert('오류가 발생했습니다.');
          }
        );
    
      }
    );
  }

  openAdminProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('AdminProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

}
