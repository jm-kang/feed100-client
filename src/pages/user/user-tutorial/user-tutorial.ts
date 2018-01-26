import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';

/**
 * Generated class for the UserTutorialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-tutorial',
  templateUrl: 'user-tutorial.html',
})
export class UserTutorialPage {
  @ViewChild(Slides) slides: Slides;

  isFirstSlide: boolean = true;
  isFeedback: boolean = true;

  tutorialMainImage: String = "assets/img/tutorial-main-image.png";
  avatarImage: String = "assets/img/porten-logo.png";
  nickname: String = "포텐브라더스";
  tutorialName: String = "FEED100 서비스 튜토리얼";

  tutorialSummary: String = "<strong>1. 프로젝트 신청</strong><br>&ensp;- 참여 조건 확인, 스토리 퀴즈<br>&ensp;- 피드백, 첫인상 평가<br><strong>2. 프로젝트 진행</strong><br>&ensp;- 토론, 인터뷰, 보고서<br><strong>3. 프로젝트 종료 및 보상 지급</strong><br>&ensp;- 만족도 평가, 추천 지수"

  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  tutorialSlides = [
    {
      tutorialImage: "assets/img/tutorial/user-tutorial1.png",
      tutorialContent: "",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial2.png",
      tutorialContent: "",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial3.png",
      tutorialContent: "다양한 프로젝트를 확인하고 신청하세요!<br>참여 조건에 맞아야 신청이 가능하니 신중하게 선택해 주시기 바랍니다.<br>참여 조건에 충족했으면 스토리를 보러 가볼까요?",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial4.png",
      tutorialContent: "스토리는 기업이 정성 들여 열심히 준비한 서비스를 소개하는 페이지입니다.<br>스토리와 링크를 통해 기업이 어떤 서비스를 소개하고 있는지 확인해 보세요!<br>스토리를 잘 이해했는지 간단한 퀴즈를 풀어 다음으로 넘어가실 수 있습니다!",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial5.png",
      tutorialContent: "스토리 퀴즈는 스토리를 이해하셨다면 쉽게 맞출 수 있습니다!<br>(스토리는 틀려도 다시 도전하실 수 있습니다.)<br>스토리 퀴즈를 맞추셨다면 이제 피드백을 작성해 주세요!",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial6.png",
      tutorialContent: "피드백은 기업의 서비스에 대하여 솔직하게 작성해 주시면 1000 포인트 획득! <strong>베스트 피드백은 두 배!</strong><br>마지막으로 기업의 서비스에 대한 첫인상 평가를 남겨주시면 신청 완료!",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial7.png",
      tutorialContent: "",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial8.png",
      tutorialContent: "프로젝트 참여가 완료되었다고 끝이 아닙니다!<br>먼저 토론에 대해 알아볼까요? 피드백 -> 토론 참여하기 -> 공감/비공감 표현하기! 간단하죠?<br>“토론하러 가기“ 버튼을 통해 완료/미완료를 쉽게 구분할 수 있어 따로 찾지 않으셔도 됩니다!",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial9.png",
      tutorialContent: "프로젝트에 참여한 다른 유저가 작성한 피드백을 보고 의사를 표현해 주시면 됩니다! 토론은 다른 유저가 작성한 모든 피드백에 작성 가능합니다. 회당 100 포인트 지급!<br>(단, 고의적 비공감 또는 용인가능범위를 벗어난 행위에 대하여 제재가 있을 수 있습니다.)",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial10.png",
      tutorialContent: "인터뷰는 기업과 대화 형식으로 진행됩니다! 회당 500 포인트 지급!<br>기업으로부터 인터뷰 요청을 받으면 참여할 수 있습니다.<br>기업과 함께 소통하면서 기업의 방향과 발전에 큰 도움이 되어 주세요!",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial11.png",
      tutorialContent: "심층 피드백이란 프로젝트를 진행하면서 얻은 정보나 생각들을 종합적으로 작성하는 것입니다. 따라서, 직접 사용한 인증이 필수이며, 프로젝트 활동이 필요합니다.<br>(만약 비활성화 된 상태라면 토론에 참여해 주세요!)",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial12.png",
      tutorialContent: "서비스에 대하여 만족스러웠던 점, 아쉬웠던 부분, 의견 및 총평에 대하여 솔직하게 작성해 주시기 바랍니다!<br>심층 피드백이 기업으로부터 선정되면 5000 포인트가 지급되니 기업을 감동시켜 보세요! (기본 1000 포인트)",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial13.png",
      tutorialContent: "",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial14.png",
      tutorialContent: "프로젝트가 종료되었으면 보상을 받아야죠! 마이페이지에서 보상받을 프로젝트를 추천지수 평가하면 보상받기 완료! 추천지수는 질문에 0~10점의 척도를 사용하여 솔직하게 평가해 주세요!",
    },
    {
      tutorialImage: "assets/img/tutorial/user-tutorial15.png",
      tutorialContent: "포인트는 마이페이지에서 확인할 수도 있지만 설정의 ‘포인트 적립/환전 내역’에서 확인할 수 있습니다. 환전은 ‘포인트 환전에서 환전금액과 계좌 정보를 작성하고 신청하면 끝!",
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTutorialPage');
    this.totalPageNum = this.tutorialSlides.length + 1;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserTutorialPage');
  }

  back() {
    this.navCtrl.pop();
  }

  slideChanged() {
    if(this.slides.isBeginning()) {
      this.slides.lockSwipeToPrev(true);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '16px'; // 추가
      this.isFirstSlide = true;
    } else {
      this.slides.lockSwipeToPrev(false);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '0'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionProperty = 'margin-left'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionDuration = '0.4s'; // 추가
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

  openUserHelpPage() {
    let helpModal = this.modalCtrl.create('ModalWrapperPage', { page: 'UserHelpPage' });
    helpModal.present();
  }

}
