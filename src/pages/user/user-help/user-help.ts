import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

/**
 * Generated class for the UserHelpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-help',
  templateUrl: 'user-help.html',
})
export class UserHelpPage {

  @ViewChild("contentRef") contentHandle: Content;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  userHelpPart1 = [
    {
      title: "FEED100은 어떤 서비스 인가요?",
      subTitle: "가치를 같이 만들어가는 서비스입니다! 당신의 소중한 의견을 들려주세요!",
      topImg: "",
      content: "기업은 유저가 원하는 가치가 무엇인지! 유저는 기업의 서비스를 더욱 가치있게!<br><br><strong>FEED100이란?</strong> 기업의 서비스를 소개하고 잠재고객으로부터 <strong>>피드백</strong>을 얻어 <strong>시장이 100% 원하는 상품</strong>을 만드는데 도움을 주는 것을 목표로 하는 서비스입니다.<br><br>FEED100의 유저가 되어 기업에게 여러분의 소중한 의견을 들려주고 포인트를 적립하세요!<br><br>원하는 프로젝트를! 언제 어디서나! 매주 새롭고 다양한 컨텐츠와 프로젝트가 등록됩니다.<br><br><strong>다양한 서비스를 경험하고 기업과 소통하며 포인트를 쌓아보세요!</strong><br><br>포인트는 1포인트당 1원의 가치로 현금처럼 사용하실 수 있습니다!",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "피드백 작성 팁!",
      subTitle: "기업을 위하여 무엇에 대하여, 왜, 어떻게 느꼈음을 솔직하게 말해주세요.",
      topImg: "",
      content: "피드백이란 서비스의 개선을 위하여 제공하는 유용한 정보나 비판을 말합니다.<br><br>일반적으로 행동이나 생각, 태도 등에서 소통을 통하여 결론을 내리기 때문에 피드백을 주 는 유저와 받아들이는 기업의 자세가 중요합니다.<br><br>피드백 작성에 대한 팁!<br><br><strong>1. How I Feel</strong><br>긍정, 부정, 비판 등 서비스에 대한 느낌을 솔직하게 작성합니다.<br><br><strong>2. What About</strong><br>앞서 느낀 감정이 어디서부터, 어떤 것에 대하여 그렇게 느낀 것인지 작성합니다.<br><br><strong>3. Why</strong><br>왜 그런 감정과 생각을 느끼고 작성했는지 이유에 대하여 작성합니다.<br><br><strong>4. Advice/Suggest</strong><br>장점은 부각시키고 단점은 보완할 수 있는 충고나 제안을 해주세요!<br><br><b>중요! 기업도 사람입니다! 욕설이나 비난 비방은 삼가해주시길 바랍니다.</b>",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "FEED100 서비스는 어떻게 사용하나요? <b>(필독!)</b>",
      subTitle: "다양한 서비스를 경험하고 소중한 의견을 남겨주세요!",
      topImg: "assets/img/user-help-img1.png",
      content: "저희 FEED100을 이용하는 프로세스는 위와 같습니다.<br>과정이 너무 복잡하다고요? 맞습니다 ᅲᅲ<br>저희는 경험과 이해를 바탕으로 진실된 피드백 전달을 추구하는 기업입니다.<br>따라서 정확한 잠재 고객으로부터 솔직한 피드백을 전달하고자 검증 과정을 강화했습니다.<br><strong>유저 분들에게는 그만큼 정성들인 피드백에 대한 충분한 보상을 받을 수 있도록 하겠습니다!</strong><br>하나의 프로젝트(30명 기준)에서 <strong>기본 1천 포인트부터 최대 약 3만 포인트</strong>까지도 받을 수 있습니다!<br><br><strong>프로젝트 신청</strong>: 매주 다양하고 새로운 서비스들을 소개합니다. 마음에 드는 서비스를 보고 신청하세요!<br><strong>매칭</strong>: 기업이 원하는 고객이 맞는지 확인하는 과정입니다. 질문에 신중히 대답해주세요!<br><strong>피드백</strong>: 스토리와 링크를 통해 서비스를 경험하고<br><strong>#해시태그</strong>를 주제로 기업에게 생각과 감정을 솔직한 피드백을 남겨주세요!<br>공감을 많이 받은 피드백은 <strong>BEST 피드백</strong>으로 선정되어 많은 보상이 주어집니다!<br><strong>토론</strong>: 다른 유저들의 생각에 공감 또는 비공감을 표현해 주세요!<br><strong>단, 서로의 의견은 존중하기~!</strong><br><strong>인터뷰</strong>: 기업으로부터 인터뷰 요청을 받으면 참여할 수 있습니다.<br>기업과 직접 소통을 통해 기업의 서비스를 더욱 가치 있게 발전시켜 보세요!<br><strong>심층 피드백</strong>: 프로젝트를 진행한 경험을 토대로 종합적인 의견을 작성하여 기업을 감동시켜보세요!<br><strong>선정될 시 5000 포인트!</strong><br><strong>평가</strong>: 기업의 서비스에 대한 추천 지수를 평가해주세요!<br><strong>보상</strong>: 프로젝트가 완료되면 활동내역에 따른 보상과 특별 보상이 지급됩니다!",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  userHelpPart2 = [
    {
      title: "프로젝트는 어떻게 확인하나요?",
      subTitle: "홈 또는 하단에 있는 프로젝트 탭을 눌러 확인하세요!",
      topImg: "",
      content: "<strong>홈</strong>에서는 참여하고 있는 진행중인 프로젝트와 새로운 프로젝트를 쉽게 확인할 수 있으며 전체 프로젝트는 <strong>프로젝트 탭</strong>에서 모아 보실 수 있습니다!",
      bottomImg: "assets/img/user-help-img2.png",
      content2: "여러분의 피드백을 기다리고 있습니다! 다양하고 새로운 서비스들을 직접 만나보세요!",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트는 어떻게 참여하나요?",
      subTitle: "참여 조건을 확인하고 피드백 작성을 완료하시면 참여 가능하십니다!",
      topImg: "",
      content: "<strong>참여 조건</strong>이란 기업의 서비스를 사용할 자격이 있는지 확인하는 절차입니다.<br><br>기업 측에서 잠재 고객으로 설정한 유저만이 프로젝트에 참여할 수 있음을 양해 부탁드립니다.<br><br>따라서, <b>조건에 맞지 않으면 참여가 불가능</b> 하므로 신중한 답변을 부탁드립니다.",
      bottomImg: "assets/img/user-help-img3.png",
      content2: "조건과 일치하는 유저는 다음 단계인 스토리 보기 및 피드백 작성 단계로 넘어갑니다.<br><br>기업의 스토리를 보고 피드백을 작성해 주세요! <b>(피드백 작성 팁 확인!!)</b>",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트 스토리와 링크는 무엇인가요?",
      subTitle: "기업의 서비스를 소개하는 곳입니다. 열심히 준비한 기업의 정성을 확인해보세요",
      topImg: "",
      content: "<strong>프로젝트 스토리란?</strong><br>서비스를 준비하게 된 배경, 주된 기능 등 기업이 열심히 준비한 서비스를 확인할 수 있는 공간 입니다. 스토리, 이미지, 영상 등을 보고 기업의 서비스를 이해해 보세요!<br><br><strong>링크란?</strong><br>기업의 실제 서비스를 경험 해 볼 수 있는 링크입니다. 프로젝트 스토리의 마지막 장에 위치하 고 있으며 프로젝트 참여 이후에는 프로젝트 화면에도 위치하고 있습니다.",
      bottomImg: "assets/img/user-help-img4.png",
      content2: "스토리를 모두 이해하셨으면 스토리 퀴즈를 풀고 다음 단계인 피드백을 작성해 주세요!<br><br>퀴즈는 스토리를 이해하셨으면 누구나 풀 수 있습니다!<br>만약 틀리셨다면 스토리를 다시 한번 확인해 보세요!",
      bottomImg2: "assets/img/user-help-img5.png",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "피드백 작성 및 첫인상 평가 ",
      subTitle: "#해시태그를 주제로 기업의 서비스에 대하여 피드백 해주세요!",
      topImg: "",
      content: "<strong>필독! 피드백 작성 팁! 을 먼저 확인해 주세요!</strong><br><br><strong>피드백</strong><br>#해시태그를 주제로 한 솔직한 감정과 생각을 작성해 주시면 됩니다.<br>해당 주제에 관하여 느낀 감정이나 생각과 무엇 때문에 그렇게 생각하게 되었으며 왜 그런 생각이나 감정을 느끼게 되었는지 솔직하게 작성해 주세요.<br>여러분들의 소중한 의견들이 기업의 방향과 발전에 큰 도움이 됩니다.<br>비평과 같은 쓴 소리는 환영하지만 욕설이나 비난은 삼가해주시기 바랍니다.<br><br><strong>BEST 피드백</strong>에 선정되면 <strong>피드백 포인트가 2배</strong> 지급됩니다! 공감을 이끌어 내는 피드백을 작성해 보세요.<br><br><strong>첫인상 평가</strong><br>스토리/링크를 통해 기업의 서비스를 이해하고 피드백을 작성해 본 뒤 서비스에 대한 첫인상을 별점으로 평가해 주세요. 솔직한 평가일수록 더 큰 도움이 될 수 있습니다!",
      bottomImg: "assets/img/user-help-img6.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  userHelpPart3 = [
    {
      title: "피드백 토론이 무엇인가요?",
      subTitle: "함께 프로젝트에 참여하고 있는 다른 유저의 의견에 대하여 함께 토론해 보세요!",
      topImg: "",
      content: "프로젝트에 함께 참여하고 있는 유저의 피드백에 대하여 토론이 진행이 됩니다.<br>피드백 당 한 번의 공감/비공감에 대한 적절한 이유와 함께 의사표현을 해주세요!<br><b>단, 상대방의 의견을 존중하며 무시하지 않는 자세로 진행해 주시길 바랍니다.</b><br>토론에 참여하는 방법은 다음과 같습니다.<br>토론하러 가기 버튼 클릭 > 피드백 자세히 보러가기 클릭 > 토론 참여하기 버튼 클릭 > 작성 후 완료",
      bottomImg: "assets/img/user-help-img7.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰란 무엇인가요?",
      subTitle: "기업이 별도로 유저에게 신청하는 것으로 소통을 통하여 심층적인 의견을 나누는 것입니다.",
      topImg: "",
      content: "기업과 유저 사이의 <strong>직접적인 소통</strong>이 가능한 공간이 바로 ‘<strong>인터뷰</strong>’입니다.<br>기업은 참여중인 유저가 작성한 피드백과 토론을 보고 인터뷰 신청을 할 수 있습니다.<br>기업과 함께 소통하면서 기업의 방향과 발전에 큰 도움이 되어 주세요!",
      bottomImg: "assets/img/user-help-img8.png",
      content2: "인터뷰 요청이 오면 알림과 함께 하단 인터뷰 탭에서 확인할 수 있습니다.<br>기업의 인터뷰 질문을 확인하고 의도를 잘 파악하여 답변을 작성해 주세요.<br>인터뷰는 몇 차례 진행될 수 있으며 <strong>대화 형식</strong>으로 진행됩니다.",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "심층 피드백은 어떻게 작성하나요?",
      subTitle: "프로젝트를 경험하면서 느낀 것을 작성해 주세요!",
      topImg: "",
      content: "프로젝트를 참여하면서 작성한 피드백이 첫인상과 같다면 심층 피드백은 피드백 작성 이후 프로젝트를 진행하면서 토론과 인터뷰를 통하여 얻은 정보나 생각들에 대하여 작성하는 것입니다.<br><br>심층 피드백은 따라서 <b class='dark-text'>전체 토론의 1/3(10개)</b>에 참여해야만 작성할 수 있는 자격이 생깁니다.<br><b class='dark-text'>만약 비활성화 된 상태라면 토론에 참여해 주세요!</b><br><br>서비스 요약 또는 링크에 대한 인증을 통하여 직접 서비스를 사용해 본 것을<strong>인증절차를 거쳐야 하며</strong> 인증이 완료되었으면 심층 피드백을 작성해 주세요!<br><b>정상적인 인증이 아닌 경우 작성이 취소될 수 있습니다!</b><br><b class='dark-text'>(단, 인증 과정이 없는 프로젝트의 경우 어떤 서비스인지 요약하여 작성해 주시기 바랍니다)</b><br><br>서비스에 대하여 <strong>만족스러웠던 점, 아쉬웠던 부분</strong>에 대하여 솔직하게 작성해 주시기 바랍니다!<br><br><strong>기타 의견 및 총평</strong>으로는 기업에게 하고싶은 말이나 종합적인 의견을 작성해 주시면 됩니다.<br><br>심층 피드백을 기업이 채택 시에는 <strong>최대 5천원의 포인트</strong>를 특별보상으로 받을 수 있습니다!<br><br>정성들인 심층 피드백을 작성하고 기업을 감동시켜 기업의 선택을 받아보세요!",
      bottomImg: "assets/img/user-help-img9.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "활동 내역은 어떻게 확인하나요?",
      subTitle: "프로젝트 상단 메뉴 버튼을 통하여 확인하세요.",
      topImg: "",
      content: "활동 내역은 프로젝트의 상단 메뉴 버튼을 통하여 손쉽게 확인하실 수 있습니다.<br><br>활동 내역과 함께 해당 활동에 따른 보상이 함께 표시됩니다!<br><br>성실하게 참여하여 많은 보상을 획득 해 보세요!",
      bottomImg: "assets/img/user-help-img10.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  userHelpPart4 = [
    {
      title: "종료된 프로젝트의 보상은 어떻게 획득하나요?",
      subTitle: "마이페이지의 ‘보상받을 프로젝트’를 확인하세요!",
      topImg: "",
      content: "프로젝트가 종료되고 보상이 미지급된 프로젝트는 마이페이지의 ‘보상받을 프로젝트’를 확인하세요",
      bottomImg: "assets/img/user-help-img11.png",
      content2: "보상받기를 누르고 추천 지수를 입력하면 보상을 획득하실 수 있습니다.<br><br><strong>추천 지수(NPS)</strong><br>순수 고객 추천 지수(고객 순 만족 추천 지수)라고 말하며, 충성도(Loyalty)가 높은 고객을 얼마나 많이 보유하고 있는지를 나타내는 지표입니다.<br>이 제품이나 서비스를 동료나 친구들에게 추천할 의향이 얼마나 되시나요? 라는 질문에 0~10점의 척도를 사용하여 솔직하게 평가해 주세요!",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "포인트 환전 신청과 내역 확인은 어떻게 하나요?",
      subTitle: "상단 설정 버튼을 누르시고 포인트 관리 부분을 확인하세요!",
      topImg: "",
      content: "포인트는 마이페이지에서 확인할 수도 있지만, 설정의 '포인트 적립/환전 내역'에서 확인할 수 있습니다.<br><br>환전은 '포인트 환전'에서 환전 금액과 계좌 정보를 작성하고 신청하면 끝!",
      bottomImg: "assets/img/user-help-img12.png",
      content2: "이용약관 '제21 조 보상기준' 에 따릅니다.<br><br>금액 선택 > 예금주 입력 > 입금 은행 입력 > 계좌번호 입력 > 신청하기<br><br>금액은 <strong>최소 1만 포인트부터 최대 10만 포인트까지</strong> 신청 가능합니다.<br><br>환전 금액은 신청 마감일(매월 15일, 월 1회) 기준 5영업일 내에 입력한 은행으로 입금함으로써 적법 하게 지급한 것으로 봅니다.<br><br>즉, 월 14일까지의 신청자는 그 달에, 14일 이후 신청자는 익월에 지급됩니다.",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserHelpPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserHelpPage');
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      for(let i=0; i<this.userHelpPart1.length; i++) {
        if(this.userHelpPart1[i].icon == 'ios-remove-circle-outline') {
          this.userHelpPart1[i].showDetails = false;
          this.userHelpPart1[i].icon = 'ios-add-circle-outline';
        }
      }
      for(let i=0; i<this.userHelpPart2.length; i++) {
        if(this.userHelpPart2[i].icon == 'ios-remove-circle-outline') {
          this.userHelpPart2[i].showDetails = false;
          this.userHelpPart2[i].icon = 'ios-add-circle-outline';
        }
      }
      for(let i=0; i<this.userHelpPart3.length; i++) {
        if(this.userHelpPart3[i].icon == 'ios-remove-circle-outline') {
          this.userHelpPart3[i].showDetails = false;
          this.userHelpPart3[i].icon = 'ios-add-circle-outline';
        }
      }
      for(let i=0; i<this.userHelpPart4.length; i++) {
        if(this.userHelpPart4[i].icon == 'ios-remove-circle-outline') {
          this.userHelpPart4[i].showDetails = false;
          this.userHelpPart4[i].icon = 'ios-add-circle-outline';
        }
      }
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }

  panEnd() {
    if(this.contentHandle.scrollTop <= -90) {
      console.log('pan: ' + this.lastBgV);
      document.querySelector(".help-page-content .scroll-content")['style'].background = 'transparent';
      this.dismiss();
    }
  }

  scrollingEvent($e) {
    var stepV = $e.scrollTop /10 ;
    this.scrollVert = this.lastScrollV - stepV ;
    if (this.scrollVert < 0) {
       this.scrollVert = 0 ;
    } else {
       if (this.scrollVert > 100)
          this.scrollVert = 100 ;
    }
    if(this.scrollVert < 20) {
      // this.transparentPercent = 1 - (this.scrollVert /20);
      // document.querySelector(".help-page-content .scroll-content")['style'].background = 'rgba(0,0,0,'+this.transparentPercent+')';
    }
  }
}
