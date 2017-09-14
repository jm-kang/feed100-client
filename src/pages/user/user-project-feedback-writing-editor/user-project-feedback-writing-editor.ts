import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content } from 'ionic-angular';


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
  feedbackContent: String = "";
  contentPlaceholder: String = '프로젝트에 대해 느낀점을 자세히 이야기해주세요. 성실히 작성된 이야기일수록 높은 공감수와 기업에게 큰 도움을 줍니다.';
  minTextLength: number = 100;
  isActiveNewHashtag: boolean = false;
  feedbackImages = [
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

  projectHashtags = [
    {value: '기능', isActiveHashtag: false},
    {value: '개선사항', isActiveHashtag: false},
    {value: 'Shes a Baby', isActiveHashtag: false},
    {value: '전지전능', isActiveHashtag: false},
    {value: '로비', isActiveHashtag: false},
    {value: '설현', isActiveHashtag: false},
  ];


  feedbackHashtags = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCntrl: ModalController, public viewCtrl: ViewController, public alertCtrl: AlertController) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackWritingEditorPage');
  }

  ionViewDidEnter() {    
    if(this.navParams.get('feedbackContent').length > 0) {
      this.feedbackContent = this.navParams.get('feedbackContent').replace(/<br *\/?>/gi, '\n');
    }
    for( let i=0; i < this.navParams.get('feedbackHashtags').length; i++) {
      this.feedbackHashtags.push(this.navParams.get('feedbackHashtags')[i]);
      for(let j = 0; j < this.projectHashtags.length; j++) {
        if(this.projectHashtags[j].value == this.feedbackHashtags[i].value) {
          this.projectHashtags.splice(j,1);
        }
      }
    }
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
  }

  deleteImage(i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.feedbackImages.splice(i, 1);
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
  }

  newHashtagPrompt() {
    let alert = this.alertCtrl.create({
      title: '새로운 해시태그를 작성해주세요',
      inputs: [
        {
          name: 'newHashtag',
          placeholder: '기타'
        }
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            this.isActiveNewHashtag = false;
          }
        },
        {
          text: '완료',
          handler: data => {
            this.feedbackHashtags.push({value: data.newHashtag, isActiveHashtag: true})
            this.isActiveNewHashtag = true;
          }
        }
      ]
    });
    alert.present();
  }
}
