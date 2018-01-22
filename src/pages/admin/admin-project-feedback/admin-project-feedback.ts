import { Component, ViewChild, ElementRef } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ModalController, PopoverController, ActionSheetController } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';
/**
 * Generated class for the AdminProjectFeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-feedback',
  templateUrl: 'admin-project-feedback.html',
})
export class AdminProjectFeedbackPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('imageSize') ElementRef;

  project_id;
  feedback_id;
  user_id;

  slideHeight: number;
  mobWidth: number;

  projectName: String = "";
  avatarImage: String = "";
  nickname: String = "";
  isBest: boolean;
  empathyNum: number = 0;
  nonEmpathyNum: number = 0;
  feedback: String = "";
  feedbackRegistrationDate: String = "";

  segmentOpinionsCondition: String = '';
  
  feedbackHashtags = [];

  feedbackImages = [];

  opinions = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private el:ElementRef, 
    public modalCtrl: ModalController, 
    public popoverCtrl: PopoverController,
    private photoViewer: PhotoViewer,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider,
    public actionSheetCtrl: ActionSheetController) {
    this.mobWidth = (window.innerWidth);
    this.slideHeight = this.mobWidth * 4 / 5;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectFeedbackPage');
    this.commonService.isLoadingActive = true;
    this.segmentOpinionsCondition = "all";
    this.project_id = this.navParams.get('project_id');
    this.feedback_id = this.navParams.get('feedback_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectFeedbackPage');
    let loading = this.commonService.presentLoading();

    this.adminService.getFeedback(this.project_id, this.feedback_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          let feedback = data.data.feedback;
          this.user_id = feedback.user_id;
          this.projectName = data.data.project_name;
          this.avatarImage = feedback.avatar_image;
          this.nickname = feedback.nickname;
          this.isBest = feedback.is_best;
          this.empathyNum = feedback.empathy_num;
          this.nonEmpathyNum = feedback.non_empathy_num;
          this.feedback = JSON.parse(feedback.project_feedback)[0];
          this.feedbackRegistrationDate = feedback.project_feedback_registration_date;
          this.feedbackHashtags = JSON.parse(feedback.project_feedback_hashtags);
          
          let project_feedback_images = (feedback.project_feedback_images) ? JSON.parse(feedback.project_feedback_images) : [];
          for(let i=0; i<project_feedback_images.length; i++) {
            this.feedbackImages.push({
              img : project_feedback_images[i]
            });
          }

          this.opinions = data.data.opinions;
          
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

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  sanctionProject(project_id, user_id, project_participant_id, isFeedback) {
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
                    if(isFeedback) {
                      this.back();
                    }
                    else {
                      this.ionViewWillEnter();
                    }
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
  
  openAdminProjectSearchResultPage(hashtags) {
    this.navCtrl.push('AdminProjectSearchResultPage', { "hashtags" : hashtags, "project_id" : this.project_id });
  }

  openAdminProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('AdminProjectUserProfilePage', { "project_participant_id" : project_participant_id });
  }

}