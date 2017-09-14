import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ViewController } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the UserProjectInterviewWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-interview-writing-editor',
  templateUrl: 'user-project-interview-writing-editor.html',
})
export class UserProjectInterviewWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  projectName: String = "프로젝트 이름 프로젝트 이름 프로젝트 이름 프로젝트 이름";
  interviewContent: String = "";
  contentPlaceholder: String = '성실히 작성해주세요. 한번만 보낼 수 있습니다.';
  minTextLength: number = 20;
  isFold: boolean = true;

  companyInterviewContent: String = "어두운 그대로 내비둬 억지로 밝아질거 뭐있어 딱 촛불 하나정도 저 조명따윈 내게 빛이 될 순 없어 눈뜨고 다시 찾아온 아침 혼자만 또 흐리멍텅한 날씨 습기 가득 찬 왼쪽의 눈으로 바라본 내 꿈만은 선명하길";

  companyImages = [
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
  ]
  
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController ,private photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectInterviewWritingEditorPage');
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

  photoView() {
    this.photoViewer.show('https://www.w3schools.com/css/img_fjords.jpg');
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

  onCompanyImageLoad(img, i) {
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
    this.companyImages[i].width = tempWidth;
    this.companyImages[i].height = tempHeight;
    this.companyImages[i].left = tempLeft;
    this.companyImages[i].top = tempTop;
    this.companyImages[i].maxHeight = tempMaxHeight;
    this.companyImages[i].maxWidth = tempMaxWidth;
  }

  fold() {
    if(this.isFold) {
      this.isFold = false;
    } else {
      this.isFold = true;
    }
  }

  deleteImage(target, i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    if(target == "notice") {
      this.companyImages.splice(i, 1);
    } else {
      this.interviewImages.splice(i, 1);
    }
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
  }

}
