import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';

import { UserProjectStorySummaryWritingEditorPage } from '../user-project-story-summary-writing-editor/user-project-story-summary-writing-editor';
import { UserProjectFeedbackWritingEditorPage } from '../user-project-feedback-writing-editor/user-project-feedback-writing-editor';
import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';
/**
 * Generated class for the UserProjectFeedbackFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-feedback-form',
  templateUrl: 'user-project-feedback-form.html',
})
export class UserProjectFeedbackFormPage {
  @ViewChild(Slides) slides: Slides;

  project_id;

  projectName: String = "";
  projectMainImage: String = "";
  isFirstQuestionWrited: boolean = false;
  isSecondQuestionWrited: boolean = false;
  isThirdQuestionWrited: boolean = false;
  storySummaryContent: String = "";
  feedbackContent: String = "";
  feedbackImages = [];
  feedbackHashtags = [];
  rate = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    private photoViewer: PhotoViewer,
    public httpService: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackFormPage');
    this.slides.lockSwipeToNext(true);
    let loading = this.httpService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.httpService.getProjectParticipation(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data) {
            this.projectName = data.data.project_name;
            this.projectMainImage = data.data.project_main_image;
          }
          else {
            if(data.message == "project is not proceeding") {
              this.navCtrl.popAll();
              this.httpService.showBasicAlert('이런! 프로젝트가 이미 종료되었습니다.');
            }
            else if(data.message == "project is max") {
              this.navCtrl.popAll();
              this.httpService.showBasicAlert('이런! 인원이 초과되었습니다.');
            }
            else if(data.message == "is not approved") {
              this.navCtrl.popAll();
              this.httpService.showBasicAlert('이런! 조건을 충족하지 못해 이 프로젝트에 참여하실 수 없습니다.');
            }
          }
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          });
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    )
  }

  back() {
    this.navCtrl.pop();
  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  onModelChange(newVal) {
    if(newVal > 0) {
      this.isThirdQuestionWrited = true; 
    } else {
      this.isThirdQuestionWrited = false;
    }
    console.log(this.rate);
  }

  slideChanged() {
    if(this.slides.getActiveIndex() == 0) {
      if(!this.isFirstQuestionWrited) {
        this.slides.lockSwipeToNext(true);  
      } else {
        this.slides.lockSwipeToNext(false);  
      }
    }
    if(this.slides.getActiveIndex() == 1) {
      if(!this.isSecondQuestionWrited) {
        this.slides.lockSwipeToNext(true);  
      } else {
        this.slides.lockSwipeToNext(false);  
      }
    }
  }

  openUserProjectStorySummaryWritingEditorPage() {
    let userProjectStorySummaryWritingEditorModal = this.modalCtrl.create(UserProjectStorySummaryWritingEditorPage, { storySummaryContent: this.storySummaryContent });
     userProjectStorySummaryWritingEditorModal.onDidDismiss(data => {
      if(data != "") {
        this.storySummaryContent = data.storySummaryContent.replace(/(?:\r\n|\r|\n)/g, '<br />');
        if(this.storySummaryContent != "") {
          this.isFirstQuestionWrited = true;
          this.slides.lockSwipeToNext(false);
        } else {
          this.isFirstQuestionWrited = false;
          this.slides.lockSwipeToNext(true);
        }
      }
    });
    userProjectStorySummaryWritingEditorModal.present();
  }
  openUserProjectFeedbackWritingEditorPage() {
    let userProjectFeedbackWritingEditorModal = this.modalCtrl.create(UserProjectFeedbackWritingEditorPage, { project_id: this.project_id, feedbackContent: this.feedbackContent, feedbackImages: JSON.parse(JSON.stringify(this.feedbackImages)), feedbackHashtags: this.feedbackHashtags });
    userProjectFeedbackWritingEditorModal.onDidDismiss(data => {
      if(data != "") {
        this.feedbackContent = data.feedbackContent.replace(/(?:\r\n|\r|\n)/g, '<br />');  
        this.feedbackImages = data.feedbackImages;
        this.feedbackHashtags = data.feedbackHashtags;
        if(this.feedbackContent != "") {
          this.isSecondQuestionWrited = true;
          this.slides.lockSwipeToNext(false);
        } else {
          this.isSecondQuestionWrited = false;
          this.slides.lockSwipeToNext(true);
        }
      }
    });
    userProjectFeedbackWritingEditorModal.present();
  }

  photoView(url) {
    this.photoViewer.show(url);
  }

  onFeedbackLoad(img, i) {
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
    this.feedbackImages[i].width = tempWidth;
    this.feedbackImages[i].height = tempHeight;
    this.feedbackImages[i].left = tempLeft;
    this.feedbackImages[i].top = tempTop;
    this.feedbackImages[i].maxHeight = tempMaxHeight;
    this.feedbackImages[i].maxWidth = tempMaxWidth;
    console.log("feedback-form : ", img.width, img.height, tempWidth, tempHeight, tempLeft, tempTop, tempMaxHeight, tempMaxWidth);

  }

  openUserProjectHomePage() {
    //프로젝트 안끝났고 참여중인 프로젝트 아니고 인원 꽉 안찼으면 
    let loading = this.httpService.presentLoading();
    for(let i=0; i<this.feedbackImages.length; i++) {
      this.feedbackImages[i] = this.feedbackImages[i].img;
    }

    this.httpService.projectFeedback(this.project_id, this.storySummaryContent, [this.feedbackContent], this.feedbackHashtags, (this.feedbackImages.length) ? this.feedbackImages : null, this.rate)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
        (data) => {
        if(data.success == true) {
          this.navCtrl.popAll();
          if(data.data) {
            this.httpService.showConfirmAlert('축하합니다! 이제 프로젝트 페이지에서 토론, 인터뷰에 참여해주세요! 참여도에 따라 많은 보상을 받을 수 있습니다.', 
              () => {
                let userProjectHomeModal = this.modalCtrl.create(UserProjectHomePage, { "project_id" : this.project_id });
                userProjectHomeModal.present();
              }
            );
          }
          else {
            if(data.message == "project is not proceeding") {
              this.httpService.showBasicAlert('이런! 프로젝트가 이미 종료되었습니다.');
            }
            else if(data.message == "project is max") {
              this.httpService.showBasicAlert('이런! 인원이 초과되었습니다.');
            }
            else if(data.message == "you are already participated") {
              this.httpService.showBasicAlert('이미 참여중인 프로젝트입니다.');
            }
          }
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.openUserProjectHomePage();
          });
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    )
  }
}
