import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ViewController } from 'ionic-angular';

/**
 * Generated class for the CompanyProjectInterviewWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-interview-writing-editor',
  templateUrl: 'company-project-interview-writing-editor.html',
})
export class CompanyProjectInterviewWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  nickname: String = "스윙스";
  ordinal: number = 3;
  interviewContent: String = "";
  contentPlaceholder: String = '20자 이상 작성해야 인터뷰를 보낼 수 있습니다. 요청 후 수정이 불가능하니 신중히 작성해주시기 바랍니다.';
  minTextLength: number = 20;

  interviewImages = [
    {
      img: "assets/img/feedback-image6.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image2.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image3.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image4.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image5.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image1.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image2.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image3.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image4.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image5.jpeg",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectInterviewWritingEditorPage');
  }

  scrollingFun(e) {
    if (e.scrollTop < -150) {
      let data = "";
      this.viewCtrl.dismiss(data);
    }
  }

  completeEditor() {
    console.log("completeEditor() : 완료 버튼");
    this.viewCtrl.dismiss();
  }

  dismiss() {
    console.log("dismiss() : 취소 버튼");
    this.viewCtrl.dismiss();
  }

  onInterviewImageLoad(img, i) {
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
    this.interviewImages[i].width = tempWidth;
    this.interviewImages[i].height = tempHeight;
    this.interviewImages[i].left = tempLeft;
    this.interviewImages[i].top = tempTop;
    this.interviewImages[i].maxHeight = tempMaxHeight;
    this.interviewImages[i].maxWidth = tempMaxWidth;
  }


  deleteImage(target, i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.interviewImages.splice(i, 1);
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
  }
}
