import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Content } from 'ionic-angular';
import { CompanyProjectFeedbackPage } from '../company-project-feedback/company-project-feedback';
import { CompanyProjectInterviewDetailPage } from '../company-project-interview-detail/company-project-interview-detail';

/**
 * Generated class for the CompanyProjectUserProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-user-profile',
  templateUrl: 'company-project-user-profile.html',
})
export class CompanyProjectUserProfilePage {
  @ViewChild("contentRef") contentHandle: Content;
  avatarImage: String = "assets/img/feedback-image6.jpeg";
  nickname: String = "스윙스";
  level: number = 1;
  levelClass: String = "연구원"
  maxHeight: any =  "";
  maxWidth: any =  "";
  height: any =  "";
  width: any =  "";
  left: any =  "";
  top: any =  "";
  gender: String = "남자";
  age: String = "20대";
  job: String = "학생";
  region: String = "대전광역시";
  marriage: String = "미혼";
  storySummary: String = "정말 정말 좋은 프로그램에 참여한거 같다. 여자친구 생겼으면 좋겠어요. 번창하세요.";

  participationConditions = [
    {
      question: '당신은 누굽니까?',
      answer: '사람',
    },
    {
      question: '어떻게 알고 들어오셨나요?',
      answer: '웹서핑',
    },
    {
      question: '친구는 몇명인가요?',
      answer: '2명',
    },
    {
      question: '외로우신가요?',
      answer: '네',
    },
    {
      question: '여자 친구는 어떤 사람인가요?',
      answer: '없음',
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyAccountModificationFormPage');
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      this.viewCtrl.dismiss();
    }

    if(e.directionY == "up") {
      document.querySelector(".user-profile-page-footer")['style'].display = 'block';
    }
    if(e.directionY == "down") {
      document.querySelector(".user-profile-page-footer")['style'].display = 'none';
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onAvatarImageLoad(img) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;

    if(img.width/21 >= img.height/9) {
      tempHeight = img.width*9/21 + 'px';
      tempWidth = 'auto';
      tempTop = 'initial';
      tempLeft = "-" + (img.width-img.height*21/9)/2  + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      tempWidth = img.height*21/9 + 'px';
      tempHeight = 'auto';
      tempLeft = 'initial';
      tempTop = "-" + (img.height-img.width*9/21)/2 + 'px';
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

  modifyNickname(oldNickname) {
    let alert = this.alertCtrl.create({
      title: '새로운 해시태그를 작성해주세요',
      inputs: [
        {
          name: 'nickname',
          value: oldNickname,
        }
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('취소');
          }
        },
        {
          text: '완료',
          handler: data => {
            this.nickname = data.nickname;
          }
        }
      ]
    });
    alert.present();
  }

  modifyAccount() {
    console.log("수정 완료");
  }

  openCompanyProjectFeedbackPage() {
    this.navCtrl.push(CompanyProjectFeedbackPage);
  } 
  openCompanyProjectInterviewDetailPage() {
    this.navCtrl.push(CompanyProjectInterviewDetailPage);
  }
}
