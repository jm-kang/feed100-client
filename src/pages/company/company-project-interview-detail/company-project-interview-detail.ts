import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, ActionSheetController } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyProjectInterviewDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-interview-detail',
  templateUrl: 'company-project-interview-detail.html',
})
export class CompanyProjectInterviewDetailPage {
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
    public companyService: CompanyServiceProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectInterviewDetailPage');
    this.commonService.isLoadingActive = true;
    this.project_participant_id = this.navParams.get('project_participant_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectInterviewDetailPage');
    let loading = this.commonService.presentLoading();
    
    this.companyService.getInterview(this.project_participant_id)
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

  reportProject(project_id, project_participant_id, feedback_id, opinion_id, interview_id, report_id) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '신고하기',
          role: 'destructive',
          handler: () => {
            this.commonService.showConfirmAlert('해당 내용을 부적절한<br>게시글로 신고하시겠습니까?', 
            () => {
              this.commonService.isLoadingActive = true;
              let loading = this.commonService.presentLoading();
              
              this.companyService.reportProject(project_id, project_participant_id, feedback_id, opinion_id, interview_id, report_id)
              .finally(() => {
                loading.dismiss();
              })
              .subscribe(
                (data) => {
                  if(data.success == true) {
                    this.commonService.showBasicAlert('신고가 접수되었습니다.');
                  }
                  else if(data.success == false) {
                    if(data.message == 'already reported') {
                      this.commonService.showBasicAlert('이미 신고가 접수되었습니다.');
                    }
                    else {
                      this.commonService.apiRequestErrorHandler(data, this.navCtrl)
                      .then(() => {
                        this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
                      });
                    }
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
  
  openCompanyProjectInterviewWritingEditorPage() {
    let companyProjectInterviewWritingEditorModal = this.modalCtrl.create('ModalWrapperPage',
      { page: 'CompanyProjectInterviewWritingEditorPage', 
        params: {
          "nickname" : this.nickname,
          "project_participant_id" : this.project_participant_id,
          "ordinal" : this.interviews.length + 1
        }
    });
    companyProjectInterviewWritingEditorModal.present();
    companyProjectInterviewWritingEditorModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();  
        }
      }
    );
  }

  openCompanyProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('CompanyProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

}
