import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

/**
 * Generated class for the UserProjectOpinionWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-opinion-writing-editor',
  templateUrl: 'user-project-opinion-writing-editor.html',
})
export class UserProjectOpinionWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  opinionContent: String = "";
  minTextLength: number = 20;
  contentPlaceholder: String = '피드백을 보시고 공감 비공감에 관한 글을 작성해주세요.';
  nickname: String = "너의이름은";
  isEmpathy: boolean;
  opinionImage: String = "assets/img/feedback-opinion-image1.jpeg";
  maxHeight: any =  "";
  maxWidth: any =  "";
  height: any =  "";
  width: any =  "";
  left: any =  "";
  top: any =  "";

  tempEmpathy: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectOpinionWritingEditorPage');
  }

  ionViewDidEnter() {    
    this.opinionContent = this.opinionContent.replace(/<br *\/?>/gi, '\n');
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      let data = "";
      this.viewCtrl.dismiss(data);
    }
  }

  completeEditor() {
    console.log("completeEditor() : 완료 버튼")
    this.viewCtrl.dismiss();
  }

  dismiss() {
    console.log("dismiss() : 취소 버튼")
    this.viewCtrl.dismiss();
  }

  onOpinionLoad(img) {
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
    this.width = tempWidth;
    this.height = tempHeight;
    this.left = tempLeft;
    this.top = tempTop;
    this.maxHeight = tempMaxHeight;
    this.maxWidth = tempMaxWidth;
  }

  deleteImage() {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.opinionImage = "";
    this.maxHeight = "";
    this.maxWidth = "";
    this.width = "";
    this.height = "";
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
  }

  changeEmpathyRadio() {
    console.log(this.tempEmpathy);
    if(this.tempEmpathy == "empathy") {
      this.isEmpathy = true;
      console.log(this.isEmpathy);
    } else {
      this.isEmpathy = false;
      console.log(this.isEmpathy);
    }
  }
}
