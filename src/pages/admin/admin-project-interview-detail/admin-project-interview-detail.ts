import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, ActionSheetController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectInterviewDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-interview-detail',
  templateUrl: 'admin-project-interview-detail.html',
})
export class AdminProjectInterviewDetailPage {
  @ViewChild(Content) content: Content;
  project_participant_id;
  
  nickname: String = "";
  totalInterviewNum: number = 0;
  maxInterviewNum: number = 0;
  isAvailable;

  interviews = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private photoViewer: PhotoViewer, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectInterviewDetailPage');
    this.commonService.isLoadingActive = true;
    this.project_participant_id = this.navParams.get('project_participant_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectInterviewDetailPage');
    let loading = this.commonService.presentLoading();
    
    this.adminService.getInterview(this.project_participant_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.nickname = data.data.nickname;
          this.totalInterviewNum = data.data.total_interview_num;
          this.maxInterviewNum = data.data.max_interview_num;
          this.isAvailable = data.data.is_available;
          let tempInterviews = data.data.interviews;
          
          for(let i=0; i<tempInterviews.length; i++) {
            if(tempInterviews[i].interview_request_images) {
              tempInterviews[i].interview_request_images = JSON.parse(tempInterviews[i].interview_request_images);
              for(let j=0; j<tempInterviews[i].interview_request_images.length; j++) {
                tempInterviews[i].interview_request_images[j] = { img : tempInterviews[i].interview_request_images[j]}; 
              }
            }
            if(tempInterviews[i].interview_response_images) {
              tempInterviews[i].interview_response_images = JSON.parse(tempInterviews[i].interview_response_images);
              for(let j=0; j<tempInterviews[i].interview_response_images.length; j++) {
                tempInterviews[i].interview_response_images[j] = { img : tempInterviews[i].interview_response_images[j]}; 
              }
            }
          }
          this.interviews = tempInterviews;
          setTimeout(() => {
            this.content.scrollToBottom();
          }, 500);
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
                    this.back();
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
  
  openAdminProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('AdminProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

}
