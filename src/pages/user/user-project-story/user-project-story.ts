import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';

import { UserProjectFeedbackFormPage } from '../user-project-feedback-form/user-project-feedback-form';
import { UserProjectLinkPage } from '../user-project-link/user-project-link';


/**
 * Generated class for the UserProjectStoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-story',
  templateUrl: 'user-project-story.html',
})
export class UserProjectStoryPage {
  @ViewChild(Slides) slides: Slides;

  isFirstSlide: boolean = true;
  isFeedback: boolean = true;
  isLink: boolean = true;
  projectMainImage: String = "assets/img/project-main-image2.png";
  avatarImage: String = "assets/img/company-avatar-image1.png";
  nickname: String = "포텐브라더스";
  projectName: String = "FEED100";
  projectViewNum: number = 2155;
  participantNum: number = 17;
  maxParticipantNum: number = 30;
  progressState: String = "2일 남음";
  projectSummary: String = "FEED100은 정성적 데이터를 통해<br>아이디어 검증 및 시장 분석하는 서비스입니다."
  projectRegistrationDate: String = "2017.7.31";
  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  projectStorySlides = [
    {
      storyImage: "assets/img/project-story-image01.jpeg",
      storyVideo: "",
      storyContent: "스타트업을 위한 비지니스 검증<br>피드백 서비스 플랫폼"
    },
    {
      storyImage: "assets/img/project-story-image02.jpeg",
      storyVideo: "",
      storyContent: "현재 스타트업이 계속 많아지고 있습니다.<br>국내 신설 법인수는 96,155개에 달하며, 창업기업 자원 예산은 계속 증가하여 1조 4,500억원에 도달했습니다.<br>이를 통해 스타트업은 하나의 트랜드로 자리잡았으며, 이에따라 자원이 확산되고 있습니다."
    },
    {
      storyImage: "assets/img/project-story-image03.jpeg",
      storyVideo: "",
      storyContent: "하지만, 창업 기업 생존율은 좋지 않습니다.<br>통계를 보면, 5년 스타트업 생존율이 27퍼센트에 불과하면, 10년 스타트업 생존율은 10퍼센트도 되지 않습니다."
    },
    {
      storyImage: "assets/img/project-story-image04.jpeg",
      storyVideo: "",
      storyContent: "그럼 왜 생존율이 갈수록 낮아질까요?<br>이들은 실패 원인이 시장이 원하지 않는 제품이라 대답하였습니다."
    },
    {
      storyImage: "assets/img/project-story-image06.jpeg",
      storyVideo: "",
      storyContent: "시장이 원하는 제품을 만들기 위해서는<br>비지니스 모델을 확립하고, 고객의 Needs와 Value를 판단하여야 합니다."
    },
    {
      storyImage: "assets/img/project-story-image07.jpeg",
      storyVideo: "",
      storyContent: "하지만, 대부분의 스타트업 비지니스 모델은 가정에 근거하여 작성합니다."
    },
    {
      storyImage: "assets/img/project-story-image08.jpeg",
      storyVideo: "",
      storyContent: "린 스타트업 창시자 에릭 리스는 린 스타트업을 이렇게 정의했습니다.<br>&quot;최소한의 제품(MVP)을 만들어 빠르게 출시하여 고객의 반응을 본 후, 피드백으로 시장에 맞는 최적의 상품을 만드는 것&quot; "
    },
    {
      storyImage: "assets/img/project-story-image09.jpeg",
      storyVideo: "",
      storyContent: "그럼 린 스타트업을 기반으로하는 &quot;고객의 피드백을 받아주는 전문 채널&quot;이 있다면 시장이 원하는 제품을 만드는데 도움이 되지 않을까요?"
    },
    {
      storyImage: "assets/img/project-story-image10.jpeg",
      storyVideo: "",
      storyContent: "스타트업 전용 비지니스 검증 피드백 서비스 &quot;FEED100&quot;를 소개합니다!"
    },
    {
      storyImage: "assets/img/project-story-image11.jpeg",
      storyVideo: "",
      storyContent: "&quot;FEED100&quot;서비스의 프로세스는<br>등록! 매칭! 소통!<br>이렇게 세 프로세스로 구성되있습니다."
    },
    {
      storyImage: "assets/img/project-story-image12.jpeg",
      storyVideo: "",
      storyContent: "그렇다면, 이 서비스를 사용함으로 기업의 이점은 무엇일까요?<br>기업은 지속적인 소통으로 고객의 심층적인 의견을 받을수 있고<br>토론장을 통해 고객이 어떤 가치를 원하는지 어떤 니즈를 원하는지 파악할 수 있습니다.<br>또한 맞춤 보고서를 통해 정리된 데이터를 볼 수 있습니다."
    },
    {
      storyImage: "assets/img/project-story-image13.jpeg",
      storyVideo: "",
      storyContent: "유저는 어떤 이점이 있을까요?<br>유저는 프로젝트에 참여함에 따라 포인트가 지급되고<br>프로젝트 참여 성실도에 따라 최대 만 포인트까지 받을 수 있습니다.<br>또한 레벨에 따라 더 큰 이득과 더 다양한 프로젝트에 참여가 가능합니다."
    },
    {
      storyImage: "assets/img/project-story-image14.jpeg",
      storyVideo: "",
      storyContent: "&quot;FEED100&quot; 서비스를 이용하여 서비스 소개부터 잠재고객 모집, 관리, 홍보까지 누랴보세요!"
    },
    {
      storyImage: "assets/img/project-story-image15.jpeg",
      storyVideo: "",
      storyContent: ""
    },
    {
      storyImage: "assets/img/project-story-image16.jpeg",
      storyVideo: "",
      storyContent: "&quot;FEED100&quot;을 이용해 고객의 반응을 얻은 뒤 시장이 원하는 제품을 만들길 바랍니다."
    },
    {
      storyImage: "",
      storyVideo: "https://www.youtube.com/embed/U9hrwPXeT_E",
      storyContent: "프로젝트 발표 영상"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.totalPageNum = this.projectStorySlides.length + 1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectStoryPage');
  }

  back() {
    this.navCtrl.pop();
  }

  slideChanged() {
    if(this.slides.isBeginning()) {
      this.isFirstSlide = true;
    } else {
      this.isFirstSlide = false;
    }

    if(this.slides.getActiveIndex() > this.totalPageNum) {
      this.currentPageNum = this.totalPageNum;  
    } else {
      this.currentPageNum = this.slides.getActiveIndex();
    };

    this.progressPercent = 100 * ( this.currentPageNum / (this.totalPageNum) );
  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  goFirstSlide() {
    let differencePageNum = this.currentPageNum + 1;
    for(let i = 0; i < differencePageNum; i++) {
      this.slides.slidePrev(200);
    }
  }

  openUserProjectLinkPage() {
    let projectLinkModal = this.modalCtrl.create(UserProjectLinkPage);
    projectLinkModal.present();
  }

  openUserProjectFeedbackFormPage() {
    this.navCtrl.push(UserProjectFeedbackFormPage);
  }
}
