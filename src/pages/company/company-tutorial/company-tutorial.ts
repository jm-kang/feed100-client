import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, Content, Platform, AlertController, ActionSheetController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Keyboard } from '@ionic-native/keyboard';
import { Ionic2RatingModule } from 'ionic2-rating';

declare var cordova:any;

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DomSanitizer } from '@angular/platform-browser';

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
  @ViewChild('slider') slider: Slides;
  @ViewChild('storySlide') storySlides: Slides;
  @ViewChild('reportSlide') reportSlides: Slides;
  @ViewChild('content') content: Content;

  openTurorialIntro;
  openTutorialProjectHome;
  openTutorialGroupInterview;
  openTutorialGroupInterviewQuestionEditor;
  openTutorialProjectStoryHorizontal;
  openTutorialProjectReport;
  openTutorialProjectInterviewDetail;
  isInfoHide;
  pageInfo1;
  pageInfo2;

  // intro value
  introSlideIndex = 0;
  introSlides;
  //////////////////

  tutorialUsers;

  // project home value
  projectHomeAges;
  //////////////////

  // group interview value
  group = [];
  //////////////////

  // group interview question editor value
  textcount;
  questionContent;
  contentPlaceholder = '이 부분을 터치하여 인터뷰 질문을 작성해 주세요.';
  minTextLength = 20;
  maxTextLength = 100;
  isHelpHide;
  helpReferances = ["~에 대하여 어떻게 생각하시나요?", "~에 대하여 자세히 말씀해주세요.", "~했던 경험에 대하여 말씀해주세요.", "왜 그렇게 생각하셨나요?"]
  //////////////////

  // story value
  isFirstSlide: boolean = true;
  projectMainImage;
  nickname;
  projectName;
  projectViewNum;
  maxReward;
  progressState;
  projectStorySlides;

  currentStoryPageNum = 0;
  totalStoryPageNum = 0;
  storyProgressPercent = 0;
  //////////////////

  // interview detail value
  userDetail;
  //////////////////

  // report value
  projectUserProfileSlides;
  projectUserParticipationConditionSlides;
  projectStatSlides;
  satisfiedInterviews;
  unsatisfiedInterviews;
  likeInterviews;
  colors; type; options;
  isNavHide;

  currentReportNum = 0;
  totalReportNum = 0;
  reportProgressPercent = 0;
  //////////////////


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    private platform: Platform,
    private domSanitizer: DomSanitizer,
    private photoViewer: PhotoViewer,
    public actionSheetCtrl: ActionSheetController,
    public keyboard: Keyboard,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyTutorialPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AppIntroPage');
    this.openTurorialIntro = true;
    this.openTutorialProjectHome = false;
    this.openTutorialGroupInterview = false;
    this.openTutorialGroupInterviewQuestionEditor = false;
    this.openTutorialProjectStoryHorizontal = false;
    this.openTutorialProjectReport = false;
    this.openTutorialProjectInterviewDetail = false;
    this.isHelpHide = true;
    this.isNavHide = true;
    this.isInfoHide = true;

    this.projectMainImage = "assets/img/project-main-image3.png";
    this.nickname = "포텐브라더스";
    this.projectName = "FEED100 샘플 프로젝트";
    this.projectViewNum = 410;
    this.maxReward = "5500";

    this.introSlides = [
      {
        title: '잘 쓴 FEED100 하나<br>열 설문조사 안 부럽다!',
        imageUrl: 'assets/img/tutorial-intro1.png',
        description: '소중한 의견이 모여 더 나은 서비스를 만듭니다.',
      },
      {
        title: '원하는 고객과<br>직접 인터뷰를!',
        imageUrl: 'assets/img/tutorial-intro2.png',
        description: '고객과 직접 소통하며<br>고객이 진짜 원하는 것을 찾으세요!',
      },
      {
        title: '포인트가 쭉쭉~<br>현금으로 환전까지!',
        imageUrl: 'assets/img/tutorial-intro3.png',
        description: '다양한 서비스를 경험하고<br>소중한 피드백을 들려주세요!',
      },
      {
        title: 'FEED100<br>지금 사용해 보세요!',
        imageUrl: 'assets/img/tutorial-intro4.png',
        description: '스타트업에 적합한<br>고객반응조사 플랫폼',
      },
      {
        title: 'FEED100<br>지금 사용해 보세요!',
        imageUrl: 'assets/img/tutorial-intro5.png',
        description: '스타트업에 적합한<br>고객반응조사 플랫폼',
      }
    ];

    this.projectHomeAges = [{title: "10대",percent: 0,},{title: "20대",percent: 50,},{title: "30대",percent: 43,},{title: "40대",percent: 7,},{title: "50대+",percent: 0,}];
    this.tutorialUsers = [
      {
        project_participant_id : 26,
        avatar_image : "user-avatar-image-woman3",
        nickname : "꿈은가수",
        project_first_impression_rate: 8,
        age : "30대",
        gender : "여자",
        interview: {content: "개인방송으로 노래하고 있는데 페이스트레킹 기술로 잘 활용할 수 있을 것 같아요!", date: "10분 전"},
        not_read_interview_num: 2,
        isCheck: false,
      },
      {
        project_participant_id : 22,
        avatar_image : "user-avatar-image-man3",
        nickname : "자낳괴",
        project_first_impression_rate: 7,
        age : "20대",
        gender : "남자",
        interview: {content: "여자친구랑 여행가면 사진 찍느라 스트레스 받아요...저는 남들에게 피해주는게 너무 싫은데 ", date: "31분 전"},
        not_read_interview_num: 1,
        isCheck: false,
      },
      {
        project_participant_id : 30,
        avatar_image : "user-avatar-image-man2",
        nickname : "포인트주세요",
        project_first_impression_rate: 7,
        age : "20대",
        gender : "남자",
        interview: {content: "얼굴 따라 오는건 좀 신기해요! 근데 거리가 멀어져도 인식이 잘 돼요?", date: "41분 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 21,
        avatar_image : "user-avatar-image-man2",
        nickname : "닉네임",
        project_first_impression_rate: 5,
        age : "20대",
        gender : "남자",
        interview: {content: "솔직히 요즘 셀카봉이나 삼각대도 잘 나와가지고 이게 꼭 필요하나 싶기도 해요", date: "49분 전"},
        not_read_interview_num: 1,
        isCheck: false,
      },
      {
        project_participant_id : 18,
        avatar_image : "user-avatar-image-woman1",
        nickname : "모비딕",
        project_first_impression_rate: 7,
        age : "20대",
        gender : "여자",
        interview: {content: "스마트폰 액정에 저렇게 잘 붙어있을지가 의문이에요.. 스마트폰 무게도 있고 한데 영상처럼 잘 견딜 수 있을 까요?", date: "1시간 전"},
        not_read_interview_num: 1,
        isCheck: false,
      },
      {
        project_participant_id : 16,
        avatar_image : "user-avatar-image-man1",
        nickname : "전설",
        project_first_impression_rate: 8,
        age : "30대",
        gender : "남자",
        interview: {content: "삼각대로 단체 사진 찍을 때 얼~마나 불편하던지요. 저희 팀 막내가 단체사진 찍을 때 고생하던게 기억납니다.", date: "2시간 전"},
        not_read_interview_num: 1,
        isCheck: false,
      },
      {
        project_participant_id : 6,
        avatar_image : "user-avatar-image-man2",
        nickname : "집돌이",
        project_first_impression_rate: 8,
        age : "30대",
        gender : "남자",
        interview: {content: "요즘은 엄청 작은 디자인인데도 다양한 기능을 하는 제품들이 많더라고요! 좋은 것 같습니다!", date: "3시간 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 5,
        avatar_image : "user-avatar-image-man1",
        nickname : "치킨사랑",
        project_first_impression_rate: 7,
        age : "20대",
        gender : "남자",
        interview: {content: "저는 주로 셀카봉으로 사진 찍는데 블루투스나 카메라 버튼이 저렴한건 금방 고장나더라고요ㅠㅠ", date: "9시간 전"},
        not_read_interview_num: 1,
        isCheck: false,
      },
      {
        project_participant_id : 14,
        avatar_image : "user-avatar-image-man1",
        nickname : "행복하세요",
        project_first_impression_rate: 8,
        age : "40대",
        gender : "남자",
        interview: {content: "가족이랑 해외여행 갈 때 사용하기 좋을 것 같아요. 영어 잘 못하고 하면 부탁하기도 어려운데 이런거 사용하면 옆 사람도 신기해 할 것 같군요", date: "11시간 전"},
        not_read_interview_num: 1,
        isCheck: false,
      },
      {
        project_participant_id : 2,
        avatar_image : "user-avatar-image-woman1",
        nickname : "채식주의",
        project_first_impression_rate: 4,
        age : "30대",
        gender : "여자",
        interview: {content: "셀카봉 삼각대 둘 다 사용해 본 적은 있습니다. 둘 다 여행때 사용했었는데 개인적으로 좀 불편한 점도 많아서 잘 사용하지는 않습니다.", date: "1일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 7,
        avatar_image : "user-avatar-image-man3",
        nickname : "배고파",
        project_first_impression_rate: 9,
        age : "20대",
        gender : "남자",
        interview: {content: "휴대폰 2대로 하는 것도 좋은데 별도로 블루투스 리모컨도 가능하면 좋을 것 같아요! 아무래도 익숙해져 있는 게 있다보니까", date: "1일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 13,
        avatar_image : "user-avatar-image-woman2",
        nickname : "엘사",
        project_first_impression_rate: 8,
        age : "20대",
        gender : "여자",
        interview: {content: "무게가 얼만큼 돼요? 휴대폰 + 모듈을 결합하려면 좀 가벼워야 될 것 같은데", date: "1일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 25,
        avatar_image : "user-avatar-image-woman2",
        nickname : "제리",
        project_first_impression_rate: 8,
        age : "30대",
        gender : "여자",
        interview: {content: "엄마들 모임으로 여행도 가고 하는데 이거 들고 가면 다들 부러워 하겠어요~~", date: "1일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 3,
        avatar_image : "user-avatar-image-man2",
        nickname : "소름",
        project_first_impression_rate: 5,
        age : "20대",
        gender : "남자",
        interview: {content: "셀카봉 겸 미니 삼각대 역할을 해주는 멀티가 가능한 아이템이 요즘 나오고 있는데요. 제가 사용해 보았을때", date: "2일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 8,
        avatar_image : "user-avatar-image-woman2",
        nickname : "보고싶다",
        project_first_impression_rate: 10,
        age : "20대",
        gender : "여자",
        interview: {content: "커플사진이나 가족사진처럼 단체 사진 찍을 때는 필수 아이템이 될 수 있을 것 같아요! 더 좋은 퀄리티를 위하여!", date: "2일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 10,
        avatar_image : "user-avatar-image-man1",
        nickname : "청사초롱",
        project_first_impression_rate: 9,
        age : "40대",
        gender : "남자",
        interview: {content: "휴대폰 거치하는 부분이 위 아래로 잡는 방식이 아니라 좀 불안할 것 같긴한데 괜찮은가요?", date: "2일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 11,
        avatar_image : "user-avatar-image-woman3",
        nickname : "Julie",
        project_first_impression_rate: 8,
        age : "20대",
        gender : "여자",
        interview: {content: "뭔가 게임처럼 막 조절하는게 재밌는 것 같아요! 신기신기해요~~", date: "2일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 15,
        avatar_image : "user-avatar-image-man3",
        nickname : "침대는과학",
        project_first_impression_rate: 8,
        age : "30대",
        gender : "남자",
        interview: {content: "저번에 여행가서 사진 찍었는데 얼굴 위로 배경만 나오고 불편한 점이 많았는데 직접 보면서 조절하는 게 좋은 것 같아요~", date: "2일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 17,
        avatar_image : "user-avatar-image-woman2",
        nickname : "푸른바다",
        project_first_impression_rate: 7,
        age : "30대",
        gender : "여자",
        interview: {content: "삼각대로 쓰려고 구매한 제품을 셀카봉처럼 쓰고 있네요. 삼각대까지 펴가면서 사진 찍기가 좀 번거로웠어요ㅠㅠ", date: "2일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 24,
        avatar_image : "user-avatar-image-woman3",
        nickname : "마미",
        project_first_impression_rate: 7,
        age : "30대",
        gender : "여자",
        interview: {content: "저희 아들을 찍어서 늘 간직하는데 일상에서도 편히 사용할 수 있을까요? ", date: "2일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 1,
        avatar_image : "user-avatar-image-man1",
        nickname : "흰수염고래",
        project_first_impression_rate: 3,
        age : "30대",
        gender : "남자",
        interview: {content: "평소에 카메라도 잘 들고 다니지만 셀카 찍을 일도 많잖아요. 저는 평소에 삼각대보다는 셀카봉을", date: "3일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 4,
        avatar_image : "user-avatar-image-man3",
        nickname : "뚜루루루",
        project_first_impression_rate: 6,
        age : "20대",
        gender : "남자",
        interview: {content: "셀카봉 고프로나 액션카메라를 다 가지고 있는데요. 저렴한 것들은 블루투스가 문제였어요.", date: "3일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 29,
        avatar_image : "user-avatar-image-man3",
        nickname : "내차마세라티",
        project_first_impression_rate: 6,
        age : "30대",
        gender : "남자",
        interview: {content: "혼자서도 해외 자주 가는데 폰 2개가 없는데 그걸 위해서는 어떻게 반영할 수 있는가요?", date: "3일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 9,
        avatar_image : "user-avatar-image-man1",
        nickname : "캡틴아메리카",
        project_first_impression_rate: 10,
        age : "30대",
        gender : "남자",
        interview: {content: "고프로나 액션캠은 너무 비싼데 그런 역할을 잘 수행해 주는 아이템이라면 사용하기 너무 좋을 것 같습니다.", date: "4일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 19,
        avatar_image : "user-avatar-image-man1",
        nickname : "우주",
        project_first_impression_rate: 7,
        age : "20대",
        gender : "남자",
        interview: {content: "요즘은 멀티 상품으로 셀카봉+삼각대로 가격이 2만원 가량하는데 그것도 사고 이것도 사기엔 좀...", date: "4일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 23,
        avatar_image : "user-avatar-image-woman1",
        nickname : "우크우크",
        project_first_impression_rate: 7,
        age : "30대",
        gender : "여자",
        interview: {content: "전에 여행갔을 때 요즘은 심플한 디자인 말고도 아기자기한 디자인으로도 많이 팔던데! ", date: "4일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 12,
        avatar_image : "user-avatar-image-man2",
        nickname : "Jake",
        project_first_impression_rate: 8,
        age : "20대",
        gender : "남자",
        interview: {content: "블루투스도 같이 연동하게 해주면 좋을 것 같아요~ 요즘은 혼자 여행도 많이 다녀서 혼자서는 못 쓰니까 아쉽네요ㅠㅠ", date: "5일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 28,
        avatar_image : "user-avatar-image-man1",
        nickname : "헬스보이",
        project_first_impression_rate: 8,
        age : "20대",
        gender : "남자",
        interview: {content: "여자친구가 삼각대로 사진 찍을 때마다 좀 불편했는데 왔다갔다 안해도 되니까 좋은 것 같네요!", date: "5일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 20,
        avatar_image : "user-avatar-image-man3",
        nickname : "남자입니다",
        project_first_impression_rate: 6,
        age : "20대",
        gender : "남자",
        interview: {content: "모듈이 아니라 기기 자체에는 지지대를 넣을 수 없나요? 그러면 다른 거 필요없이 그냥 이것만 들고 다녀도 되잖아요!", date: "6일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
      {
        project_participant_id : 27,
        avatar_image : "user-avatar-image-man1",
        nickname : "여기는광주",
        project_first_impression_rate: 8,
        age : "30대",
        gender : "남자",
        interview: {content: "워머...데이터도 없이 화면을 어떻게 전송한다요~? 신기하구마잉~", date: "6일 전"},
        not_read_interview_num: 0,
        isCheck: false,
      },
    ];
    
    this.projectStorySlides = [
      {
        storyImage: "assets/img/tutorial-story-image1.jpg",
        storyVideo: "",
        storyContent: "여러분들은 여행을 가면 사진을 많이 찍으시나요? '남는 것은 사진 뿐이다'라는 말이 있을 만큼 꼭 남겨야 하는 것이 바로 사진인데요!"
      },
      {
        storyImage: "assets/img/tutorial-story-image2.jpg",
        storyVideo: "",
        storyContent: "그렇다면 여러분들은 어떤 방식으로 사진을 찍으시나요? 혹시 사진을 찍으실 때 보조도구가 불편하신 적은 없으신가요?"
      },
      {
        storyImage: "assets/img/tutorial-story-image3.jpg",
        storyVideo: "",
        storyContent: "사진찍는 방법마다 제한적인 부분이 많아서 불편함이 있는데요."
      },
      {
        storyImage: "assets/img/tutorial-story-image4.jpg",
        storyVideo: "",
        storyContent: "여기 그 문제들을 한 번에 해결해 줄! 기존 가지고 계시는 보조 기구에 장착하실 수 있는 신박한 아이템이 있습니다."
      },
      {
        storyImage: "assets/img/tutorial-story-image5.jpg",
        storyVideo: "",
        storyContent: "멀리서도 손쉽게 카메라 각도를 조절할 수 있으며 사진을 찍을 수 있습니다!"
      },
      {
        storyImage: "assets/img/tutorial-story-image6.jpg",
        storyVideo: "",
        storyContent: "실시간으로 사진을 보고 조절하면서 찍을 뿐만 아니라 데이터 사용 없이도 서로 연결이 되고 자동으로 수평 조절 등 다양한 기능이 탑재되어 있습니다!"
      },
      {
        storyImage: "assets/img/tutorial-story-image7.jpg",
        storyVideo: "",
        storyContent: "또한 휴대하기도 편리하고 다양한 기기에 호환성도 갖춰져 가성비가 갑!"
      },
      {
        storyImage: "",
        storyVideo: "https://www.youtube.com/embed/tpoOIKW87i0",
        storyContent: "백문이 불여일견! 직접 영상을 확인해 보세요!"
      }
    ];

    this.totalStoryPageNum = this.projectStorySlides.length + 1;

    this.userDetail = {
      nickname : "포텐브라더스",
      avatar_image : "assets/img/user-avatar-image-man1.png",
      minTextLength : 20,
      maxTextLength : 100,
      questionInterview : "",
      project_participation_date : "3일 전",
      region: "대전광역시", age: "20대", gender: "남자", job: "전문가", marriage: "미혼",
      phone_os: "Android", phone_model: "SM-960N",
      project_participation_objective_conditions: [{question: "사진을 촬영하실 때 주로 사용하시는 방법은 무엇인가요?", value: "손으로 촬영합니다."}],
      preferred_interview_time: "15시 ~ 18시",
      project_first_impression_rate: 8,
      interviews: [
        {
          interview_question_registration_date: "3일 전",
          interview_question: "Matt님 안녕하세요. 의견 잘 들었습니다! Matt님은 어떤 사진들을 가장 많이 찍으시나요?",
          interview_answer_registration_date: "3일 전",
          interview_answer: "저는 주로 먹거리 사진이나 노을이나 눈 온 뒤의 배경 등 풍경 위주의 사진을 많이 찍는 편입니다.",
          isLike: false,
        },
        {
          interview_question_registration_date: "2일 전",
          interview_question: "먹을 것과 풍경! 좋네요~! 사진을 찍으실 때는 주로 손으로 찍으신다고 하셨는데 셀카봉이나 삼각대는 사용해 보신적이 없으신가요? 있으시다면 언제 사용해 보셨나요?",
          interview_answer_registration_date: "2일 전",
          interview_answer: "셀카봉 삼각대 둘 다 사용해 본 적은 있습니다. 둘 다 여행때 사용했었는데 개인적으로 좀 불편한 점도 많아서 잘 사용하지는 않습니다.",
          isLike: false,
        },
        {
          interview_question_registration_date: "하루 전",
          interview_question: "그랬었군요...어떤 불편함 때문에 잘 사용하지 않게 되던가요?",
          interview_answer_registration_date: "하루 전",
          interview_answer: "일단은 휴대하고 다니기 불편한게 가장 컸었습니다. 걸어다닐때 들고다니는게 짐이니까요..그리고 삼각대 같은 경우는 사용하기도 좀 많이 불편했고요.",
          isLike: false,
        },
        {
          interview_question_registration_date: "10시간 전",
          interview_question: "휴대성을 제외하고는 다른 불편사항은 어떤 사항이 있으셨나요?",
          interview_answer_registration_date: "8시간 전",
          interview_answer: "셀카봉은 요즘 기능도 그렇고 튼튼하게 잘 나와서 사용하기 불편한건 잘 모르겠는데 삼각대는 세팅하고 찍고 확인하러 갔다가 다시 찍고 그런 과정도 불편한데 사람까지 많으면 답답하기도 해서 짜증이 났습니다.",
          isLike: false,
        },
        {
          interview_question_registration_date: "한 시간 전",
          interview_question: "어떤 짜증인지 바로 알겠네요...Matt님은 찍은 사진들은 어떻게 관리하시나요?",
          interview_answer_registration_date: "10분 전",
          interview_answer: "음...저는 인스타그램이나 페이스북 SNS에 게시하기도 하고 별도로 SD카드에 저장해두기도 해요.",
          isLike: false,
        },
      ],
    };
    
    this.projectUserProfileSlides = [
      {
        title: '성별',
        datasets: [{data: [20, 10],}],
        totalNum: 30,
        colors: [{backgroundColor:['rgba(131,196,240,0.7)','rgba(252,158,178,0.7)']},],
        labels: ['남자', '여자'],
        type: 'doughnut',
        options: {legend: {display: false},title: {display: false,}},
      },
      {
        title: '나이',
        datasets: [{data: [0, 15, 13, 2, 0]}],
        totalNum: 30,
        colors: [{backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)']},],
        labels: ['10대', '20대', '30대', '40대', '50대+'],
        type: 'bar',
        options: {scales: {yAxes: [{ticks: {beginAtZero:true,userCallback: function(label, index, labels) {if (Math.floor(label) === label) {return label;}},}}]},legend: {display: false},title: {display: false,}},
      },
      {
        title: '직업',
        datasets: [{data: [3, 4, 4, 1, 2, 1, 1, 0, 1, 6, 7],}],
        totalNum: 30,
        colors: [{backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)', 'rgba(94, 161, 175,0.7)', 'rgba(173, 209, 208,0.7)', 'rgba(215, 201, 175,0.7)', 'rgba(137, 105, 152,0.7)', 'rgba(203, 175, 197,0.7)', 'rgba(178, 112, 163,0.7)']},],
        labels: ['관리자','전문가','사무직','서비스종사자','판매종사자','기능원 및 관련 기술 종사자','장치, 기계조작 및 조립 종사자','단순노무 종사자','군인','학생','기타'],
        type: 'doughnut',
        options: {legend: {display: false},title: {display: false,}},
      },
      {
        title: '지역',
        datasets: [{data: [6, 1, 2, 2, 2, 4, 0, 2, 4, 1, 2, 1, 2, 1],}],
        totalNum: 30,
        colors: [{backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)', 'rgba(94, 161, 175,0.7)', 'rgba(173, 209, 208,0.7)', 'rgba(215, 201, 175,0.7)', 'rgba(137, 105, 152,0.7)', 'rgba(203, 175, 197,0.7)', 'rgba(178, 112, 163,0.7)', 'rgba(39, 62, 17, 0.7)', 'rgba(117, 141, 69, 0.7)', 'rgba(180, 189, 75, 0.7)']},],
        labels: ['서울특별시','부산광역시','대구광역시','인천광역시','광주광역시','대전광역시','울산광역시','세종특별자치시','경기도','강원도','충청도','전라도','경상도','제주도'],
        type: 'pie',
        options: {legend: {display: false},title: {display: false,}},
      }
    ];
    this.projectUserParticipationConditionSlides = [
      {
        question: "사진을 촬영하실 때 주로 사용하시는 방법은 무엇인가요?",
        datasets: [{data: [7, 11, 12],}],
        totalNum: 30,
        labels: ['삼각대로 촬영합니다.','셀카봉으로 촬용합니다.','손으로 촬영합니다.'],
      }
    ];
    this.colors= [{backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)', 'rgba(94, 161, 175,0.7)', 'rgba(173, 209, 208,0.7)', 'rgba(215, 201, 175,0.7)', 'rgba(137, 105, 152,0.7)', 'rgba(203, 175, 197,0.7)', 'rgba(178, 112, 163,0.7)', 'rgba(39, 62, 17, 0.7)', 'rgba(117, 141, 69, 0.7)', 'rgba(180, 189, 75, 0.7)']},];
    this.type = 'pie';
    this.options= {legend: {display: false},title: {display: false,}};
    this.projectStatSlides = [
      {
        title: '첫인상 평가',
        datasets: [{data: [0, 0, 1, 1, 2, 3, 5, 10, 5, 3]}],
        average: 7.5,
        average2: 3.8,
        totalNum: 30,
        colors: [{backgroundColor:'rgba(255,100,0,0.8)'},],
        labels: ['1점', '2점', '3점', '4점', '5점', '6점', '7점', '8점', '9점', '10점'],
        type: 'bar',
        options: {scales: {yAxes: [{ticks: {beginAtZero:true,userCallback: function(label, index, labels) {if (Math.floor(label) === label) {return label;}},}}]},legend: {display: false},title: {display: false,}},
      },
      {
        title: '추천 지수',
        // 서버에서 데이터 필요한 부분
        datasets: [{
          data: [0, 0, 0, 0, 1, 1, 9, 10, 6, 3]
        }],
        average: 7.9,
        average2: 4,
        totalNum: 30,
        colors: [{backgroundColor:'rgba(255,188,0,0.8)'},],
        labels: ['1점', '2점', '3점', '4점', '5점', '6점', '7점', '8점', '9점', '10점'],
        type: 'bar',
        options: {scales: {yAxes: [{ticks: {beginAtZero:true,userCallback: function(label, index, labels) {if (Math.floor(label) === label) {return label;}},}}]},legend: {display: false},title: {display: false,}},
      } ,
    ];
    this.satisfiedInterviews = [
      {
        avatar_image : "assets/img/user-avatar-image-man2.png",
        nickname: "Matt",
        interview_answer_registration_date: "2일 전",
        interview_answer: "저는 화면 공유와 두 기기에 같이 저장 된다는 부분이 좋은 것 같습니다. 보통 같이 사진을 찍으면 공유하려고 별도로 따로 보내줘야 하는데 공유가 …",
      },
      {
        avatar_image : "assets/img/user-avatar-image-woman3.png",
        nickname: "잠만보오",
        interview_answer_registration_date: "3일 전",
        interview_answer: "페이스 트래킹 이라는 기능 너무 신기하네요!! 이건 꼭 사진이 아니더라도 영상채팅이나 방송용으로도 써도 될 것 같은데요?",
      },
      {
        avatar_image : "assets/img/user-avatar-image-man1.png",
        nickname: "탈룰라",
        interview_answer_registration_date: "3일 전",
        interview_answer: "멀리서 각도가 조절되는 점이 가장 좋은 것 같습니다. 그리고 연결이 데이터 소모없이 연결되면서 사진도 공유되는게 신기하네요!",
      }
    ];
    this.unsatisfiedInterviews = [
      {
        avatar_image : "assets/img/user-avatar-image-man2.png",
        nickname: "Matt",
        interview_answer_registration_date: "2일 전",
        interview_answer: "일단 촬영보조기기가 있어야 결합할 수 있다는 점이 아쉽네요ㅠㅠ 다른 것도 같이 들고 다니지 않고 자체로 가능하면 좋겠습니다.",
      },
      {
        avatar_image : "assets/img/user-avatar-image-woman3.png",
        nickname: "잠만보오",
        interview_answer_registration_date: "3일 전",
        interview_answer: "휴대폰이 반드시 2개가 있어야 사용할 수 있다는 점? 저는 혼자서도 여행을 자주 가는데 휴대폰은 하나뿐이걸랑요ㅠㅠ",
      },
      {
        avatar_image : "assets/img/user-avatar-image-man1.png",
        nickname: "탈룰라",
        interview_answer_registration_date: "3일 전",
        interview_answer: "폰이 2개가 있어야 서로 연결되서 쓸 수 있는게 좀.. 뭔가 불편함을 해결하기 위함인데 들고다닐게 많네요ㅠㅠ 폰도 2대여야하고 보조기기도 필요하고요",
      }
    ];
    this.likeInterviews = [
      {
        avatar_image : "assets/img/user-avatar-image-man2.png",
        nickname: "Matt",
        interview_answer_registration_date: "2일 전",
        interview_answer: "저는 화면 공유와 두 기기에 같이 저장 된다는 부분이 좋은 것 같습니다. 보통 같이 사진을 찍으면 공유하려고 별도로 따로 보내줘야 하는데 공유가 …",
      },
      {
        avatar_image : "assets/img/user-avatar-image-man1.png",
        nickname: "탈룰라",
        interview_answer_registration_date: "3일 전",
        interview_answer: "폰이 2개가 있어야 서로 연결되서 쓸 수 있는게 좀.. 뭔가 불편함을 해결하기 위함인데 들고다닐게 많네요ㅠㅠ 폰도 2대여야하고 보조기기도 필요하고요",
      }
    ];
    this.totalReportNum = (this.projectUserProfileSlides.length + this.projectUserParticipationConditionSlides.length + this.projectStatSlides.length) + 3 + 5 + 1;
  }

  // intro function
  introSlideChanged() {
    this.introSlideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.introSlideIndex);
  }
  //////////////////

  // group interview function
  check(i) {
    if (this.tutorialUsers[i].isCheck) {
      this.tutorialUsers[i].isCheck = false;
      let index = this.group.indexOf(this.tutorialUsers[i]);
      this.group.splice(index, 1);
    } else {
      this.tutorialUsers[i].isCheck = true;
      this.group.unshift(this.tutorialUsers[i]);
    }
  }

  inactive(user) {
    let group_index = this.group.indexOf(user);
    let interview_index = this.tutorialUsers.indexOf(user);
    this.tutorialUsers[interview_index].isCheck = false;
    this.group.splice(group_index, 1);
  }

  checkAll() {
    this.group = this.tutorialUsers.map((interview) => {
      return interview;
    });
    for(let user of this.tutorialUsers) {
      user.isCheck = true;
    }
  }

  uncheckAll() {
    this.group = [];
    for(let user of this.tutorialUsers) {
      user.isCheck = false;
    }
  }
  //////////////////

  // group interview editor question function
  completeEditor() {      
    if(this.commonService.hasEmoji(this.questionContent)) {
      return false;
    }
    this.commonService.showConfirmAlert('해당 내용으로 선택된 유저들에게 인터뷰를 요청합니다.<br/>작성 후에는 수정하거나 삭제할 수 없습니다.<br>인터뷰를 요청하시겠습니까?', 
    () => {
      this.openTutorialProjectHomePage(); 
      this.commonService.showBasicAlert('이와 같이 인터뷰를 진행해 주시면 됩니다!<br>고객들을 이해하고 진짜 원하는 것이 무엇인지 이끌어 내길 바랍니다!');            
    });        
  }

  cancel() {
    this.commonService.showConfirmAlert('취소하실 경우 현재까지 작성한 내용이 저장되지 않습니다. 그래도 취소하시겠습니까?', 
    () => {
      this.openTutorialProjectGroupInterviewPage();
    });
  }

  help() {
    if(this.isHelpHide) {
      this.isHelpHide = false;
      document.querySelector(".scroll-content")['style'].overflow = 'hidden';
    } else {
      this.isHelpHide = true;
      document.querySelector(".scroll-content")['style'].overflow = 'scroll';
    }
  }

  textCount(text: string) {
    if(text == null) return 0;
    
    let temp: any;
    temp = text.replace(/<br *\/?>/gi, '');
    temp = temp.replace(/(?:\r\n|\r|\n|\s)/g, '');
    return temp.length;
  }

  textCountPercent(text: string) {
    let count = this.textCount(text)
    if(count <= this.maxTextLength ) {
      return (this.textCount(text) / this.maxTextLength) * 100;
    } else {
      return 100;
    }
  }

  countColor(count) {
    if(count < 20) { return "#4e4e4c" }
    else if(count <= 100) { return "#23799d" }
    else { return "#ce522f" }
  }

  pointNotice(count) {
    if(count < 20) {return "20자 이상 입력해주세요!" }
    else if(count <= 100) { return "질문이 어렵다면 ?를 터치하여 보세요!" }
    else { return "과유불급! 너무 길면 부담을 느껴요!" } 
  }

  openInterviewInfo() {
    cordova.ThemeableBrowser.open('https://m.blog.naver.com/feed100_help/221233375208', '_system');
  }
  //////////////////

  // story function
  storySlideChanged() {
    if(this.storySlides.isBeginning()) {
      this.storySlides.lockSwipeToPrev(true);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '16px'; // 추가
      this.isFirstSlide = true;
    } else {
      this.storySlides.lockSwipeToPrev(false);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '0'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionProperty = 'margin-left'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionDuration = '0.4s'; // 추가
      this.isFirstSlide = false;
    }

    if(this.storySlides.getActiveIndex() > this.totalStoryPageNum) {
      this.currentStoryPageNum = this.totalStoryPageNum;  
    } else {
      this.currentStoryPageNum = this.storySlides.getActiveIndex();
    };

    this.storyProgressPercent = 100 * ( this.currentStoryPageNum / (this.totalStoryPageNum) );
  }

  goNextSlide() {
    this.storySlides.slideNext(500);
  }

  goFirstSlide() {
    let differencePageNum = this.currentStoryPageNum + 1;
    for(let i = 0; i < differencePageNum; i++) {
      this.storySlides.slidePrev(200);
    }
  }
  
  photoView(url) {
    this.photoViewer.show(url);
  }
  //////////////////

  // interview detail function
  reportInterview() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '신고하기',
          role: 'destructive',
          handler: () => {
            this.commonService.showConfirmAlert('해당 내용을 부적절한<br>게시글로 신고하시겠습니까?', 
            () => {
              this.commonService.showBasicAlert('이와 같이 신고를 해주시면 신고가 접수됩니다.');
            });        
          }
        },{
          text: '취소하기',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  interviewDetailBack() {
    if(this.userDetail.questionInterview) {
      this.commonService.showConfirmAlert('취소하실 경우 현재까지 작성한 내용이 저장되지 않습니다. 그래도 취소하시겠습니까?', 
      () => {        
        this.openTutorialProjectHomePage()
        this.keyboard.disableScroll(true); // 추가
      });
    }
    else {      
      this.openTutorialProjectHomePage()
      this.keyboard.disableScroll(true); // 추가
    }
  }

  clickLike(interview) {
    if(!interview.is_like) {
      this.commonService.showConfirmAlert('해당 내용이 만족스러우셨나요?<br/>찜한 인터뷰는 종합 보고서에서 확인하실 수 있습니다.', 
      () => {
        interview.is_like = 1;
        this.commonService.showBasicAlert('찜했습니다. 종합 보고서에서 확인하세요!');
      });   
    }
  }

  sendInterview() {
    if(this.commonService.hasEmoji(this.userDetail.questionInterview)) {
      return false;
    }
    this.commonService.showConfirmAlert('해당 내용으로 선택된 유저들에게 인터뷰를 요청합니다.<br/>작성 후에는 수정하거나 삭제할 수 없습니다.<br>인터뷰를 요청하시겠습니까?', 
    () => {
      this.openTutorialProjectHomePage(); 
      this.commonService.showBasicAlert('이와 같이 인터뷰를 진행해 주시면 됩니다!<br>고객들을 이해하고 진짜 원하는 것이 무엇인지 이끌어 내길 바랍니다!');
    });          
  }
  //////////////////

  // report function
  reportSlideChanged() {
    if(this.reportSlides.isBeginning()) {
      this.reportSlides.lockSwipeToPrev(true);  // 추가
      document.querySelector(".project-report-content .slides")['style'].marginLeft = '16px'; // 추가
      this.isFirstSlide = true;
    } else {
      this.reportSlides.lockSwipeToPrev(false);  // 추가
      document.querySelector(".project-report-content .slides")['style'].marginLeft = '0'; // 추가
      document.querySelector(".project-report-content .slides")['style'].transitionProperty = 'margin-left'; // 추가
      document.querySelector(".project-report-content .slides")['style'].transitionDuration = '0.4s'; // 추가
      this.isFirstSlide = false;
    }

    if(this.reportSlides.getActiveIndex() > this.totalReportNum) {
      this.currentReportNum = this.totalReportNum;  
    } else {
      this.currentReportNum = this.reportSlides.getActiveIndex();
    };

    this.reportProgressPercent = 100 * ( this.currentReportNum / (this.totalReportNum) );
  }


  goNextReportSlide() {
    this.reportSlides.slideNext(500);
  }

  goFirstReportSlide() {
    let differencePageNum = this.currentReportNum + 1;
    for(let i = 0; i < differencePageNum; i++) {
      this.reportSlides.slidePrev(200);
    }
  }

  goToReportSlide(index) {
    this.reportSlides.slideTo(index, 300);
    this.isNavHide = true;
  }
  reportNav() {
    if(this.isNavHide) {
      this.isNavHide = false;
      document.querySelector(".scroll-content")['style'].overflow = 'hidden';
    } else {
      this.isNavHide = true;
      document.querySelector(".scroll-content")['style'].overflow = 'scroll';
    }
  }
  //////////////////
  info() {
    if(this.isInfoHide) {
      this.isInfoHide = false;
      document.querySelector(".scroll-content")['style'].overflow = 'hidden';
    } else {
      this.isInfoHide = true;
      document.querySelector(".scroll-content")['style'].overflow = 'scroll';
    }
  }
  skip() {
    this.openTutorialProjectHomePage();
  }

  back() {
    this.navCtrl.pop();
  }

  openTutorialProjectHomePage() {
    this.openTurorialIntro = false;
    this.openTutorialProjectHome = true;
    this.openTutorialGroupInterview = false;
    this.openTutorialGroupInterviewQuestionEditor = false;
    this.openTutorialProjectStoryHorizontal = false;
    this.openTutorialProjectReport = false;
    this.openTutorialProjectInterviewDetail = false;
  }

  openTutorialProjectInterviewDetailPage() {
    this.openTurorialIntro = false;
    this.openTutorialProjectHome = false;
    this.openTutorialGroupInterview = false;
    this.openTutorialGroupInterviewQuestionEditor = false;
    this.openTutorialProjectStoryHorizontal = false;
    this.openTutorialProjectReport = false;
    this.openTutorialProjectInterviewDetail = true;
    this.userDetail.questionInterview = "";
    setTimeout(() => {
      this.content.scrollToBottom(300);
      console.log("asdasd");
    }, 500);
    this.pageInfo1 = "본 프로젝트는 샘플 프로젝트로 실제 데이터가<br>어떤 방식으로 보이는지 확인하기 위함입니다.";
    this.pageInfo2 = "1:1 인터뷰<br><br>인터뷰는 일문일답의 형식입니다.<br><br>참여 유저들의 질문에 대한 답변을 확인하고<br>마음에 드는 답변에 찜하기를 눌러보세요!<br>맞장구치기는 인터뷰의 중요한 기술입니다!";
    setTimeout(() => {
      this.isInfoHide = false;
    }, 300);
  }

  openTutorialProjectStoryHorizontalPage() {
    this.currentStoryPageNum = 0;
    this.storyProgressPercent = 0;
    this.isFirstSlide = true;
    this.openTurorialIntro = false;
    this.openTutorialProjectHome = false;
    this.openTutorialGroupInterview = false;
    this.openTutorialGroupInterviewQuestionEditor = false;
    this.openTutorialProjectStoryHorizontal = true;
    this.openTutorialProjectReport = false;
    this.openTutorialProjectInterviewDetail = false;
    this.pageInfo1 = "본 프로젝트는 샘플 프로젝트로 실제 데이터가<br>어떤 방식으로 보이는지 확인하기 위함입니다.";
    this.pageInfo2 = "프로젝트 스토리<br><br>스토리가 담겨있는 공간으로<br>서비스 기획 배경과 과정, 서비스 소개<br>기능, 장단점 등의 내용이 들어갑니다.<br><br>여러분의 정성으로 만들어진 스토리가<br>어떻게 보여지는지 확인해보세요!";
    setTimeout(() => {
      this.isInfoHide = false;
    }, 300);
  }

  openTutorialProjectReportPage() {
    this.currentReportNum = 0;
    this.reportProgressPercent = 0;
    this.isFirstSlide = true;
    this.openTurorialIntro = false;
    this.openTutorialProjectHome = false;
    this.openTutorialGroupInterview = false;
    this.openTutorialGroupInterviewQuestionEditor = false;
    this.openTutorialProjectStoryHorizontal = false;
    this.openTutorialProjectReport = true;
    this.openTutorialProjectInterviewDetail = false;
    this.pageInfo1 = "본 프로젝트는 샘플 프로젝트로 실제 데이터가<br>어떤 방식으로 보이는지 확인하기 위함입니다.";
    this.pageInfo2 = "종합보고서<br><br>유저 정보, 설문 결과, 프로젝트 통계, 피드백 등<br>다양한 프로젝트 결과들을 종합적으로<br>보기 편하게 나타냅니다.";
    setTimeout(() => {
      this.isInfoHide = false;
    }, 300);
  }

  openTutorialProjectGroupInterviewPage() {
    this.openTurorialIntro = false;
    this.openTutorialProjectHome = false;
    this.openTutorialGroupInterview = true;
    this.openTutorialGroupInterviewQuestionEditor = false;
    this.openTutorialProjectStoryHorizontal = false;
    this.openTutorialProjectReport = false;
    this.openTutorialProjectInterviewDetail = false;
    this.pageInfo1 = "본 프로젝트는 샘플 프로젝트로 실제 데이터가<br>어떤 방식으로 보이는지 확인하기 위함입니다.";
    this.pageInfo2 = "인터뷰 요청<br><br>전체 또는 특정 인원에게<br>동일한 인터뷰 질문을 하고 싶을 때는<br>인터뷰 요청 버튼을 통해 쉽게 보낼 수 있습니다.";
    setTimeout(() => {
      this.isInfoHide = false;
    }, 300);
  }

  openTutorialProjectGroupInterviewQuestionEditorPage() {
    this.openTurorialIntro = false;
    this.openTutorialProjectHome = false;
    this.openTutorialGroupInterview = false;
    this.openTutorialGroupInterviewQuestionEditor = true;
    this.openTutorialProjectStoryHorizontal = false;
    this.openTutorialProjectReport = false;
    this.openTutorialProjectInterviewDetail = false;
    this.questionContent = "";
  }

}
