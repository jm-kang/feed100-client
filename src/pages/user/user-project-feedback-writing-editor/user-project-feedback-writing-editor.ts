import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content } from 'ionic-angular';

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
    private domSanitizer: DomSanitizer) {
  
  }

  ionViewDidEnter() {    
    console.log('ionViewDidEnter UserProjectFeedbackWritingEditorPage');    
    this.projectHashtags = this.navParams.get('projectHashtags');
    if(this.navParams.get('feedbackContent').length > 0) {
      this.feedbackContent = this.navParams.get('feedbackContent').replace(/<br *\/?>/gi, '\n');
    }
    for( let i=0; i < this.navParams.get('feedbackHashtags').length; i++) {
      this.feedbackHashtags.push(this.navParams.get('feedbackHashtags')[i]);
      for(let j = 0; j < this.projectHashtags.length; j++) {
        if(this.projectHashtags[j] == this.feedbackHashtags[i]) {
          this.projectHashtags.splice(j,1);
        }
      }
    }
    this.feedbackImages = this.navParams.get('feedbackImages');
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      let data = "";
      this.viewCtrl.dismiss(data);
    }
  }

  completeEditor() {
    let data = { feedbackContent: this.feedbackContent, feedbackImages: this.feedbackImages, feedbackHashtags: this.feedbackHashtags };
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
    let data = "";
    this.viewCtrl.dismiss(data);
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

}
