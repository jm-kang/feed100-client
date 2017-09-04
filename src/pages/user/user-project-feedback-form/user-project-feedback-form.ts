import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';

import { UserProjectStorySummaryWritingEditorPage } from '../user-project-story-summary-writing-editor/user-project-story-summary-writing-editor';
import { UserProjectFeedbackWritingEditorPage } from '../user-project-feedback-writing-editor/user-project-feedback-writing-editor';
import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { PhotoViewer } from '@ionic-native/photo-viewer';

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

  projectName: String = "프로젝트 이름 프로젝트 이름 프로젝트 이름";
  projectMainImage: String = "assets/img/project-main-image2.png";
  isFirstQuestionWrited: boolean = false;
  isSecondQuestionWrited: boolean = false;
  isThirdQuestionWrited: boolean = false;
  storySummaryContent: String = "";
  feedbackContent: String = "";
  feedbackImages = [];
  feedbackHashtags = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackFormPage');
    this.slides.lockSwipeToNext(true);
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
    let userProjectFeedbackWritingEditorModal = this.modalCtrl.create(UserProjectFeedbackWritingEditorPage, { feedbackContent: this.feedbackContent, feedbackImages: this.feedbackImages, feedbackHashtags: this.feedbackHashtags });
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
    this.photoViewer.show('https://www.w3schools.com/css/img_fjords.jpg');
  }

  onFeedbackLoad(img, i) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;
    console.log("index[" + i + "] > width: " + img.width + "height: " + img.height);

    if(img.width >= img.height) {
      console.log('img.width >= img.height: ' + img.width + ' * ' + img.height);
      tempHeight = img.width + 'px';
      tempTop = 'initial';
      tempLeft = "-" + (img.width*(img.width/img.height)-img.width)/2 + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      console.log('img.width < img.height: ' + img.width + ' * ' + img.height);
      tempWidth = img.height + 'px';
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

  }

  openUserProjectHomePage() {
    let userProjectHomeModal = this.modalCtrl.create(UserProjectHomePage);
    userProjectHomeModal.present();
  }
}
