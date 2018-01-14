import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyProjectUserReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-user-report',
  templateUrl: 'company-project-user-report.html',
})
export class CompanyProjectUserReportPage {
  project_id;

  userReports = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public photoViewer: PhotoViewer,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectUserReportPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectUserReportPage');
    let loading = this.commonService.presentLoading();

    this.companyService.getProjectReports(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.userReports = data.data;
          for(let i=0; i<this.userReports.length; i++) {
            this.userReports[i].project_report_images = JSON.parse(this.userReports[i].project_report_images);
            for(let j=0; j<this.userReports[i].project_report_images.length; j++) {
              this.userReports[i].project_report_images[j] = {img : this.userReports[i].project_report_images[j]};
            }
          }
          console.log(JSON.stringify(this.userReports));
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

  photoView(url) {
    this.photoViewer.show(url);
  }

  bestSelection(project_participant_id, nickname) {
    this.commonService.showConfirmAlert(nickname + '님의 피드백을 선정하시겠습니까?',
      () => {
        this.commonService.isLoadingActive = true;
        let loading = this.commonService.presentLoading();
        
        this.companyService.selectReport(project_participant_id)
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

  openCompanyProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('CompanyProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

}
