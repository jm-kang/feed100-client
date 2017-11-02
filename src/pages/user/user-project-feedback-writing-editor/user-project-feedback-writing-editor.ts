import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the UserProjectFeedbackWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-feedback-writing-editor',
  templateUrl: 'user-project-feedback-writing-editor.html',
})
export class UserProjectFeedbackWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  project_id;

  feedbackContent: String = "";
  contentPlaceholder: String = '프로젝트에 대해 느낀점을 자세히 이야기해주세요. 성실히 작성된 이야기일수록 높은 공감수와 기업에게 큰 도움을 줍니다.';
  minTextLength: number = 100;
  isActiveNewHashtag: boolean = false;
  feedbackImages = [];

  projectHashtags = [];

  feedbackHashtags = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCntrl: ModalController, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    private domSanitizer: DomSanitizer) {
  
  }

  ionViewDidEnter() {    
    console.log('ionViewDidEnter UserProjectFeedbackWritingEditorPage');
    this.projectHashtags = this.ModalWrapperPage.modalParams.projectHashtags;
    if(this.ModalWrapperPage.modalParams.feedbackContent.length > 0) {
      this.feedbackContent = this.ModalWrapperPage.modalParams.feedbackContent.replace(/<br *\/?>/gi, '\n');
    }
    for( let i=0; i < this.ModalWrapperPage.modalParams.feedbackHashtags.length; i++) {
      this.feedbackHashtags.push(this.ModalWrapperPage.modalParams.feedbackHashtags[i]);
      for(let j = 0; j < this.projectHashtags.length; j++) {
        if(this.projectHashtags[j] == this.feedbackHashtags[i]) {
          this.projectHashtags.splice(j,1);
        }
      }
    }
    this.feedbackImages = this.ModalWrapperPage.modalParams.feedbackImages;
  }

  completeEditor() {
    let data = { feedbackContent: this.feedbackContent, feedbackImages: this.feedbackImages, feedbackHashtags: this.feedbackHashtags };
    this.ModalWrapperPage.dismissModal(data);
  }

  dismiss() {
    let data = "";
    this.ModalWrapperPage.dismissModal(data);
  }

  activeHashtag(hashtag) {
    this.feedbackHashtags.push(hashtag);
    let index: number = this.projectHashtags.indexOf(hashtag);
    this.projectHashtags.splice(index, 1);
  }

  inactiveHashtag(hashtag) {
    let index: number = this.feedbackHashtags.indexOf(hashtag);
    if(this.feedbackHashtags[index].isActiveHashtag) {
      this.feedbackHashtags.splice(index, 1);
      this.isActiveNewHashtag = false;
    } else {
      this.projectHashtags.push(hashtag);
      this.feedbackHashtags.splice(index, 1);
    }
  }

  sanitize(url: string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  deleteImage(i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.feedbackImages.splice(i, 1);
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
    this.commonService.selectImage()
    .then(this.commonService.readFile)
    .then((params) => {
      const img = params[0].localURL;
      const formData = params[1];
      this.feedbackImages.push({ "img" : img, "formData" : formData });      
    });
  }

  swipeEvent(e) {
    if(e.direction == 16) {
      document.querySelector(".editor-modal .scroll-content")['style'].background = 'transparent';
      if(this.contentHandle.scrollTop > -90) {
        this.dismiss();
      }
    }
  }

  panEnd() {
    if(this.contentHandle.scrollTop <= -90) {
      console.log('pan: ' + this.lastBgV);
      document.querySelector(".editor-modal .scroll-content")['style'].background = 'transparent';
      this.dismiss();
    }
  }

  scrollingEvent($e) {
    var stepV = $e.scrollTop /10 ;
    this.scrollVert = this.lastScrollV - stepV ;
    if (this.scrollVert < 0) {
       this.scrollVert = 0 ;
    } else {
       if (this.scrollVert > 100)
          this.scrollVert = 100 ;
    }
    if(this.scrollVert < 20) {
      this.transparentPercent = 1 - (this.scrollVert /20);
      document.querySelector(".editor-modal .scroll-content")['style'].background = 'rgba(0,0,0,'+this.transparentPercent+')';
    }
  }

}
