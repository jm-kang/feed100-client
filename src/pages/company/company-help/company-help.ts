import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';
/**
 * Generated class for the CompanyHelpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-help',
  templateUrl: 'company-help.html',
})
export class CompanyHelpPage {
  @ViewChild("contentRef") contentHandle: Content;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  companyHelpPart1 = [
    {
      title: "FEED100은 어떤 서비스 인가요?",
      subTitle: "FEED100은 고객의 소리를 듣기 위한 서비스입니다.",
      topImg: "assets/img/help-img1.png",
      content: "<strong>FEED100</strong>이란 고객의 소리인 <strong>피드백</strong>을 기업에게 전달하여 <strong>시장이 100% 원하는 상품</strong>을 만드는데 도움을 주고자 하는 서비스입니다.<br><br>2016년 기준 중소기업청 자료에 의하면 국내 신설 법인 수 가 약 10만개로 매년 신설 법인 수가 증가하는 만큼 창업 지원 예산이 1조 4500억원이나 됩니다.<br><br>하지만 여전히 스타트업 생존율은 여전히 너무나도 저조합니다.<br><br>실패의 가장 큰 이유는 바로 시장이 원하지 않는 제품을 만들기 때문입니다.<br><br>'린스타트업'의 저자 \"MVP제품을 만들어 고객의 반응을 얻은 뒤 빨리 보완하는 것이 중요하다\"고 했습니다.<br><br><b>FEED100은 기업의 서비스를 소개하고 잠재 고객으로부터 피드백을 얻어 보고서를 제공해 시장이 100% 원하는 상품을 만드는데 도움을 주는 것을 목표로 하는 서비스입니다.</b>",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "FEED100 서비스는 언제 사용하는 것이 좋나요?",
      subTitle: "목적에 따라 사용하시길 바랍니다.",
      topImg: "",
      content: "목적에 따라 저희 서비스를 이용하시는 것을 추천합니다.<br><br><strong>탐색 목적[Exploratory objectives]:</strong> 시장 트렌드, 전반적인 현황 및 사용자 행태 조사, 신제품 아이디어 탐색<br><br><strong>보완 목적[Complementary Objectives]:</strong> 정량 조사 전 가설 설정을 위해, 정량 조사 결과 확인, 설문으로 얻기 힘든 행동 유형 탐색<br><br><strong>사용성 목적[Usability Test]:</strong> 시제품의 사용성 분석, 사용자의 요구사항 및 개선 사항 도출 ",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "설문조사와는 어떻게 다른가요?",
      subTitle: "인식의 정량 조사가 아닌 서술형의 정성 조사를 하는 방식입니다.",
      topImg: "",
      content: "리서치에는 정량 조사와 정성 조사 있습니다.<br><br>정량 조사는 구조화된 설문을 다수의 응답자를 대상으로 진행한 결과 데이터를 분석하여 단일한 해석을 도출하는 조사입니다.<br><br>정성 조사는 목적에 맞는 소수의 사람 또는 그룹을 대상으로 인터뷰나 관찰을 통해 응답자의 내면을 파악하는 조사입니다.<br><br>일반적으로 정성 조사는 오프라인 위주로 진행됩니다. 하지만 저희는 이런 공간적인 제약을 해결하기 위하여 저희만의 독자적인 온라인 정성 조사 방법을 강구하였습니다.<br><br>온라인 정성 조사는 동기식(Synchronous)과 비(非)동기식(Asynchronous)으로 나뉘는데 동기식은 참여자와 진행자가 같은 시간에 진행하는 방법이고 비 동기식은 참여자의 편한 시간에 조사에 참여하는 방법입니다.<br><br>저희 서비스는 비동기식으로 참여자의 편한 시간에 조사에 참여할 수 있지만 진행자로 기업이 직접 프로젝트를 관리하고 인터뷰할 수 있어 동기식으로도 진행할 수 있도록 했습니다.<br><br>또한 서술형의 피드백뿐만 아니라 기업과 유저가 상호 소통할 수 있는 공간을 마련했습니다.<br><br>잠재고객을 상대로 서비스를 소개하고 피드백을 수집해 활용해 보세요!",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트는 어떻게 진행되나요?",
      subTitle: "[등록 – 매칭 – 소통]의 간단한 프로세스를 가지고 있습니다.",
      topImg: "assets/img/help-img2.png",
      content: "FEED100 서비스를 이용하기 위해서는 약간의 절차가 필요합니다.<br><br>먼저, 기업의 서비스를 소개하는 프로젝트를 등록합니다.<br><br><strong>등록</strong>은 일정한 양식에 맞춰 작성해 주시면 저희의 검토 및 수정 과정을 거쳐 승인되면 등록이 완료됩니다.<br><br><strong>매칭</strong>은 등록이 완료되면 작성한 잠재 고객에 맞는 유저를 매칭해 드립니다.<br><br>이 매칭된 유저들은 스토리를 보고 링크를 통해 경험한 기업의 서비스에 대하여 솔직한 감정과 생각을 피드백으로 작성합니다.<br><br><strong>소통</strong>은 유저의 피드백 및 토론을 확인하고 인터뷰를 통해 직접 소통하실 수 있으며 유저의 심층 피드백를 확인하고 우수 보고서를 선정하실 수 있습니다.<br><br><strong>기간</strong>은 등록 완료 이후 일주일 입니다.",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트를 진행하려면 어느정도 준비가 되어야 하나요?",
      subTitle: "피드백을 받아들일 수 있는 자세만 갖추고 있어도 됩니다. :D ",
      topImg: "",
      content: "잠재 고객이 말하는 피드백을 통하여 서비스의 강점은 귀담아 듣고 발전시키고 단점은 받아들이고 개선해 나갈 수 있는 자세만 갖추고 있다면 누구나 사용하실 수 있습니다. :D<br><br>기업의 서비스를 소개할 스토리를 작성하시면 아이디어만으로도 사용하실 수는 있습니다.<br><br>하지만 저희는 <strong>유저가 직접 서비스를 이용해보고 피드백 하는 것을 권장</strong>합니다.<br><br>MVP제품(최소 요건 제품)의 수준. 즉, 시제품이나 베타서비스 정도의 준비가 되어 있으시면 링크를 통해서 유저가 직접 사용해보고 경험해 본 것을 토대로 프로젝트를 진행하는 것이 이상적인 결과를 이끌어낼 수 있습니다.",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트 간 주의 해야할 점은 무엇인가요?",
      subTitle: "객관적인 관점을 유지하는 것이 중요합니다!",
      topImg: "",
      content: "정성 조사의 경우 객관적인 관점으로 토론 및 인터뷰를 진행해 나가는 진행자(Moderator)가 필요합니다.<br><br>프로젝트의 진행자의 역할을 기업이 해야합니다.<br><br>프로젝트에 참여한 유저의 피드백을 받고 유저와의 인터뷰 과정에서 객관적인 입장을 유지해야 합니다.<br><br><strong>기업측의 생각과 유저의 생각이 다르다고 해서 유저를 설득해서는 안됩니다.</strong><br><br>유저의 생각이 왜 그렇게 생각했는지, 어떤 부분이 그렇게 생각하게 했는지, 감정과 생각의 도출 과정을 이해하려 하고 인식과 태도를 분석하여 서비스에 적용시키는 것이 좋습니다.<br><br><strong>또한 잠재 고객이 자유롭게 말할 기회를 주기 바랍니다.</strong><br><br>구상한 솔루션에 대하여 먼저 노출하고 이해시키려 하면 잠재 고객의 새로운 아이디어를 줄 기회를 제한할 수 있습니다.<br><br>심도 있는 데이터를 수집하기 때문에 일반화 시키기에는 어려운 부분이 있지만 목적에 따른 질문을 적절히 하여 얻은 결과를 토대로 서비스를 더 발전시키시기를 바랍니다! ",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  companyHelpPart2 = [
    {
      title: "프로젝트는 등록은 어떻게 하나요? (신청서 작성 법 Click!)",
      subTitle: "온라인 신청서를 작성하고 검토 후",
      topImg: "",
      content: "* 프로젝트 등록 관련 폼이 나온 이후 추가 등록 *<br><br>* 모범 작성 예시를 통해 각 부분 별 설명 해주면 좋겠다 *<br><br><b>* 주의! 기업의 스토리나 영상 제작은 별도로 해드리지 않습니다. *</b>",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트 가격은 어떻게 책정되나요?",
      subTitle: "프로젝트는 잠재 고객 매칭 유저 수에 따라 책정됩니다.",
      topImg: "",
      content: "프로젝트는 일주일간 진행되며 30명 기준으로 한 프로젝트 당 최대로 받을 수 있는 피드백은 피드백 30개, 토론 870개, 인터뷰 60개, 보고서 30개 입니다.<br><br>프로젝트 개설 이후 가격 명세서는 아래 그림과 같이 상단 메뉴버튼에서 가격 명세서 부분을 클릭하시면 확인 가능합니다.",
      bottomImg: "assets/img/help-img3.png",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트 수정은 어떻게 하나요?",
      subTitle: "저희 FEED100에 문의해 주세요! ",
      topImg: "",
      content: "<ins>feed100.help@gmail.com</ins> 으로 문의 해 주세요!<br><br>문의 시 ‘[수정문의]기업명_프로젝트 명’의 제목으로<br><br>내용에 수정과 관련하여 문의 해 주시기 바랍니다.",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "결제 및 환불은 어떻게 하나요?",
      subTitle: "결제 방법을 안내해드리겠습니다.",
      topImg: "",
      content: "결재 방법<br><br>미정<br><br>환불 방법<br><br>미정",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  companyHelpPart3 = [
    {
      title: "등록 완료된 프로젝트는 어떻게 확인하나요?",
      subTitle: "프로젝트 목록을 확인하세요!",
      topImg: "",
      content: "등록이 완료되는 시점부터 일주일 간 프로젝트가 진행되기 때문에<br><br>홈에서 진행중인 프로젝트를 보시면 등록된 프로젝트를 쉽게 확인하실 수 있습니다. <그림1><br><br>또는 마이페이지를 통하여 프로젝트 상태 별로 확인하실 수 있습니다. <그림2>",
      bottomImg: "assets/img/help-img4.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "작성한 스토리는 어떻게 확인하나요?",
      subTitle: "프로젝트 화면에서 스토리보기를 눌러주세요!",
      topImg: "",
      content: "프로젝트를 클릭하여 들어가면 화면의 썸네일에 스토리 보러가기 버튼을 누르시면 스토리가 어떻게 보여지는지 확인하실 수 있습니다.",
      bottomImg: "assets/img/help-img5.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "참여중인 유저들의 정보는 어떻게 확인하나요? ",
      subTitle: "확인하고자 하는 유저를 클릭해 보세요! 전체를 확인하시고 싶으시면 메뉴를 눌러보세요~",
      topImg: "",
      content: "개인 유저를 확인하는 경우 유저의 이름(또는 프로필)을 클릭하시면 해당 유저에 대한 정보 확인 및 인터뷰 요청 등의 작업을 수행하실 수 있습니다.",
      bottomImg: "assets/img/help-img6.png",
      content2: "전체 유저를 확인하는 경우 프로젝트 메뉴에서 유저 정보를 클릭하면, 유저에 대한 정보와 통계 정보를 확인 가능하며 각각의 유저의 정보 또는 앞서 설명한 방법과 같이 확인 가능합니다.",
      bottomImg2: "assets/img/help-img7.png",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  companyHelpPart4 = [
    {
      title: "참여한 사람들의 피드백은 어떻게 확인하나요?",
      subTitle: "프로젝트 화면에서 스크롤을 내리면 확인할 수 있습니다.",
      topImg: "",
      content: "프로젝트 화면에서 스크롤을 내리면 유저가 작성한 피드백을 확인할 수 있으며<그림1, 1-1><br>피드백 자세히 보러가기 버튼을 통해 해당 피드백에 대하여 확인할 수 있습니다<그림2>. ",
      bottomImg: "assets/img/help-img8.png",
      content2: "피드백은 유저끼리 상호간에 공감/비공감을 표현하며 토론을 할 수 있습니다.<br>공감을 가장 많이 받은 상위 3개의 피드백은 BEST 피드백으로 피드백 상단에 표시가 됩니다. 또한, 홈 상단 알림 종 버튼에 새로운 피드백이 작성되면 표시가 됩니다.<br><br>알람을 통해서도 편하게 이동해 보세요!<br><br><strong>유저들이 여러분의 서비스에 대하여 어떻게 생각하는지 귀 기울여 보세요!!</strong>",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "원하는 피드백을 따로 확인할 수 있나요?",
      subTitle: "카테고리(#해시태그)별로 검색을 통해 확인하실 수 있습니다.",
      topImg: "",
      content: "여러분이 등록 시 신청했던 카테고리(#해시태그)별로 정렬해서 확인하실 수 있습니다.<br><br>피드백에서 해시태그를 선택해서 보시는 방법<그림2>과 검색버튼을 통해 원하는 해시태그를 선택하시는 방법이 있습니다<그림3>.",
      bottomImg: "assets/img/help-img9.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "참여자들의 토론은 어떻게 확인하나요?",
      subTitle: "피드백 자세히 보기에서 스크롤을 내리시면 각 피드백 별로 토론장을 확인하실 수 있습니다!",
      topImg: "",
      content: "참여자들의 토론은 각 피드백 별로 공감 또는 비공감의 의사를 표현하면서 진행이 됩니다.<br><br>단순히 피드백으로 끝나는 것이 아니라 여러 참여자들이 어떤 의견에 얼만큼 공감하는지 확인해보세요!<br><br>토론에는 생각지도 못한 답을 이끌어 내는 힘이 있습니다. 이를 활용해 멋진 서비스를 만들어주세요!",
      bottomImg: "assets/img/help-img10.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰의 원칙<strong>(필독!)</strong>",
      subTitle: "<ins>https://www.youtube.com/watch?v=KZYntTU3JW4&feature=youtu.be</ins>",
      topImg: "",
      content: "(출처 = Startup Lab, LIFFFT Inc’s Youtube video)<br><br>요약:<br><br><strong>1. 사업에 대하여 언급하지마라.</strong><br><br>영업하기 위한 대화는 좋은 정보를 이끌어 내지 못합니다. 판매를 위한 인터뷰가 아니라 피드백을 위한 인터뷰라는 것을 인지하시기 바랍니다.<br><br><strong>2. 당연한 대답을 바라는 질문하지마라.</strong><br><br>당연한 질문을 통해서는 얻을 것이 없으며 검증한 기분은 들지만 실제로는 그렇지 않다는 것을 명심해야 합니다.<br><br><strong>3. ‘밀당’에서 당기기에 집중을 해라.</strong><br><br>설득이나 이해를 바라고 질문을 하지 말고, 잠재 고객의 가치를 이끌어 낼 수 있는 질문을 하시길 바랍니다. 이를 통하여 실제로 고객이 느끼는 문제나 니즈와 가치가 생각하신 것과 달라서 피봇을 할 수 있는 기회가 오는 것입니다.<br><br><strong>4. N of 1은 절대 증명이 아니다.</strong><br><br>한 사람이 어떤 말을 하였다고, 그게 가정을 검증한 것이 아니면서도 꼭 검증 실패도 아니라는 것입니다. 단 한 사람의 말로 큰 결정을 해서는 안됩니다. 만약 한 사람이 아주 흥미롭고 의미 있는 말을 했다면, 그 새로운 가정을 다시 검증하기 위한 인터뷰를 진행하고 같은 결론으로 이어지는지 알아봐야 합니다.<br><br><strong>5. 과거의 행동은 미래 행동을 예측할 수 있는 최고의 잣대이다.</strong><br><br>변수는 있을 수 있지만 대부분의 사람들의 과거 행동들은 사람들이 미래에 어떻게 행동할지 거의 예측할 수 있습니다. 따라서 인터뷰를 하실 때는 피드백에 대하여 생각하게 된 배경이나 행동들을 통해 그것을 바탕으로 미래를 예측할 수 있을 것입니다.<br><br><strong>6. 이상과 현실</strong><br><br>사람들은 누구나 이상적인, 바라는 계획과 꿈이 있는 반면 실제로 현실적으로는 각자 다르게 행동하는 경우들이 있습니다. 이상과 현실에 대하여 잘 구분하고 고객의 가치가 무엇인지 잘 판단하시기 바랍니다.<br><br><strong>7. 스토리를 듣는 것이 진술을 듣는 것 보다 낫습니다.</strong><br><br>인터뷰를 이끌어 갈 때에 왜 그런 행동을 하였나 식의 질문으로 이야기를 듣는 것이 좋습니다. 그 스토리를 통해 더 많이 배울 수 있으며 자연스럽게 더 많은 질문을 하실 수 있게 됩니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰는 어떻게 진행되나요?",
      subTitle: "기업과 유저간 대화 형식으로 진행합니다.",
      topImg: "assets/img/help-img11.png",
      content: "인터뷰는 기업이 신청하고 유저가 답변을 하는 형식의 대화 방식으로 진행이 됩니다.<br><br>인터뷰는 다양한 참여자 중 1명의 응답자와 일대일로 진행이 되며 심리를 파악하는 조사법으로 질문에 대하여 응답자의 생각과 느낌을 자유롭게 이야기함으로써 응답자의 감정이나 욕구, 태도 등을 이끌어내는 방법입니다.<br><br>장점으로는 조사 대상자 개개인의 의견을 다양하고 풍부하게 수집할 수 있으며, 심층적인 의견에 대하여 조사가 가능합니다.<br><br>단점은 조사 결과를 일반화하기 어려우며 질문이 표준화 되어 있지 않고 답변에 따른 해석이 어렵습니다.<br><br><strong>꼭 인터뷰의 원칙을 필독! 하시고 인터뷰를 진행하시기 바랍니다.</strong>",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰는 어떻게 신청하나요?",
      subTitle: "3가지의 방법이 있습니다.",
      topImg: "",
      content: "<strong>꼭 인터뷰의 원칙을 필독! 하시고 인터뷰를 진행하시기 바랍니다.</strong><br><br>방법 1<br><br>프로젝트 화면의 하단 인터뷰 아이콘을 클릭 <그림1><br><br>방법 2<br><br>유저의 프로필을 클릭하여 인터뷰 신청 <그림2><br><br>방법 3<br><br>하단 인터뷰 탭(?)을 통하여 신청 <그림3> ",
      bottomImg: "assets/img/help-img12.png",
      content2: "상세 방법 안내<br><br>방법 1<br><br>먼저 진행중인 프로젝트의 화면에서 우측 하단에 있는 인터뷰 버튼을 클릭하게 되면 <그림4-1>의 화면이 나오게 됩니다. 인터뷰 하고자 하는 유저를 클릭하여 <그림 4-2>의 인터뷰 요청하기를 눌러 진행하면 됩니다.<br><br>방법 2<br><br>인터뷰 하고자 하는 유저의 프로필에서 인터뷰 요청하기를 누르면 <그림 4-2>의 인터뷰 요청하기 버튼을 눌러 진행하면 됩니다.<br><br>방법 3<br><br>인터뷰를 진행하고자 하는 프로젝트를 선택한 이후 방법1과 동일합니다.",
      bottomImg2: "assets/img/help-img13.png",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰는 어떻게 확인하나요?",
      subTitle: "새로운 답변은 상단 알림을 확인하세요!",
      topImg: "",
      content: "인터뷰에 대한 새로운 답변은 상단 알림을 통해 간편히 확인하실 수 있습니다!<br><br>(기존 답변들은 인터뷰 신청과 동일한 방법으로 확인하실 수 있습니다.)",
      bottomImg: "assets/img/help-img14.png",
      content2: "알림에서는 확인한 알림과 미확인 알림을 별도로 표시해주며 알림을 클릭하게 되면 해당 프로젝트 별 화면으로 전환됩니다.",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "심층 피드백은 어떻게 확인하고 선정하나요?",
      subTitle: "심층 피드백이 작성되면 알림으로 알려드립니다!",
      topImg: "",
      content: "심층 피드백이 새롭게 작성되면 알림을 통하여 바로 알려드리며 별도로 프로젝트 메뉴에서 확인 가능합니다.<br><br>심층 피드백은 프로젝트를 참여한 유저들이 심층 피드백 작성 조건을 만족시키면 유저들이 자유롭게 양식에 맞도록 작성하는 것으로 <strong>필수가 아닙니다.</strong><br><br>서비스에 대하여 만족스러웠던 점과 아쉬웠던 부분을 솔직하게 작성한 심층 피드백을 <strong>최대 3개</strong> 선정하실 수 있습니다.<br><br>서비스 개선과 발전 방향에 큰 도움이 된 심층 피드백을 직접 선정해 보세요!<br><br>(선정 기간은 프로젝트 기간 + 심사기간 2일 까지 입니다. 심사기간 내 선정하지 않을 시 저희가 엄선하여 선정할 수 있습니다.)",
      bottomImg: "assets/img/help-img15.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  companyHelpPart5 = [
    {
      title: "프로젝트 결과물은 어떻게 확인하나요?",
      subTitle: "프로젝트 메뉴를 통하여 각각의 정보를 확인하실 수 있습니다.",
      topImg: "",
      content: "<그림1>의 프로젝트 메뉴에 있는 각각의 정보 확인 버튼을 통하여 간편하게 데이터를 확인하실 수 있습니다.<br><br>결과보고서에는 전체적인 종합적인 결과를 확인하실 수 있습니다. <그림2><br><br>유저 정보에서는 참여하고 있는 유저목록뿐만 아니라 유저들이 처음 프로젝트에 참여하기 위해 작성한 프로젝트 참여 조건에 대한 통계와 기본 정보들에 대한 통계를 보실 수 있습니다. <그림3><br><br>프로젝트 통계는 유저들의 첫인상 평가 점수, 추천 지수(NPS), 서비스 만족도 평가 한 것을 확인하실 수 있습니다. <strong>(단, 추천 지수와 서비스 만족도 평가는 프로젝트가 종료된 이후 유저들이 입력하는 것으로 진행 중에서는 입력이 되어있지 않습니다.)</strong> <그림4><br><br>심층 피드백은 참여한 유저들의 심층 피드백을 모아서 확인하실 수 있으며 보고서 선정 또한 여기서 진행하실 수 있습니다. <그림5>",
      bottomImg: "assets/img/help-img16.png",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyHelpPage');
  }
  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      for(let i=0; i<this.companyHelpPart1.length; i++) {
        if(this.companyHelpPart1[i].icon == 'ios-remove-circle-outline') {
          this.companyHelpPart1[i].showDetails = false;
          this.companyHelpPart1[i].icon = 'ios-add-circle-outline';
        }
      }
      for(let i=0; i<this.companyHelpPart2.length; i++) {
        if(this.companyHelpPart2[i].icon == 'ios-remove-circle-outline') {
          this.companyHelpPart2[i].showDetails = false;
          this.companyHelpPart2[i].icon = 'ios-add-circle-outline';
        }
      }
      for(let i=0; i<this.companyHelpPart3.length; i++) {
        if(this.companyHelpPart3[i].icon == 'ios-remove-circle-outline') {
          this.companyHelpPart3[i].showDetails = false;
          this.companyHelpPart3[i].icon = 'ios-add-circle-outline';
        }
      }
      for(let i=0; i<this.companyHelpPart4.length; i++) {
        if(this.companyHelpPart4[i].icon == 'ios-remove-circle-outline') {
          this.companyHelpPart4[i].showDetails = false;
          this.companyHelpPart4[i].icon = 'ios-add-circle-outline';
        }
      }
      for(let i=0; i<this.companyHelpPart5.length; i++) {
        if(this.companyHelpPart5[i].icon == 'ios-remove-circle-outline') {
          this.companyHelpPart5[i].showDetails = false;
          this.companyHelpPart5[i].icon = 'ios-add-circle-outline';
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
