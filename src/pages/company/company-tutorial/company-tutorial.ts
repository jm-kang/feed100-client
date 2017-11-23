import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';

/**
 * Generated class for the CompanyTutorialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-tutorial',
  templateUrl: 'company-tutorial.html',
})
export class CompanyTutorialPage {
  @ViewChild(Slides) slides: Slides;

  isFirstSlide: boolean = true;
  isFeedback: boolean = true;

  tutorialMainImage: String = "assets/img/tutorial-main-image.png";
  avatarImage: String = "assets/img/porten-logo.png";
  nickname: String = "포텐브라더스";
  tutorialName: String = "FEED100 서비스 튜토리얼";

  tutorialSummary: String = "<strong>1. 프로젝트 등록</strong><br>&ensp;- 등록 양식을 이용한 등록 신청<br><strong>2. 프로젝트 진행</strong><br>&ensp;- 피드백, 토론, 인터뷰<br><strong>3. 프로젝트 결과 확인</strong><br>&ensp;- 종합 결과<br>&ensp;- 심층 피드백<br>&ensp;- 유저 정보, 프로젝트 통계"

  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  tutorialSlides = [
    {
      tutorialImage: "assets/img/tutorial/company-tutorial1.png",
      tutorialContent: "",
    },
    {
      tutorialImage: "assets/img/tutorial/company-tutorial2.png",
      tutorialContent: "간단한 양식을 통해 프로젝트 등록 신청을 하실 수 있습니다!<br>상단의 설정 버튼을 누르고 아래에 보시면 프로젝트 등록하기 버튼이 있습니다.<br>등록 신청을 제출하시면 저희가 필요한 정보에 대하여 입력하신 메일이나 연락처를 통해 연락 드리도록 하겠습니다!",
    },
    {
      tutorialImage: "assets/img/tutorial/company-tutorial3.png",
      tutorialContent: "",
    },
    {
      tutorialImage: "assets/img/tutorial/company-tutorial4.png",
      tutorialContent: "프로젝트가 등록이 완료되면 <strong>일주일간</strong> 프로젝트가 진행이 됩니다.<br>진행 중에는 <strong>피드백, 토론, 인터뷰</strong>를 통해 유저와의 소통이 가능합니다!<br><strong>‘피드백 자세히 보러가기’</strong> 버튼을 통하여 각 피드백 별 토론 또한 확인하실 수 있습니다.",
    },
    {
      tutorialImage: "assets/img/tutorial/company-tutorial5.png",
      tutorialContent: "인터뷰를 진행하는 방법은 3가지가 있습니다.<br><strong>방법 1</strong> 프로젝트 화면의 하단 <strong>인터뷰 아이콘</strong>을 클릭<br><strong>방법 2</strong> 하단 <strong>인터뷰 탭</strong>을 통하여 신청<br><strong>방법 3</strong> <strong>유저의 프로필</strong>을 클릭하여 인터뷰 신청",
    },
    {
      tutorialImage: "assets/img/tutorial/company-tutorial6.png",
      tutorialContent: "다음으로는 <strong>인터뷰 대상</strong>을 선택합니다(방법3 제외)<br>인터뷰는 요청하고 답변을 주고 받는 유저와 <strong>대화 형식</strong>으로 진행됩니다!<br>인터뷰 질문을 작성하는 방법이 상당히 중요합니다! 반드시 <strong>도움말</strong>의 <strong>인터뷰 원칙</strong>을 읽어주세요!",
    },
    {
      tutorialImage: "assets/img/tutorial/company-tutorial7.png",
      tutorialContent: "",
    },
    {
      tutorialImage: "assets/img/tutorial/company-tutorial8.png",
      tutorialContent: "프로젝트 결과 확인은 프로젝트의 상단 메뉴 버튼을 통해 들어갈 수 있습니다.<br>먼저 결과 보고서는 프로젝트의 전체 종합적인 보고서를 제공해 드립니다!<br>다양한 통계 정보와 데이터를 쉽게 확인하실 수 있습니다!",
    },
    {
      tutorialImage: "assets/img/tutorial/company-tutorial9.png",
      tutorialContent: "심층 피드백은 유저가 프로젝트를 진행하고 직접 서비스를 이용하고 서비스에 대하여 만족스러웠던 점과 아쉬웠던 부분을 솔직하게 작성합니다.<br>서비스 <strong>개선</strong>과 <strong>발전 방향</strong>에 큰 도움이 된 심층 피드백을 직접 선정해 보세요!<strong>(최대 3개 선정)</strong><br>(선정 기간은 프로젝트 기간 + 심사기간 2일 까지 입니다. 선정하지 않을 시 저희가 엄선하여 선정할 수 있습니다)",
    },
    {
      tutorialImage: "assets/img/tutorial/company-tutorial10.png",
      tutorialContent: "<strong>유저 정보</strong>에는 참여하고 있는 유저 목록과 유저들의 정보 및 참여 조건 들을 확인하실 수 있습니다.<br><strong>프로젝트 통계</strong>에는 유저들이 입력한 <strong>첫인상 평가, 만족도 평가, 추천 지수</strong>를 확인할 수 있습니다.<br>(단, 만족도 평가와 추천 지수는 프로젝트 종료 이후 입력 되므로 진행 중에는 비어 있음을 알립니다)",
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyTutorialPage');
    this.totalPageNum = this.tutorialSlides.length + 1;
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

  openCompanyHelpPage() {
    let helpModal = this.modalCtrl.create('ModalWrapperPage', { page: 'CompanyHelpPage' });
    helpModal.present();
  }
}
