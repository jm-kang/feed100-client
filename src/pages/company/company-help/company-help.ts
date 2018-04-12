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
      subTitle: "스타트업에 적합한 고객반응조사 플랫폼입니다.",
      topImg: "assets/img/help-img1.png",
      content: "<strong>FEED100</strong>이란 고객반응조사 플랫폼으로써 고객이 <b>진짜로 원하는 것</b>이 무엇인지 확인하고 고객의 <b>심층적인 니즈</b>에 맞는 <b>솔루션을 찾는 것</b>을 목표로 하고 있습니다.<br><br>여러분이 열심히 기획하고 준비한 서비스. 과연 고객이 진짜로 원하는 것일까요?<br><br>‘참신하고 좋은 아이디어’를 가지고 성공할 것이라고 굳게 믿고 있습니까?<br>어쩌면 실패하고 싶지 않아서, 성공해야만하기 때문에 그렇게 믿고 싶은 것 아닐까요?<br><br>스타트업이 실패하는 이유 TOP20 중 1위가 바로 <b>‘시장이 원하지 않아서(No Market Need)’</b>입니다. 아무리 좋은 제품이나 서비스를 만들어도 고객이 이용하지 않으면 결국 실패에 이르게 되는데요.<br><br>즉, 사업의 성공은 고객에게 있습니다.<br>고객이 누구인지, 고객이 어디서 매력을 느끼는지, 여러분의 서비스를 직접 보여주고 직접 물어보는 것이 성공의 열쇠가 될 수 있습니다.<br><br>FEED100을 통해 고객의 반응을 살피고 <strong>‘진짜로 원하는 것’</strong>이 무엇인지 확인해보세요!",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "시장조사? 고객조사? 잘 모르겠어요.",
      subTitle: "비즈니스 모델을 고객조사 측면과 시장조사 측면으로 설명 드리겠습니다.",
      topImg: "",
      content: "여러분은 시장조사와 고객조사의 차이를 알고계십니까?<br>크게 보면 고객조사도 시장조사에 포함되는 개념일 수도 있는데요. <br>비즈니스 모델을 고객조사 측면과 시장조사 측면으로 나눠 설명 드리겠습니다.<br><br><b class='dark-text'>비즈니스 모델의 필수 요소 5가지</b><br>ㆍ디테일한 고객 니즈/문제점 ㆍ적합한 해결책<br>ㆍ핵심경쟁력 ㆍ시장성 ㆍ지속성<br>위 5가지 요소 중 디테일한 고객 니즈/문제점과 적합한 해결책이 고객조사 측면에 속하고, 핵심 경쟁력, 시장성, 지속성이 시장조사 측면에 속합니다.<br><br>각각의 핵심 질문은 다음과 같습니다.<br><b class='dark-text'>고객조사</b><br>- 내 제품을 사용할 고객은 누구이며 좋아할 고객은 누구인가?<br>- A와 B가 고민되는데 고객은 어떤 것을 좋아할까?<br><br><b class='dark-text'>시장조사</b><br>- 시장 규모는 얼마나 되는가?<br>- 성장하고 있는 시장인가?<br>- 경쟁사는 누구이며, 시장 선점 혹은 차별성이 있는가?<br><br>타겟 고객을 어떻게 정의하는지에 따라, 문제 정의와 솔루션을 어떻게 구현하는지에 따라 시장은 얼마든지 달라질 수 있습니다.<br><br><b>여러분에게 주어진 상황과 목적에 따라 제대로 활용할 수 있길 바랍니다!</b>",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "FEED100 서비스는 어떻게 사용하는 것이 좋나요?",
      subTitle: "고객과 적극적으로 소통하세요!",
      topImg: "",
      content: "저희 서비스는 <b>소통을 중심</b>으로 하는 서비스입니다.<br><br>고객을 설득하거나 가르치려 하지 말고 귀를 기울여 요구사항을 듣고 진짜로 원하는 것이 무엇인지 파악하는 것이 중요합니다!<br>고객 한 명 한 명을 제대로 이해하는 <b>고객 인터뷰에 집중</b>하시길 바랍니다.<br><br>서비스를 준비하게 된 배경과 정의한 문제점들이 실제로 고객들이 느끼는 문제인지 검증하고 해결책으로 제시한 가치 제안에 대한 불편사항, 개선점 등을 도출할 수 있습니다.",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트는 어떻게 진행되나요?",
      subTitle: "[등록 – 매칭 – 소통]의 간단한 프로세스로 진행됩니다.",
      topImg: "assets/img/help-img2.png",
      content: "<b>등록</b>은 일정한 양식에 맞게 작성 후 신청을 하시면 등록 절차가 진행됩니다.<br>절차는 기본 프로젝트 정보와 스토리 작성과 관련하여 상담 후 저희와 검토 및 수정 과정을 거쳐 승인되면 등록이 완료됩니다. <br><br><b>매칭</b>은 등록이 완료된 이후 작성한 잠재고객에 맞는 유저를 매칭 해 드립니다.<br>이 매칭 된 유저들은 스토리와 테스트 미션을 통해 여러분의 서비스를 경험한 후 솔직한 감정과 생각을 작성합니다.<br><br><b>소통</b>은 매칭이 되는 유저마다 <b class='dark-text'>1:1 인터뷰 방식</b>으로 진행됩니다.<br>진짜로 원하는 것이 무엇인지 인터뷰를 통해 고객 한 명 한 명을 제대로 이해해 보세요!<br><b class='dark-text'>인터뷰 방법은 4.3. 인터뷰 스킬을 참고해 주세요!</b><br><br><b>기간</b>은 등록 완료 이후 일주일간 프로젝트가 진행되며 이 기간 동안 인터뷰가 가능합니다. 프로젝트가 종료 된 이후에는 스토리가 공개되며 원하지 않을 경우 삭제 요청을 하실 수 있습니다.",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트 간 주의해야할 점은 무엇인가요?",
      subTitle: "조사목적을 분명히 하고 객관적인 관점을 유지하는 것이 중요합니다!",
      topImg: "",
      content: "<b>기업의 생각과 유저의 생각이 다르다고 해서 유저를 설득하거나 가르치려 하면 안 됩니다.</b><br>유저가 왜 그렇게 생각했는지, 어떤 부분이 그렇게 생각하게 했는지, 감정과 생각의 도출 과정을 이해하려 하고 객관적인 관점에서 바라보시길 바랍니다.<br><br><b>잠재고객이 자유롭게 말할 기회를 주기 바랍니다.</b><br>결론을 도출하고자 유도신문을 하는 경우가 많습니다. 그 경우 생각의 제한으로 인해 새로운 아이디어를 얻기 어렵습니다.<br><br>인터뷰에는 정답이 없습니다. 원하는 대답이 나오지 않는다고 해서 실패한 인터뷰도 아니며 원하는 대답이 나왔다고 성공한 인터뷰도 아닙니다.<br>다만, <b>답은 고객으로부터 나온다</b>는 것을 명심하고 고객들을 이해하고 진짜 원하는 것이 무엇인지 이끌어내는 것이 중요합니다.<br><br>심층적인 데이터를 수집하기 때문에 일반화시키기에는 어려운 부분이 있지만 목적에 따른 질문을 적절히 하여 얻은 결과를 토대로 서비스를 더욱 발전시킬 수 있기를 기원합니다!",
      bottomImg: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  companyHelpPart2 = [
    {
      title: "프로젝트 등록은 어떻게 하나요?",
      subTitle: "등록 양식을 통해 신청하고 검토 및 수정 과정을 거쳐 승인되면 등록이 완료됩니다!",
      topImg: "assets/img/help-img3.png",
      content: "<strong>‘프로젝트 등록하기’</strong> 버튼을 누르면 양식을 통해 등록 신청을 하실 수 있습니다.<br>해당 양식에서는 일부 정보(회사명, 프로젝트 제목, 연락처, 이메일 등)만 요구합니다.<br>신청을 완료하시면 등록 담당자와 함께 나머지 절차를 진행하실 수 있습니다.<br>나머지 절차는 프로젝트 정보와 스토리 작성과 관련해서 담당자와 상담이 진행됩니다.<br><br>필요한 정보는 다음과 같습니다.<br>(상세 안내는 신청 완료 이후 별도 등록 안내서를 제공합니다.)",
      bottomImg: "assets/img/help-img4.png",
      content2: "<b class='dark-text'>여러분의 스토리의 기본적인 구상 및 배치는 도와드리지만 영상이나 링크를 따로 제작해 드리지 않는 점 유의하시기 바랍니다!</b>",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트를 진행하려면 어느 정도 준비되어 있어야 하나요?",
      subTitle: "적당한 공감능력과 수용의 자세만 갖추고 있어도 됩니다!",
      topImg: "",
      content: "아이디어만 가지고 있는 예비창업자도, 이미 개발이 완료된 스타트업도 기업의 서비스를 소개할 수 있는 스토리만 작성하시면 모두 사용할 수 있습니다.<br><br>인터뷰가 진행되는 동안 잠재고객이 말하는 이야기에 공감하고 받아들일 수 있는 자세로<br><b>강점</b>은 귀담아들어 발전시키고 <b>단점</b>은 받아들여 개선해 나갈 수 있다면 누구나 사용하실 수 있습니다.<br><br>하지만 저희 서비스는 린스타트업 방법에 기초하여 ‘유저가 직접 서비스를 이용해보고 이해를 바탕으로 솔직하게 작성하는 FEED100’을 권장합니다.<br><br>MVP 제품(최소 요건 제품)의 수준. 즉, 시제품이나 베타서비스 정도의 준비가 되어 있다면 해당 링크를 통해서 유저가 직접 경험해 본 것을 토대로 프로젝트를 진행하는 것이 이상적인 결과를 이끌어낼 수 있습니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "프로젝트 수정은 가능한가요?",
      subTitle: "진행 중인 프로젝트는 수정이 불가능합니다.ㅠㅠ",
      topImg: "",
      content: "등록 과정에서 상호 합의된 승인 하에 프로젝트가 등록이 됩니다.<br>등록이 완료된 프로젝트는 공개되기 전 스토리를 한 번 더 검토할 기회가 있습니다.<br>최종 검토가 끝난 후 공개가 되는 시점에서 프로젝트가 진행되며 그 이후 수정은 불가능합니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "취소 및 환불은 어떻게 하나요?",
      subTitle: "진행 중인 프로젝트는 취소 및 환불이 어렵습니다.",
      topImg: "",
      content: "프로젝트 수정과 마찬가지로 등록 과정에서 상호 합의된 승인 하에 프로젝트가 등록됩니다. 등록이 완료된 프로젝트는 공개되기 전 스토리를 한 번 더 검토할 기회가 있으며 최종 검토 이후 공개가 되는 시점에서 프로젝트가 진행됩니다.<br>진행 중인 프로젝트는 취소나 환불이 불가능합니다.<br><br>단, 프로젝트 기간 동안 개별 조건상 <b class='dark-text'>목표 유저의 30%</b>를 충족시키지 못해 프로젝트를 완료할 수 없을 경우에는 서비스 이용료 및 일부 수수료를 제외한 금액을 환불해 드립니다.<br>(이용약관 제24 조 취소 및 환불에 의거합니다.)",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  companyHelpPart3 = [
    {
      title: "등록이 완료된 프로젝트는 어떻게 확인하나요?",
      subTitle: "등록이 완료되면 자동으로 프로젝트 화면으로 전환됩니다.",
      topImg: "assets/img/help-img5.png",
      content: "<b class='dark-text'>등록이 완료되면 좌측 화면을 확인할 수 있습니다.</b> (프로젝트 진행 전 최종 검토 시에도 동일한 화면이 보입니다.)<br><br><b class='dark-text'>프로젝트가 진행되고 매칭이 되기 시작하면 우측 화면이 자동으로 전환됩니다.</b><br><b class='dark-text'>매칭 되는 유저들의 정보와 함께 인터뷰를 진행할 수 있습니다.</b>",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "작성한 스토리는 어떻게 확인하나요?",
      subTitle: "‘스토리 보기’ 버튼을 눌러보세요!",
      topImg: "assets/img/help-img6.png",
      content: "",
      bottomImg: "assets/img/help-img7.png",
      content2: "화면상에 보이는 ‘스토리 보기’ 버튼을 누르면 스토리가 어떻게 보이는지 확인하실 수 있습니다. 여러분이 작성한 스토리가 유저에게 어떻게 보이는지 좌우 슬라이드로 직접 확인해 보세요!",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "참여중인 유저들의 정보는 어떻게 확인하나요?",
      subTitle: "참여중인 유저를 클릭해보세요!",
      topImg: "assets/img/help-img8.png",
      content: "유저 목록에 있는 유저를 클릭해보세요!<br>프로젝트 화면에서 보는 통계 자료 외에도 각 유저의 기본 프로필 정보와 참여 시 입력한 정보들과 인터뷰 질문들에 대한 답변을 쉽게 확인하실 수 있습니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  companyHelpPart4 = [
    {
      title: "인터뷰는 어떻게 진행되나요?",
      subTitle: "프로젝트 화면에서 스크롤을 내리면 확인할 수 있습니다.",
      topImg: "assets/img/help-img9.png",
      content: "인터뷰는 기업이 질의하고 유저가 응답하는 대화 형식으로 진행됩니다.<br><br>인터뷰는 1:1로 진행이 되며 심리를 파악하는 조사법으로 질문에 대한 응답자의 생각과 느낌을 자유롭게 나눔으로써 감정이나 욕구, 태도 등을 이끌어내는 방법입니다.<br><br>장점으로는 개개인의 의견을 다양하고 풍부하게 수집할 수 있으며, 심층적인 의견에 대한 조사가 가능합니다.<br>단점은 조사 결과를 일반화하기 어려우며 질문이 표준화되어 있지 않고 답변에 따른 해석이 어렵습니다.<br><br><strong>4.3. 인터뷰 스킬을 필독! 하시고 인터뷰를 진행하시기를 바랍니다.</strong>",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰는 어떻게 신청하나요?",
      subTitle: "유저를 클릭해서 1:1 인터뷰를 할 수 있고 ‘그룹 인터뷰’ 버튼을 통해 공통된 질문을 한 번에 보낼 수 있습니다!",
      topImg: "assets/img/help-img10.png",
      content: "- 1:1 인터뷰에서는 채팅을 하듯이 인터뷰를 진행하시면 됩니다!<br><br>인터뷰의 핵심은 바로 <strong>‘이야기’</strong>입니다!<br>스타트업의 고객조사 인터뷰의 목적은 바로 <b>‘고객의 니즈와 근본적인 동기’</b>를 알아내는 것!<br>고객의 행동이나 생각이 왜 그렇게 했는지, 정말 원하는 것이 무엇인지를 알아가는 과정에서 가장 중요한 것이 바로 이야기입니다.<br><br>마음에 드는 답변들은 <b>‘하트’</b> 눌러주는 센스!<br><b>고객의 깊은 내면을 이해할 수 있는 살아있는 대화를 나누길 바랍니다!</b><br><br>- 그룹 인터뷰 버튼을 통해 공통된 질문을 한 번에 쉽게 보낼 수 있습니다!<br><br>인터뷰 중 참여 인원들에게 공통된 질문을 하고 싶을 경우가 있을 수 있습니다.<br>그럴 때는 우측 하단에 그룹 인터뷰 버튼을 눌러보세요!<br>인터뷰 질문의 대상을 선택 후 공통된 질문을 보내면 각각의 1:1 인터뷰에 질문이 보내질 것입니다!",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
    {
      title: "인터뷰 스킬(중요!)",
      subTitle: "진정으로 원하는 것이 무엇인지 공감하는 ‘진실의 순간(Moment of truth)’를 위한 3가지 스킬에 대하여 말씀드리겠습니다!",
      topImg: "",
      content: "매번 확인하러 오실 필요 없습니다! <b>인터뷰 작성 시 우측의 ‘?’ 버튼을 눌러보세요!</b><br><br><strong>1. 경계심 허물기</strong><br>심리학 용어로 ‘라포르(rapport)’를 형성한다고 하는데요. 사람과 사람 사이에 생기는 상호 신뢰관계를 말합니다. 인터뷰와 같은 상호 의사소통에서는 이러한 상호 신뢰관계가 매우! 중요한 요소로 작용합니다.<br><br>상대를 편안하게 하기 위하여 가벼운 인사말로 긴장을 풀거나 일상적인 대화를 통해 경계심을 허묾으로써 상대방이 마음 편히 이야기할 수 있게 다가간다고 생각하시면 됩니다.<br><br><strong>2. 맞장구치기</strong><br>1번과 비슷한 맥락일 수 있는데요. 적당한 추임새와 맞장구가 있어야 상대방이 자신의 이야기를 계속해서 이어나갈 수 있습니다.<br><br>불편한 침묵의 순간에는 자신도 모르게 주제와 다른 이야기로 나가는 경우도 있으며 공감을 하지 못한다고 생각해서 이야기의 문을 닫을 수도 있습니다.<br>고객이 하고 싶은 말을 다 할 수 있도록  맞장구를 통하여 배려해주세요!<br><br>예를 들면 아래와 같은 말들이 있겠죠?<br>'아, 그렇군요!', '네~ 그러셨어요.', '정말 힘드셨겠어요...', '그런 게 있었군요.'<br><br><strong>3. 구체적으로 파고들기</strong><br>리서치 업계에서 쓰이는 말로는 ‘프로빙(Probing)’이라고 하는데요.<br>단순히 맞장구치며 새로운 질문을 던지는 것이 아니라, 대답에 대하여 더 깊이 파고드는 것을 말합니다.<br><br>바로 ‘왜’에 대한 구체적인 내용을 알아내려고 할 때 필요하죠.<br>하지만 여기서 가장 조심해야 할 부분이 바로 ‘유도신문’입니다!<br>절대로 어떤 대답을 바라고 질문을 한다거나 답변의 방향을 지시하거나 암시해서는 안 됩니다!<br><br>또한, 가급적으로 ‘왜?’라고 직접적으로 묻기보다는 돌려서 질문하는 편이 좋습니다.<br>듣는 입장에서 ‘왜’라는 질문은 공격적으로 들릴 수 있으며 추궁당하는 느낌이 들 수 있기 때문입니다.",
      bottomImg: "",
      content2: "",
      bottomImg2: "",
      icon: "ios-add-circle-outline",
      showDetails: false,
    },
  ];

  companyHelpPart5 = [
    {
      title: "프로젝트 결과물은 어떻게 확인하나요?",
      subTitle: "‘종합 보고서’ 버튼을 눌러보세요!",
      topImg: "assets/img/help-img11.png",
      content: "프로젝트 메인 화면에서 <b>‘종합 보고서’</b> 버튼을 눌러보세요!<br>다양한 통계자료와 종합적인 결과를 확인하실 수 있습니다.<br><br>- 유저 정보<br>매칭 된 유저들의 정보를 성별, 나이, 직업, 지역을 통계로 확인할 수 있습니다.<br><br>- 설문 결과<br>유저들이 작성한 참여 조건, 설문 문항 별 응답을 통계로 확인할 수 있습니다.<br><br>- 프로젝트 통계<br>유저들이 작성한 첫인상평가 점수와 추천지수 점수를 통계로 확인할 수 있습니다.<br><br>- 인터뷰<br>유저들이 작성한 만족스러웠던 점, 아쉬웠던 점을 모아 볼 수 있으며 찜하기를 누른 인터뷰 리스트를 확인할 수 있습니다.",
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
    console.log('ionViewDidLoad CompanyHelpPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyHelpPage');
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
