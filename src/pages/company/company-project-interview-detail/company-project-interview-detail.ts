import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CompanyProjectInterviewWritingEditorPage } from '../company-project-interview-writing-editor/company-project-interview-writing-editor';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';

/**
 * Generated class for the CompanyProjectInterviewDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-interview-detail',
  templateUrl: 'company-project-interview-detail.html',
})
export class CompanyProjectInterviewDetailPage {
  @ViewChild(Content) content: Content;
  nickname: String = "스윙스";
  
  interviews = [
    {
      companyInterview: {
        registrationDate: "2017.6.9",
        projectMainImage: "assets/img/project-main-image1.png",
        nickname: "프로젝트 행주",
        content: "어두운 그대로 내비둬 억지로 밝아질거 뭐있어 딱 촛불 하나정도 저 조명따윈 내게 빛이 될 순 없어 눈뜨고 다시 찾아온 아침 혼자만 또 흐리멍텅한 날씨 습기 가득 찬 왼쪽의 눈으로 바라본 내 꿈만은 선명하길",
        images: [
          {
            img: "assets/img/interview-image1.jpeg", maxHeight: "", maxWidth: "", height: "", width: "", left: "", top: "",
          },
          {
            img: "assets/img/interview-image2.jpeg", maxHeight: "", maxWidth: "", height: "", width: "", left: "", top: "",
          },
          {
            img: "assets/img/interview-image3.jpeg", maxHeight: "", maxWidth: "", height: "", width: "", left: "", top: "",
          },
          {
            img: "assets/img/interview-image4.jpeg", maxHeight: "", maxWidth: "",height: "", width: "", left: "",top: "",
          },
          {
            img: "assets/img/interview-image5.jpeg", maxHeight: "", maxWidth: "", height: "", width: "", left: "", top: "",
          },
          {
            img: "assets/img/interview-image6.jpeg", maxHeight: "", maxWidth: "", height: "", width: "", left: "", top: "",
          },
        ]
      },
      userInterview: {
        registrationDate: "6일 전",
        avatarImage: "assets/img/user-avatar-image.png",
        nickname: "스윙스",
        content: "알게 모르게 난 널 몰입 시킬게 내 최면놀이 빨간머리 촛불들이 꺼지고 니 정신머린 잠들고 내 마이크로폰에 약물들 들이붓고 ay 틀에 박힌 편견을 바꿀 드라마틱한 곡을 써 내 존재는 반칙이야",
        images: [
          {
            img: "assets/img/interview-image4.jpeg", maxHeight: "", maxWidth: "",height: "", width: "", left: "",top: "",
          },
          {
            img: "assets/img/interview-image5.jpeg", maxHeight: "", maxWidth: "", height: "", width: "", left: "", top: "",
          },
        ]
      }
    },
    {
      companyInterview: {
        registrationDate: "3일 전",
        projectMainImage: "assets/img/project-main-image1.png",
        nickname: "프로젝트 행주",
        content: "어두운 그대로 내비둬 억지로 밝아질거 뭐있어 딱 촛불 하나정도 저 조명따윈 내게 빛이 될 순 없어 눈뜨고 다시 찾아온 아침 혼자만 또 흐리멍텅한 날씨 습기 가득 찬 왼쪽의 눈으로 바라본 내 꿈만은 선명하길",
        images: [
          {
            img: "assets/img/interview-image1.jpeg", maxHeight: "", maxWidth: "", height: "", width: "", left: "", top: "",
          },
          {
            img: "assets/img/interview-image2.jpeg", maxHeight: "", maxWidth: "", height: "", width: "", left: "", top: "",
          },
        ]
      },
      userInterview: {
        registrationDate: "",
        avatarImage: "assets/img/user-avatar-image.png",
        nickname: "스윙스",
        content: "",
        images: []
      }
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private photoViewer: PhotoViewer, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectInterviewDetailPage');
  }

  ionViewDidEnter() {
    this.content.scrollToBottom();
  }

  back() {
    this.navCtrl.pop();
  }

  onInterviewDetailCompanyImageLoad(img, count, i) {
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
    this.interviews[count].companyInterview.images[i].width = tempWidth;
    this.interviews[count].companyInterview.images[i].height = tempHeight;
    this.interviews[count].companyInterview.images[i].left = tempLeft;
    this.interviews[count].companyInterview.images[i].top = tempTop;
    this.interviews[count].companyInterview.images[i].maxHeight = tempMaxHeight;
    this.interviews[count].companyInterview.images[i].maxWidth = tempMaxWidth;
  }

  onInterviewDetailUserImageLoad(img, count, i) {
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
    this.interviews[count].userInterview.images[i].width = tempWidth;
    this.interviews[count].userInterview.images[i].height = tempHeight;
    this.interviews[count].userInterview.images[i].left = tempLeft;
    this.interviews[count].userInterview.images[i].top = tempTop;
    this.interviews[count].userInterview.images[i].maxHeight = tempMaxHeight;
    this.interviews[count].userInterview.images[i].maxWidth = tempMaxWidth;
  }

  photoView() {
    this.photoViewer.show('https://www.w3schools.com/css/img_fjords.jpg');
  }
  
  openCompanyProjectInterviewWritingEditorPage() {
    let companyProjectInterviewWritingEditorModal = this.modalCtrl.create(CompanyProjectInterviewWritingEditorPage);
    companyProjectInterviewWritingEditorModal.present();
  }

  openCompanyProjectUserProfilePage() {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage);
    companyProjectUserProfileModal.present();
  }

}
