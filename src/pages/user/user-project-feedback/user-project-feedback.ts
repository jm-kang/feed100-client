import { Component, ViewChild, ElementRef } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ModalController, PopoverController } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';

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
    // public statusBar: StatusBar, 
    private el:ElementRef, 
    public modalCtrl: ModalController, 
    public popoverCtrl: PopoverController,
    private photoViewer: PhotoViewer,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider
  ) {
    this.mobWidth = (window.screen.width);
    this.slideHeight = this.mobWidth * 4 / 5;
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectFeedbackPage');
    // this.statusBar.show();
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
  
  // 슬라이드 이미지 5:4 비율
  onLoad(img, i) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    if(img.width/5 >= img.height/4) {
      tempHeight = this.slideHeight + 'px';
      tempWidth = img.width*(this.slideHeight/img.height) + 'px';
      tempTop = 'initial';
      tempLeft = "-" + ((img.width*(this.slideHeight/img.height))-this.mobWidth)/2 + 'px';
      
    } else {
      tempWidth = this.mobWidth + 'px';
      tempHeight = img.height*(this.mobWidth/img.width) + 'px';
      tempLeft = 'initial';
      tempTop = "-" + ((img.height*(this.mobWidth/img.width))-this.slideHeight)/2 + 'px';
    }

    this.feedbackImages[i].width = tempWidth;
    this.feedbackImages[i].height = tempHeight;
    this.feedbackImages[i].left = tempLeft;
    this.feedbackImages[i].top = tempTop;
  }

  onOpinionLoad(img, i) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;
    if(img.width >= img.height) {
      tempHeight = img.width + 'px';
      tempWidth = 'auto';
      tempTop = 'initial';
      tempLeft = "-" + (img.width*(img.width/img.height)-img.width)/2 + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      tempWidth = img.height + 'px';
      tempHeight = 'auto';
      tempLeft = 'initial';
      tempTop = "-" + (img.height-img.width)/2 + 'px';
      tempMaxWidth = '100%';
      tempMaxHeight = 'initial';
    }
    console.log(JSON.stringify(this.opinions[i]));
    console.log("index: " + i);

    this.opinions[i].width = tempWidth;
    this.opinions[i].height = tempHeight;
    this.opinions[i].left = tempLeft;
    this.opinions[i].top = tempTop;
    this.opinions[i].maxHeight = tempMaxHeight;
    this.opinions[i].maxWidth = tempMaxWidth;
  }

  openUserProjectSearchResultPage(hashtags) {
    // let userProjectSearchResultModal = this.modalCtrl.create('ModalWrapperPage', 
    //   { page: 'UserProjectSearchResultPage', 
    //     params:{ "hashtags" : hashtags,
    //     "project_id" : this.project_id }
    //   });
    // userProjectSearchResultModal.present();
    this.navCtrl.push('UserProjectSearchResultPage', { "hashtags" : hashtags, "project_id" : this.project_id });
  }

  openUserProjectOpinionWritingEditorPage(nickname, feedback_id) {
    let userProjectOpinionWritingEditorModal = this.modalCtrl.create('ModalWrapperPage',
    { page:'UserProjectOpinionWritingEditorPage', 
      params: { "nickname" : nickname,
      "feedback_id" : feedback_id }
    });
    userProjectOpinionWritingEditorModal.present();
  }
}
