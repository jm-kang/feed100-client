import { Component, ViewChild, ElementRef } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ModalController, PopoverController } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserProjectFeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-feedback',
  templateUrl: 'user-project-feedback.html',
})
export class UserProjectFeedbackPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('imageSize') ElementRef;

  project_id;
  feedback_id;

  slideHeight: number;
  mobWidth: number;

  projectName: String = "";
  avatarImage: String = "";
  nickname: String = "";
  // 피드백 추가
  isMyFeedback: boolean;
  isMyOpinion: boolean;
  isBest: boolean;
  empathyNum: number = 0;
  nonEmpathyNum: number = 0;
  feedback: String = "";
  feedbackRegistrationDate: String = "";

  segmentOpinionsCondition: String = '';
  
  feedbackHashtags = [];

  feedbackImages = [
  ];

  opinions = [
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private el:ElementRef, 
    public modalCtrl: ModalController, 
    public popoverCtrl: PopoverController,
    private photoViewer: PhotoViewer,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider
  ) {
    this.mobWidth = (window.innerWidth);
    this.slideHeight = this.mobWidth * 4 / 5;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackPage');
    this.segmentOpinionsCondition = "all";
    
    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');
    this.feedback_id = this.navParams.get('feedback_id');

    this.userService.getFeedback(this.project_id, this.feedback_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          let feedback = data.data.feedback;
          this.projectName = data.data.project_name;
          this.avatarImage = feedback.avatar_image;
          this.nickname = feedback.nickname;
          this.isMyFeedback = feedback.is_my_feedback;
          this.isMyOpinion = feedback.is_my_opinion;
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

  doRefresh(refresher) {
    this.ionViewDidLoad();
    refresher.complete();
  }

  back() {
    this.navCtrl.pop();
  }

  photoView(url) {
    this.photoViewer.show(url);
  }
  
  openUserProjectSearchResultPage(hashtags) {
    this.navCtrl.push('UserProjectSearchResultPage', { "hashtags" : hashtags, "project_id" : this.project_id });
  }

  openUserProjectOpinionWritingEditorPage(nickname, feedback_id) {
    let userProjectOpinionWritingEditorModal = this.modalCtrl.create('ModalWrapperPage',
    { page:'UserProjectOpinionWritingEditorPage', 
      params: { "nickname" : nickname,
      "feedback_id" : feedback_id }
    });
    userProjectOpinionWritingEditorModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.commonService.isLoadingActive = false;
          this.navCtrl.getViews().forEach((value) => {
            value.instance.ionViewDidLoad();
          });
          this.commonService.isLoadingActive = true;
        }
      }
    );
    userProjectOpinionWritingEditorModal.present();
  }
}
