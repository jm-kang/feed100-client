import { Component, ViewChild, ElementRef } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ModalController, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { UserProjectFeedbackPopoverPage } from '../user-project-feedback-popover/user-project-feedback-popover';
import { UserProjectSearchResultPage } from '../user-project-search-result/user-project-search-result';
import { UserProjectOpinionWritingEditorPage } from '../user-project-opinion-writing-editor/user-project-opinion-writing-editor';
import { PhotoViewer } from '@ionic-native/photo-viewer';

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

  slideHeight: number;
  mobWidth: number;
  projectName: String = "프로젝트 이름 프로젝트 이름";
  avatarImage: String = "assets/img/user-avatar-image.png"
  nickname: String = "우와우와굳";
  // 피드백 추가
  // isMyFeedback: boolean = true;
  isBest: boolean = true;
  empathyNum: number = 2;
  nonEmpathyNum: number = 2;
  feedback: String = "같으며, 거선의 것은 눈이 용기가 이성은 든 크고 있다. 청춘의 속에서 청춘 가장 것이다. 얼음에 생생하며, 투명하되 찾아다녀도, 인간이 피고 현저하게 운다. 품에 가지에 웅대한 운다. 그러므로 예가 찬미를 꽃이 것이 철환하였는가? 영락과 이상의 끝까지 구하지 꽃 무엇이 같지 이상의 있으랴? 두기 인간은 열락의 이상은 듣는다. 인생을 품었기 위하여서, 행복스럽고 그들은 공자는 그들에게 이상의 위하여서. 우리 그것을 산야에 하였으며, 이 천자만홍이 꽃 청춘 운다.";
  feedbackRegistrationDate: String = "22시간 전";
  segmentOpinionsCondition: String = '';
  
  feedbackHashtags = [
    {value: '기능'},
    {value: '개선사항'},
  ];

  // height, width, left, top은 건드리지 않고 default ""로 놔야함
  feedbackImages = [
    {
      img: "assets/img/feedback-image1.jpeg",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image2.jpeg",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image3.jpeg",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      img: "assets/img/feedback-image4.jpeg",
      height: "",
      width: "",
      left: "",
      top: "",
    },
  ];

  opinions = [
    {
      avatarImage: "assets/img/user-avatar-image.png",
      nickname: "너의이름은",
      isEmpathy: true,
      opinionContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      opinionImage: "assets/img/feedback-opinion-image1.jpeg",
      opinionRegistrationDate: "6분 전",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      avatarImage: "assets/img/user-avatar-image2.png",
      nickname: "연결고리",
      isEmpathy: false,
      opinionContent: "너와 나의 연결고리, 808 베이스 소리 프리마 비스타 음악 소리, 메타 형과의 연결고리 우린 서울시의 머리, 나머지는 전부 쩌리 커져가는 돈벌이, 돈 돈 돈벌이, 워 누가 나를 막아? 내가 제일 잘나가",
      opinionImage: "assets/img/feedback-opinion-image2.jpeg",
      opinionRegistrationDate: "2시간 전",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "민경훈",
      isEmpathy: true,
      opinionContent: "너 없는 지금도 눈부신 하늘과 눈부시게 웃는 사람들 나의 헤어짐을 모르는 세상은 슬프도록 그대로인데 시간마저 데려가지 못하게 나만은 널 보내지 못했나봐",
      opinionImage: "assets/img/feedback-opinion-image3.jpeg",
      opinionRegistrationDate: "이틀 전",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    {
      avatarImage: "assets/img/user-avatar-image.png",
      nickname: "지코",
      isEmpathy: false,
      opinionContent: "뭔가 예감 좋아 번뜩 악상이 떠올라 금토일도 월요일같이 사는 내게 상 줄 거야 Alright 올해도 스케줄 꽉 찼고 길 가면 다 알아보고 Fanxy child 겁나 핫하고 그런데도 나 외로워 What should I do",
      opinionImage: "assets/img/feedback-opinion-image4.jpeg",
      opinionRegistrationDate: "2017.8.9",
      maxHeight: "",
      maxWidth: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar: StatusBar, private el:ElementRef, public modalCtrl: ModalController, public popoverCtrl: PopoverController, private photoViewer: PhotoViewer) {
    this.mobWidth = (window.screen.width);
    this.slideHeight = this.mobWidth * 4 / 5;
    console.log(this.mobWidth);
    console.log(this.slideHeight);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackPage');
  }

  ionViewDidEnter() {
    this.statusBar.show();
    this.segmentOpinionsCondition = "all";
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
      tempTop = 'initial';
      tempLeft = "-" + (img.width*(img.width/img.height)-img.width)/2 + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      tempWidth = img.height + 'px';
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

  // presentPopover(myEvent) {
  //   let popover = this.popoverCtrl.create(UserProjectFeedbackPopoverPage);
  //   popover.present({
  //     ev: myEvent
  //   });
  // }

  openUserProjectSearchResultPage(hashtags) {
    let userProjectSearchResultModal = this.modalCtrl.create(UserProjectSearchResultPage, {hashtags: hashtags});
    userProjectSearchResultModal.present();
  }

  openUserProjectOpinionWritingEditorPage() {
    let userProjectOpinionWritingEditorModal = this.modalCtrl.create(UserProjectOpinionWritingEditorPage);
    userProjectOpinionWritingEditorModal.present();
  }
}
