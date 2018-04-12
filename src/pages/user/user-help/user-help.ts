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
      title: "FEED100은 어떤 서비스인가요?",
      subTitle: "여러분의 소중한 의견과 경험을 들려주세요!",
      topImg: "assets/img/user-help-img1.png",
      content: "<strong>FEED100</strong>은 다양하고 <b>새로운 서비스를 소개</b>하고 그 서비스를 준비하는 기업(스타트업)에게 유저의 <b>솔직한 의견을 전달</b>해 주는 서비스입니다!<br><br>여러분은 ‘이것은 혁신이다!’ 하는 서비스를 경험해 보신 적 있으신가요?<br>또는 ‘이런 서비스는 도대체 왜 만들었을까?’라고 생각해 보신 적 있으신가요?<br><br>여러분의 의견이 큰 변화를 일으킬 수 있습니다.<br><b>저희 FEED100이 여러분의 그런 생각과 경험들을 사겠습니다!</b><br><br>FEED100의 유저가 되어 기업에게 여러분의 소중한 의견을 들려주고 포인트를 적립하세요!<br>포인트는 1포인트 당 1원의 가치로 현금처럼 사용하실 수 있습니다!<br>매주 새롭고 다양한 프로젝트가 등록됩니다. 재밌고! 유용한! 신기한! 원하는 프로젝트를 언제 어디서나 누구보다 먼저 경험해 보실 수 있습니다.<br><br><strong>다양한 서비스를 경험하고 기업과 소통하며 포인트를 쌓아보세요!</strong>",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "FEED100 서비스는 어떻게 사용하나요?",
      subTitle: "다양하고 새로운 서비스를 경험하고 여러분의 소중한 의견을 남겨주세요!",
      topImg: "",
      content: "간단합니다!<br><b>[참여 – 인터뷰 – 보상]</b>의 프로세스를 갖추고 있습니다!<br><br><b>원하는 프로젝트에 참여</b>하고 진행되는 기간 동안 그 <b>기업과 인터뷰를 진행</b>하면 됩니다.<br>프로젝트가 종료된 이후 해당 프로젝트에서 <b>획득한 포인트를 보상</b> 받으실 수 있습니다!<br><br>단! 모든 프로젝트를 모두가 참여할 수 있는 것은 아닙니다.<br>참여를 위해서는 정확한 잠재 고객과의 매칭을 위한 몇 가지 설문이 진행됩니다.<br><br>매칭 과정을 거쳐 기업의 스토리를 보고 설문 입력이 완료되면 기업과의 인터뷰가 시작됩니다.<br>이때부터 참여에 따른 기본적인 보상이 지급되며 성실한 답변에 따라 더욱 큰 보상을 획득하실 수 있습니다!<br><br>보상 기준은 다음과 같습니다.<br>&ensp;기본 참여보상 : 200p ~ 1000p<br>&ensp;인터뷰 보상(회당) : 200p ~ 500p <small>(최대 5회 지급)</small><br>&ensp;우수 참여자 보상 : 2000p<br><br><b>성실히 답변을 할수록 최대 포인트를 획득 하실 수 있으니 여러분의 소중한 의견을 들려주세요!</b>",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  userHelpPart2 = [
    {
      title: "프로젝트가 무엇인가요?",
      subTitle: "기업의 서비스를 소개하고 기간 동안 인터뷰를 할 수 있는 소통을 위한 하나의 단위입니다.",
      topImg: "assets/img/user-help-img2.png",
      content: "프로젝트는 카드형식으로 이미지와 제목으로 어떤 서비스인지 간단히 확인할 수 있습니다.<br>참여한 이후에는 프로젝트가 진행되는 기간 동안 해당 기업과 인터뷰를 진행할 수 있습니다.<br><br><b>마음에 드는 프로젝트를 선택하여 기업과 소통을 해보세요!</b>",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트는 어떻게 참여하나요?",
      subTitle: "참여조건을 확인하는 몇 가지 설문을 통해 참여 가능합니다!",
      topImg: "assets/img/user-help-img3.png",
      content: "<b>참여조건</b>이란 기업의 서비스에 맞는 잠재고객이 맞는지 확인하는 절차입니다.<br>기업 측에서 잠재고객으로 설정한 유저만이 프로젝트에 참여할 수 있음을 양해 부탁드립니다.<br>따라서 <b>조건에 맞지 않으면 참여가 불가능</b>하므로 <b class='dark-text'>신중한 답변</b>을 부탁드립니다!<br><br>조건과 일치하는 유저는 다음 단계로 넘어가 스토리 보기 및 인터뷰로 넘어갈 수 있습니다.<br>기업의 스토리를 보고 인터뷰에 참여해 주세요!",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트 스토리와 테스트 미션이 무엇인가요?",
      subTitle: "기업의 서비스를 직·간접적으로 경험을 할 수 있는 곳입니다.",
      topImg: "assets/img/user-help-img4.png",
      content: "<b>- 프로젝트 스토리</b><br>서비스를 준비하게 된 배경, 주된 기능 등 기업이 열심히 준비한 서비스를 확인할 수 있는 공간입니다. 스토리, 이미지, 영상 등을 보고 기업의 서비스를 이해해 보세요!<br><br><b>- 테스트 미션</b><br>기업의 실제 서비스를 경험해 볼 수 있는 링크입니다. 프로젝트 스토리의 마지막 장에 위치하고 있으며 테스트에 따라 직접 경험해 본 것을 토대로 인터뷰를 작성해주세요!<br><br>스토리를 모두 이해하셨으면 <b>스토리 퀴즈</b>를 풀고 다음으로 넘어가실 수 있습니다!<br>퀴즈는 스토리를 이해하셨다면 누구나 풀 수 있는 문제입니다! 만약 틀리셨다면 스토리를 다시 확인해보세요!",
      bottomImg: "",
      content2: "스토리를 모두 이해하셨으면 스토리 퀴즈를 풀고 다음 단계인 피드백을 작성해 주세요!<br><br>퀴즈는 스토리를 이해하셨으면 누구나 풀 수 있습니다!<br>만약 틀리셨다면 스토리를 다시 한번 확인해 보세요!",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "첫인상 평가와 인터뷰 답변하기",
      subTitle: "경험하면서 느낀 점에 대하여 솔직하게 작성해주세요!",
      topImg: "assets/img/user-help-img5.png",
      content: "<b>- 첫인상 평가</b><br>스토리와 테스트를 통해 기업의 서비스를 경험한 뒤 느낀 첫인상을 1~10점으로 평가해주세요.<br>솔직한 평가일수록 더 큰 도움이 될 수 있습니다!<br><br><b>- 인터뷰</b><br>처음 인터뷰는 여러분이 첫인상 평가를 한 것을 토대로 작성해주시면 됩니다!<br>질문에 대하여 느낀 감정이나 생각에 대하여 작성해주세요.<br>무엇에 대하여, 왜, 어떻게 느꼈음을 솔직하게 말해주세요! <b>(인터뷰 작성 팁 확인!)</b><br>여러분의 소중한 의견들이 기업의 방향과 발전에 큰 도움이 됩니다!<br>비평과 같은 쓴 소리는 환영하지만 욕설이나 비난은 삼가주시기 바랍니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰 선호 시간이란?",
      subTitle: "하루 중 인터뷰 요청에 따른 응답에 대하여 선호하는 시간을 말합니다.",
      topImg: "",
      content: "프로젝트에 참여하게 되면 프로젝트 진행기간 동안 인터뷰가 진행됩니다.<br><br>인터뷰가 선호 시간에만 진행되는 것은 아니지만 기업이 여러분이 선택한 선호 시간을 확인하고 해당 시간에 인터뷰가 원활히 이루어질 수 있도록 확인하는 목적으로 활용됩니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  userHelpPart3 = [
    {
      title: "인터뷰란?",
      subTitle: "기업이 별도로 유저에게 신청하는 것으로 소통을 통하여 심층적인 의견을 나누는 것입니다.",
      topImg: "assets/img/user-help-img6.png",
      content: "기업과 유저 사이에 직접적인 소통이 가능한 ‘인터뷰’입니다.<br>인터뷰는 기업이 질의하고 유저가 응답하는 대화 형식으로 진행됩니다.<br><br>기업과 함께 소통하면서 기업의 방향과 발전에 큰 도움이 되어주세요!",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰 작성 팁! <small>(중요)</small>",
      subTitle: "무엇에 대하여, 왜, 어떻게 느꼈음을 솔직하게 말해주세요!",
      topImg: "",
      content: "인터뷰는 심리를 파악하는 조사법으로 질문에 대하여 응답자의 생각과 느낌을 자유롭게 나눔으로써 감정이나 욕구, 태도 등을 이끌어내는 방법입니다.<br><br>여러분들의 경험과 생각들에 대하여 솔직하게 답변해주시면 됩니다!<br>기업의 서비스의 방향과 발전에 여러분의 의견이 큰 도움이 됩니다!<br><br>인터뷰 응답에 대한 팁!<br><b>1. How I Feel</b><br>&ensp;긍정, 부정, 비판 등 서비스에 대한 느낌을 솔직하게 작성합니다.<br><b>2. What About</b><br>&ensp;앞서 느낀 감정이 어디서부터, 어떤 것에 대하여 그렇게 느낀 것인지 작성합니다.<br><b>3. Why</b><br>&ensp;왜 그런 감정과 생각을 느끼고 작성했는지 이유에 대하여 작성합니다.<br><b>4. Advice/Suggest</b><br>&ensp;장점은 부각시키고 단점은 보완할 수 있는 충고나 제안을 해주세요!<br><br>무엇보다 <b>솔직하게</b> 여러분의 이야기를 들려주는 것이 좋습니다!<br><strong>하지만! 기업도 사람입니다. 욕설이나 비난 비방은 삼가주시기 바랍니다!</strong>",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰 답변하기",
      subTitle: "질문에 대하여 솔직하게 답변하기!",
      topImg: "assets/img/user-help-img7.png",
      content: "인터뷰 요청이 오면 알림과 함께 프로젝트 카드에 표시가 됩니다.<br>기업의 인터뷰 질문을 확인하고 의도를 잘 파악하여 답변을 작성해주세요!<br><br>인터뷰는 <b>회당 최소 200p에서 최대 500p</b>를 획득할 수 있습니다!<br>최대 5회까지 보상을 획득하실 수 있으며 <b>우수 참여자로 선정이 되면 2000p</b>를 추가로 획득하실 수 있으니 성실히 응답해주시기 바랍니다!<br><br><strong>주의!</strong><br>만약 인터뷰에 성실히 참여하지 않을 시 이용약관 '제16 조 이용자의 의무'에 의거 프로젝트에서 제외되어 보상을 획득하실 수 없습니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "스토리는 다시 볼 수 없나요?",
      subTitle: "인터뷰 작성 시 ‘스토리 다시보기’ 버튼을 통해 다시 볼 수 있습니다!",
      topImg: "assets/img/user-help-img8.png",
      content: "인터뷰 질문에 스토리가 잘 기억이 나지 않을 수 있습니다.<br>이 때, 질문 하단에 있는 <b>‘스토리 다시보기’</b> 버튼을 눌러보세요!<br><br>기존의 좌우 슬라이드 방식의 스토리 보기가 아닌 <b class='dark-text'>상하 스크롤 방식의 스토리</b>가 나타납니다.<br><br>스토리를 다시 한 번 확인하시고 질문에 답변해주세요!",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "지난 인터뷰를 다시 보고 싶어요.",
      subTitle: "질문 하단에 있는 ‘지난 인터뷰 보기’ 버튼을 눌러보세요!",
      topImg: "assets/img/user-help-img9.png",
      content: "지난 인터뷰에서는 어떻게 답변을 했는지 잘 기억이 나지 않으세요?<br>그럴 때는 질문 하단에 있는 ‘지난 인터뷰 보기’ 버튼을 눌러보세요!<br><br>대화형식으로 질문과 답변을 쉽게 확인하실 수 있습니다!<br>또한, 기업이 좋아요를 누른 응답은 하트가 표시됩니다.<br>우수 참여자가 되어 더 많은 보상을 노려보세요!",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  userHelpPart4 = [
    {
      title: "종료된 프로젝트의 보상은 어떻게 획득하나요?",
      subTitle: "보상을 획득하지 않은 프로젝트는 상단에 표시가 됩니다! ‘보상 받기’를 눌러주세요!",
      topImg: "assets/img/user-help-img10.png",
      content: "프로젝트가 종료되고 보상이 미지급된 프로젝트는 프로젝트 탭 상단에 표시가 됩니다.<br>‘보상 받기’를 누르고 추천지수를 입력하면 보상을 획득하실 수 있습니다.<br><br><b>- 추천지수</b><br>해당 프로젝트의 제품이나 서비스를 동료나 친구들에게 추천할 의향이 얼마나 되시나요? 라는 질문에 1~10점의 척도를 사용하여 솔직하게 평가해주세요!<br>첫인상 평가와 비슷하지만 본인이 느낀 첫인상 평가와 달리 지인에게 추천할 정도를 나타내는 것으로 얼마나 이 서비스를 좋아하는지 나타내는 것입니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  userHelpPart5 = [
    {
      title: "내 포인트는 어디서 확인할 수 있나요?",
      subTitle: "하단의 ‘마이페이지’ 탭에서 확인할 수 있습니다!",
      topImg: "assets/img/user-help-img11.png",
      content: "하단의 <b>‘마이페이지’</b> 탭에서 자신의 정보와 함께 포인트를 한 눈에 확인할 수 있습니다!<br><br>또한 포인트 하단의 <b>‘포인트내역 확인’</b> 버튼을 통해 자신의 포인트 적립과 환전에 대한 내역을 모두 확인할 수 있습니다!<br>적립 내역에서 언제 어떤 프로젝트에서 몇 포인트를 적립했는지 확인할 수 있으며 환전 내역에서 언제 얼마를 환전 받았는지 확인할 수 있습니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "포인트 환전은 어떻게 신청하나요?",
      subTitle: "‘포인트 환전하기’ 버튼을 눌러주세요!",
      topImg: "assets/img/user-help-img12.png",
      content: "포인트 환전은 ‘포인트 환전하기’ 버튼을 눌러주세요!<br>금액은 최소 1만 포인트부터 최대 5만 포인트까지 신청 가능합니다.<br>환전 금액과 계좌 정보를 작성하고 신청하면 끝!<br><br>포인트 환전 신청 시 바로 포인트가 차감되며 취소가 불가능합니다.<br>환전 금액은 매월 15일에(휴일일 경우 다음 영업일에 입금) 입력한 계좌로 입금함으로써 적법하게 지급한 것으로 봅니다.<br>환전 신청 마감일은 매월 13일이며 이후 신청 건은 다음 달 15일에 지급합니다.<br><br>본 내용은 이용약관 “제21 조 보상기준”을 따릅니다.",
      bottomImg: "",
      content2: "",
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
      for(let i=0; i<this.userHelpPart5.length; i++) {
        if(this.userHelpPart5[i].icon == 'ios-remove-circle-outline') {
          this.userHelpPart5[i].showDetails = false;
          this.userHelpPart5[i].icon = 'ios-add-circle-outline';
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
