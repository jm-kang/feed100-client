import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, ViewController, App, ModalController, Content } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { UserProjectSideMenuPage } from '../user-project-side-menu/user-project-side-menu';
import { UserProjectStoryPage } from '../user-project-story/user-project-story';
import { UserProjectLinkPage } from '../user-project-link/user-project-link';
import { UserProjectFeedbackPage } from '../user-project-feedback/user-project-feedback';
import { UserProjectInterviewDetailPage } from '../user-project-interview-detail/user-project-interview-detail';
import { UserProjectSearchPage } from '../user-project-search/user-project-search';
import { UserProjectSearchResultPage } from '../user-project-search-result/user-project-search-result';


/**
 * Generated class for the UserProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-home',
  templateUrl: 'user-project-home.html',
})
export class UserProjectHomePage {
  @ViewChild("contentRef") contentHandle: Content;

  projectMainImage: String = "assets/img/project-main-image2.png";
  avatarImage: String = "assets/img/company-avatar-image4.png";
  nickname: String = "우리 회사 이름";
  projectName: String = "프로젝트 이름 프로젝트 이름";
  projectSummary: String = "우리 프로젝트는 어마어마하며, 정말 엄청나게 대단한 프로젝트입니다."
  participantNum: number;
  maxParticipantNum: number = 30;
  progressPercent: number = 80;
  progressState: String = "2일 남음";
  isLink: boolean = true;
  isInterview: number = 2;
  
  feedbacks = [
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image.png",
      nickname: "우와우와굳",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "같으며, 거선의 것은 눈이 용기가 이성은 든 크고 있다. 청춘의 속에서 청춘 가장 것이다. 얼음에 생생하며, 투명하되 찾아다녀도, 인간이 피고 현저하게 운다. 품에 가지에 웅대한 운다. 그러므로 예가 찬미를 꽃이 것이 철환하였는가? 영락과 이상의 끝까지 구하지 꽃 무엇이 같지 이상의 있으랴? 두기 인간은 열락의 이상은 듣는다. 인생을 품었기 위하여서, 행복스럽고 그들은 공자는 그들에게 이상의 위하여서. 우리 그것을 산야에 하였으며, 이 천자만홍이 꽃 청춘 운다.",
      feedbackHashtags: [
        {value: '기능'},
        {value: '개선사항'},
      ],
      empathyNum: 9,
      nonEmpathyNum: 1,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image2.png",
      nickname: "갓준모",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "나는 갓준모. 로비로 나와",
      feedbackHashtags: [
        {value: '전지전능'},
        {value: '로비'},
      ],
      empathyNum: 8,
      nonEmpathyNum: 0,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 7,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 5,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 4,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 3,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 2,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
  ];

  feedbackResults = [
    {
      isBest: true,
      avatarImage: "assets/img/user-avatar-image.png",
      nickname: "우와우와굳",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "같으며, 거선의 것은 눈이 용기가 이성은 든 크고 있다. 청춘의 속에서 청춘 가장 것이다. 얼음에 생생하며, 투명하되 찾아다녀도, 인간이 피고 현저하게 운다. 품에 가지에 웅대한 운다. 그러므로 예가 찬미를 꽃이 것이 철환하였는가? 영락과 이상의 끝까지 구하지 꽃 무엇이 같지 이상의 있으랴? 두기 인간은 열락의 이상은 듣는다. 인생을 품었기 위하여서, 행복스럽고 그들은 공자는 그들에게 이상의 위하여서. 우리 그것을 산야에 하였으며, 이 천자만홍이 꽃 청춘 운다.",
      feedbackHashtags: [
        {value: '기능'},
        {value: '개선사항'},
      ],
      empathyNum: 9,
      nonEmpathyNum: 1,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image2.png",
      nickname: "갓준모",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "나는 갓준모. 로비로 나와",
      feedbackHashtags: [
        {value: '전지전능'},
        {value: '로비'},
      ],
      empathyNum: 8,
      nonEmpathyNum: 0,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 7,
      nonEmpathyNum: 4,
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


  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public statusBar: StatusBar, public appCtrl: App, public modalCtrl: ModalController ) {
    this.participantNum = this.feedbacks.length;
    // 베스트 피드백 조건 
    // 현재 피드백의 순위가 전체 참여 가능 인원의 10퍼센트 이하 
    // 현재 참여자수(피드백수)가 최대 전체 참여 가능 인원의 반 이상 
    // 현재 피드백의 공감수가 현재 참여자수의 반 초과 
    if(this.participantNum >= this.maxParticipantNum/2) {
      for(let i = 0; i < this.maxParticipantNum; i ++) {
        if(this.maxParticipantNum/10 > i && this.feedbacks[i].empathyNum > this.participantNum/2) {
          this.feedbacks[i].isBest = true;
        }
      }
    }
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      this.statusBar.show();
      this.viewCtrl.dismiss();
    }
    if (e.scrollTop < 30) {
      // console.log("top: " + e.scrollingFun);
      document.querySelector(".project-header-wrapper")['style'].background = 'transparent';
      document.querySelector(".project-header-wrapper")['style'].borderBottom = '0';
      document.querySelector(".project-header-wrapper .dismiss-button ion-icon")['style'].color = '#fff';
      document.querySelector(".project-header-wrapper .menu-button ion-icon")['style'].color = '#fff';
      document.querySelector(".project-header-wrapper ion-title")['style'].display = 'none';
    } else {
      // console.log("bottom: " + e.scrollingFun);
      document.querySelector(".project-header-wrapper")['style'].background = '#fff';
      document.querySelector(".project-header-wrapper")['style'].borderBottom = '0.55px solid #e8e8e8';
      document.querySelector(".project-header-wrapper .menu-button ion-icon")['style'].color = '#383838';
      document.querySelector(".project-header-wrapper .dismiss-button ion-icon")['style'].color = '#383838';
      document.querySelector(".project-header-wrapper ion-title")['style'].display = 'flex';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectHomePage');
  }

  ionViewDidEnter() {
    this.statusBar.hide(); 
  }

  dismiss() {
    this.statusBar.show();
    this.viewCtrl.dismiss();
    // this.navCtrl.goToRoot;

    // this.appCtrl.getRootNav().setRoot(LoginPage);
  }

  openUserProjectSideMenuPage() {
    this.statusBar.show();
    this.navCtrl.push(UserProjectSideMenuPage);
  }

  openUserProjectStoryPage() {
    this.statusBar.show();
    this.navCtrl.push(UserProjectStoryPage);
  }

  openUserProjectLinkPage() {
    this.statusBar.show();
    let userProjectLinkModal = this.modalCtrl.create(UserProjectLinkPage);
    userProjectLinkModal.present();
  }

  openUserProjectFeedbackPage() {
    this.navCtrl.push(UserProjectFeedbackPage);
  }

  openUserProjectInterviewDetailPage() {
    this.navCtrl.push(UserProjectInterviewDetailPage);
  }

  openUserProjectSearchPage() {
    this.navCtrl.push(UserProjectSearchPage);
  }

  openUserProjectSearchResultPage(hashtags) {
    let userProjectSearchResultModal = this.modalCtrl.create(UserProjectSearchResultPage, {hashtags: hashtags});
    userProjectSearchResultModal.present();
  }
}

