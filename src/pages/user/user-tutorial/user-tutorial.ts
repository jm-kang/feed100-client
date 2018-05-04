// import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, Content, Platform, AlertController, ActionSheetController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Keyboard } from '@ionic-native/keyboard';
import { Ionic2RatingModule } from 'ionic2-rating';

declare var cordova:any;

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { DomSanitizer } from '@angular/platform-browser';

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
  @ViewChild('participantSlider') participantSlider: Slides;
  @ViewChild('storySlider') storySlider: Slides;
  @ViewChild('storyQuizSlider') storyQuizSlider: Slides;
  @ViewChild('interviewSlider') interviewSlider: Slides;
  @ViewChild('rewardSlider') rewardSlider: Slides;

  openLink;
  openTestIntro;
  isInfoHide;
  isSecondInfoHide;
  openTutorialIntro;
  openProjectTabs;
  openProjectParticipationInfoIntro;
  openProjectParticipationIntro;
  openProjectParticipation;
  openProjectStoryIntro;
  openProjectStory;
  openProjectStoryQuizIntro;
  openProjectStoryQuiz;
  openInterviewFormIntro;
  openInterviewForm;
  openProjectHomeIntro;
  openProjectHome;
  openProjectHomeSecondIntro;
  openProjectInterviewAnswer;
  openTutorialSecondIntro;
  openProjectSecondTabs;
  openProjectRewardForm;
  openTutorialEnd;

  // 추천 프로젝트
  recommendedProjects = [
    {
      project_id: 1,
      project_main_image:"assets/img/project-story-tutorial-image1.png",
      project_name: "FEED100 : 1:1 온라인 인터뷰 기반의 고객반응조사 서비스 FEED100",
      project_max_reward: 5500,
    },
  ];

  // 프로젝트 참여
  isCheck;
  project_notice;
  projectName;
  projectMainImage;
  currentParticipationSlideIndex;
  participationConditionSlides = [];

  // 프로젝트 스토리
  isFirstSlide;
  isLink;
  checkLink;
  nickname;
  projectViewNum;
  maxReward;
  progressState;
  project_link;
  testInfo;
  changeCount;
  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;
  projectStorySlides = [];

  // 프로젝트 스토리 퀴즈
  currentQuizSlideIndex;
  storyQuizSlides = [];

  // 첫인상 및 인터뷰
  firstImpressionScoreNums = [false,false,false,false,false,false,false,false,false,false];
  reward;
  totalReward;
  textcount;

  // 프로젝트 홈
  waitingNotice: string = "현재 인터뷰 대기 중입니다.<br>인터뷰는 프로젝트 기간 동안 진행되며<br>1회 당 최대 500P로<br>총 5회까지 추가 지급됩니다.<br>인터뷰에 성실히 응답하지 않을 시<br>프로젝트에서 제외 될 수 있습니다.<br>만족스러웠던 유저를 선정하여<br>2000P를 지급해 드립니다.<br>도전해 보세요!";

  contentPlaceholder = '이 부분을 터치하여 인터뷰 질문에 답변해 주세요.';
  minTextLength = 20;
  isInterviewHelpHide;
  firstImpressionScore = 0;
  currentInterviewSlide;
  satisfiedContent = {
    interviewQuestion: "아래 문구를 따라서 써주세요~<br><br>인터뷰는 최소 20자 이상 작성해야 하며 글자 수에 따라 보상이 달라져요! 직접 서비스를 경험하면서 느낀 생각과 감정을 솔직하게 작성해주세요~",
    answerContent: ""
  }
  interviewTimeSlide =  {
    "options" : [
      {"option" : "00시 ~ 03시"},
      {"option" : "03시 ~ 06시"},
      {"option" : "06시 ~ 09시"},
      {"option" : "09시 ~ 12시"},
      {"option" : "12시 ~ 15시"},
      {"option" : "15시 ~ 18시"},
      {"option" : "18시 ~ 21시"},
      {"option" : "21시 ~ 24시"},
    ],
    "value" : ""
  };

  interviewQuestion =  "아래 문구를 따라서 써주세요~<br><br>인터뷰는 프로젝트가 진행되는 동안 기업의 질문에 답변을 해야 합니다. 성실히 참여하지 않을 시 프로젝트에서 제외될 수 있습니다.";
  answerContent: string = "";
  rewardProjects = [];
  exp = 10;

  recommendationStats = [false,false,false,false,false,false,false,false,false,false];
  recommendationScore = 0;
  currentRewardSlide;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public userService: UserServiceProvider,    
    public commonService: CommonServiceProvider,
    private platform: Platform,
    private domSanitizer: DomSanitizer,
    private photoViewer: PhotoViewer,
    public actionSheetCtrl: ActionSheetController,
    public keyboard: Keyboard) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad UserTutorialPage');
  }

  
  ionViewWillEnter() {
    console.log('ionViewDidLoad UserTutorialPage');
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = true;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHomeSecondIntro = false;
    this.openProjectHome = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;
    this.openLink = false;
    this.openTestIntro = false;

    this.isCheck = false;
    this.project_notice = "프로젝트에 참여하기 전 꼭 확인해주세요!<br><br>1. 이 프로젝트는 튜토리얼입니다.<br>끝까지 완료하신 경우 1000P가 지급됩니다.<br><br>2. 이 프로젝트는 반복하여 진행할 수 있습니다.<br>단, 보상은 첫 1회에 한합니다.<br><br>3. 프로젝트 중간에 그만 둘 경우 불이익이 있을 수 있습니다.<br>끝까지 참여해주세요!";
    this.projectName = "FEED100 : 1:1 온라인 인터뷰 기반의 고객반응조사 서비스 FEED100";
    this.projectMainImage = "assets/img/project-story-tutorial-image1.png";
    this.participationConditionSlides = [
      {question : "프로젝트에 참여하기 위한<br>조건이 있다는 것을 이해하셨나요?",options : [{option : "예"},{option : "아니오"}], value : ""},
    ];
    this.currentParticipationSlideIndex = 0;
    
    this.isLink = true;
    this.checkLink = false;
    this.isFirstSlide = true;
    this.changeCount = 0;
    this.nickname = "포텐브라더스";
    this.projectViewNum = 410;
    this.maxReward = 5500;
    this.progressState = "3일 전";
    this.testInfo = "테스트 미션은 이곳에 기재됩니다.<br><br>1. 테스트 시작하기 버튼을 눌러주세요.<br>2. 문구를 잘 읽어주세요.<br><br>모든 과정을 마친 후 다시 FEED100으로<br>돌아온 후 인터뷰 작성하기 클릭!";
    this.projectStorySlides = [
      {
        storyImage: "assets/img/project-story-tutorial-image1.png",
        storyVideo: "",
        storyContent: "프로젝트 스토리는 기업의 서비스를 소개하고 테스트 미션 등 기업의 스토리를 들려주는 곳입니다."
      },
      {
        storyImage: "assets/img/project-story-tutorial-image2.png",
        storyVideo: "",
        storyContent: "일반적으로 스토리에는 기업이 서비스를 만들게 된 배경과 어떤 서비스인지 전반적인 소개를 해줄 것입니다."
      },
      {
        storyImage: "assets/img/project-story-tutorial-image3.png",
        storyVideo: "",
        storyContent: "여러분의 역할은 스토리를 보고 테스트를 통한 의견을 기업에게 피드백을 해주는 것입니다."
      },
      {
        storyImage: "assets/img/project-story-tutorial-image4.png",
        storyVideo: "",
        storyContent: "직접 서비스를 경험하면서 느낀 생각과 감정을 솔직하게 나타내면 됩니다!"
      },
      {
        storyImage: "assets/img/project-story-tutorial-image5.png",
        storyVideo: "",
        storyContent: "단, 그 이유를 말해줘야 합니다! 어떤 경험이, 어떤 것에 대하여, 왜 그렇게 생각하게 되었는지 자세하게 작성해주세요!"
      },
      {
        storyImage: "assets/img/project-story-tutorial-image6.png",
        storyVideo: "",
        storyContent: "프로젝트 진행 기간 중 인터뷰에 성실히 임하지 않을 시 프로젝트에서 제외될 수 있습니다.<br>기업의 질문에 대하여 솔직하고 성실히 답변 부탁드립니다."
      },
      {
        storyImage: "assets/img/project-story-tutorial-image7.png",
        storyVideo: "",
        storyContent: "또한 위의 예시처럼 불성실한 답변자에 대하여 이용약관 ‘제16조 9항 - 이용자의 의무’에 따라 불이익이 있을 수 있습니다!"
      }
    ];
    this.totalPageNum = this.projectStorySlides.length + 1;

    this.storyQuizSlides =  [{question : "기업의 서비스 소개와 테스트 미션 등<br>기업의 스토리를 확인할 수 있는 것은?",options : [{option : "프로젝트 스토리"},{option : "토이스토리"},{option : "메이플스토리"}], value : ""}];
    this.currentQuizSlideIndex = 0;
    this.currentInterviewSlide = 0;
    this.isInterviewHelpHide = true;
    this.rewardProjects = [
      {
        project_id: 1,
        project_main_image:"assets/img/project-story-tutorial-image1.png"
      }
    ];
    this.currentRewardSlide = 0;
  }
  
  
  openProjectTabsPage() {
    this.isInfoHide = false;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = true;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;
  }
  
  accessProjectCard() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = true;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = true;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;
  }

  openProjectParticipantPage() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = true;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;
    
    this.participantSlider.lockSwipeToPrev(true);
    this.participantSlider.lockSwipeToNext(true);
  }

  goNextParticipantSlide() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = true;
    this.openProjectParticipation = true;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;

    this.participantSlider.lockSwipeToNext(false);
    this.participantSlider.slideNext(300);
    this.participantSlider.lockSwipeToNext(true);
    this.currentParticipationSlideIndex = this.participantSlider.getActiveIndex();
  }

  openUserProjectStoryPage() {
    if(this.participationConditionSlides[0].value == "예") {
      this.isInfoHide = true;
      this.isSecondInfoHide = true;
      this.openTutorialIntro = false;
      this.openProjectTabs = false;
      this.openProjectParticipationInfoIntro = false;
      this.openProjectParticipationIntro = false;
      this.openProjectParticipation = false;
      this.openProjectStoryIntro = true;
      this.openProjectStory = true;
      this.openProjectStoryQuizIntro = false;
      this.openProjectStoryQuiz = false;
      this.openInterviewFormIntro = false;
      this.openInterviewForm = false;
      this.openProjectHomeIntro = false;
      this.openProjectHome = false;
      this.openProjectInterviewAnswer = false;
      this.openTutorialSecondIntro = false;
      this.openProjectSecondTabs = false;
      this.openProjectRewardForm = false;
      this.openTutorialEnd = false;
    }
    else {
      this.commonService.showBasicAlert('이해하기 어려웠나요?<br>각 프로젝트에는 참여 대상이 맞는지<br>확인하기 위한 참여 조건이 존재합니다.<br>실제 프로젝트에서는 조건에 맞지 않으면<br>참여하지 못하니 신중하게 선택하셔야 합니다!<br>다시 선택해주세요!');
    }
  }

  openProjectStoryPage() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = true;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;
  }
  
  openUserProjectStoryQuizFormPage() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = true;
    this.openProjectStoryQuiz = true;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;
  }

  openProjectStoryQuizIntroPage() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = true;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;
  }

  openUserProjectInterviewForm() {
    if(this.storyQuizSlides[0].value == "프로젝트 스토리") {
      this.isInfoHide = true;
      this.isSecondInfoHide = true;
      this.openTutorialIntro = false;
      this.openProjectTabs = false;
      this.openProjectParticipationInfoIntro = false;
      this.openProjectParticipationIntro = false;
      this.openProjectParticipation = false;
      this.openProjectStoryIntro = false;
      this.openProjectStory = false;
      this.openProjectStoryQuizIntro = false;
      this.openProjectStoryQuiz = false;
      this.openInterviewFormIntro = true;
      this.openInterviewForm = true;
      this.openProjectHomeIntro = false;
      this.openProjectHome = false;
      this.openProjectInterviewAnswer = false;
      this.openTutorialSecondIntro = false;
      this.openProjectSecondTabs = false;
      this.openProjectRewardForm = false;
      this.openTutorialEnd = false;
    }
    else {
      this.commonService.showBasicAlert('이런! 정답이 아닙니다. 스토리를 꼼꼼히 확인하고 다시 시도해주세요.');
    }
  }

  openInterviewFormPage() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = true;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;

    this.interviewSlider.lockSwipeToPrev(true);
    this.interviewSlider.lockSwipeToNext(true);
  }

  ionRadioChange(i) {}

  slideParticipationChanged() {}


  check() {
    if(this.isCheck) {
      this.isCheck = false;
    } else {
      this.isCheck = true;
    }
  }

  valueCheck(index) {
    if(index == 0) {
      return this.isCheck
    } else {
      return this.participationConditionSlides[0].value;
    }
  }

  slideChanged() {
    if(this.storySlider.isBeginning()) {
      this.storySlider.lockSwipeToPrev(true);  // 추가
      this.isFirstSlide = true;
    } else {
      this.storySlider.lockSwipeToPrev(false);  // 추가
      this.isFirstSlide = false;
    }


    if(this.storySlider.getActiveIndex() >= this.totalPageNum) {
      this.currentPageNum = this.totalPageNum;
      if(this.changeCount > 0) {
        this.changeCount = this.changeCount + 1;
      } else {
        this.changeCount = this.changeCount + 1;
        this.openProjectTestIntro();
      }
    } else {
      this.currentPageNum = this.storySlider.getActiveIndex();
    };

    this.progressPercent = 100 * ( this.currentPageNum / (this.totalPageNum) );
  }

  goNextSlide() {
    this.storySlider.slideNext(500);
  }

  goFirstSlide() {
    let differencePageNum = this.currentPageNum + 1;
    for(let i = 0; i < differencePageNum; i++) {
      this.storySlider.slidePrev(200);
    }
  }

  openUserProjectLinkPage() {
    if(this.openLink == true) {
      this.openLink = false;
    } else {
      this.openLink = true;
      this.checkLink = true;
    }
    
  }

  openProjectTestIntro() {
    if(this.openTestIntro == true) {
      this.openTestIntro = false;
    } else {
      this.openTestIntro = true;
    }
  }

  slideQuizChanged() {}

  valueQuizCheck(index) {
    return this.storyQuizSlides[index].value;
  }

  completeEditor() {
    this.commonService.showConfirmAlert('작성을 완료하시겠습니까?<br>작성 후에는 수정할 수 없으며,<br>부적절한 글을 작성할 경우 삭제 및 프로젝트에서 제외될 수 있습니다.', 
      () => {
        this.isInfoHide = true;
        this.isSecondInfoHide = true;
        this.openTutorialIntro = false;
        this.openProjectTabs = false;
        this.openProjectParticipationInfoIntro = false;
        this.openProjectParticipationIntro = false;
        this.openProjectParticipation = false;
        this.openProjectStoryIntro = false;
        this.openProjectStory = false;
        this.openProjectStoryQuizIntro = false;
        this.openProjectStoryQuiz = false;
        this.openInterviewFormIntro = false;
        this.openInterviewForm = false;
        this.openProjectHomeIntro = true;
        this.openProjectHome = true;
        this.openProjectInterviewAnswer = false;
        this.openTutorialSecondIntro = false;
        this.openProjectSecondTabs = false;
        this.openProjectRewardForm = false;
        this.openTutorialEnd = false;
        // this.commonService.showToast('+ ' + this.reward + ' 포인트가 적립되었습니다.');
        this.commonService.showToast('+ 500 포인트가 적립되었습니다.');
        this.totalReward = 500;
        // this.commonService.showBasicAlert('축하합니다! 프로젝트에 성공적으로 참여했습니다. 안내 내용을 확인해주세요!');
      }
    );
  }

  help() {
    if(this.isInterviewHelpHide) {
      this.isInterviewHelpHide = false;
      document.querySelector(".editor-modal .scroll-content")['style'].overflow = 'hidden';
    } else {
      this.isInterviewHelpHide = true;
      document.querySelector(".editor-modal .scroll-content")['style'].overflow = 'scroll';
    }
  }

  openUserProjectStoryVerticalPage() {
    this.commonService.showBasicAlert('일단 아래 인터뷰부터 작성해보는 것은 어떤가요?');
  }

  textCount(text: string) {
    if(text == null) return 0;
    
    let temp: any;
    temp = text.replace(/<br *\/?>/gi, '');
    temp = temp.replace(/(?:\r\n|\r|\n|\s)/g, '');
    return temp.length;
  }

  textCountPercent(text: string, maxTextLength) {
    let count = this.textCount(text)
    if(count <= maxTextLength ) {
      return (this.textCount(text) / maxTextLength) * 100;
    } else {
      return 100;
    }
  }

  countColor(count) {
    if(count < 20) { return "#4e4e4c" }
    else if(count < 30) { return "#7a3c8e" }
    else if(count < 40) { return "#23799d" }
    else if(count < 50) { return "#62941b" }
    else if(count < 100) { return "#f59926" }
    else { return "#ce522f" }
  }

  pointNotice(count) {
    if(count < 20) {return "20자 이상 입력해주세요!" }
    else if(count < 30) { return "더 많은 포인트를 향하여!" }
    else if(count < 40) { return "좋아요! 잘하고 있어요!" }
    else if(count < 50) { return "필력이 대단하네요!"}
    else if(count < 100) { return "당신의 정성에 감동했어요!" }
    else { return "훌륭해요! 더 이상 바랄게 없어요." } 
  }

  rewardPoint(count) {
    if(count < 20) { this.reward = 0; }
    else if(count < 50) { this.reward = (Math.floor(count/10))*100; }
    else { this.reward = 500; }
    return this.reward;
  }

  goNext() {
    this.interviewSlider.lockSwipeToNext(false);
    this.interviewSlider.slideNext(300);
    this.interviewSlider.lockSwipeToNext(true);
    this.currentInterviewSlide = this.interviewSlider.getActiveIndex();
  }

  goNextInterviewSlide(content) {
    console.log(content);
    if(content == "인터뷰는 최소 20자 이상 작성해야 하며 글자 수에 따라 보상이 달라져요! 직접 서비스를 경험하면서 느낀 생각과 감정을 솔직하게 작성해주세요~") {
      this.interviewSlider.lockSwipeToNext(false);
      this.interviewSlider.slideNext(300);
      this.interviewSlider.lockSwipeToNext(true);
      this.currentInterviewSlide = this.interviewSlider.getActiveIndex();
    } else {
      this.commonService.showBasicAlert('이런 이런 오타가 있네요. 다시 한번 확인해주세요.');
    }
  }
  goPrevSlide() {
    this.interviewSlider.lockSwipeToPrev(false);
    this.interviewSlider.slidePrev(300);
    this.interviewSlider.lockSwipeToPrev(true);
  }

  clickImpression(stat:boolean, index:number) {
    for(let i = 0; i < this.firstImpressionScoreNums.length; i++) {
      this.firstImpressionScoreNums[i] = false;
    }
    this.firstImpressionScoreNums[index] = true;
    this.firstImpressionScore = index + 1;
  }

  clickRecommendation(stat:boolean, index:number) {
    for(let i = 0; i < this.recommendationStats.length; i++) {
      this.recommendationStats[i] = false;
    }
    this.recommendationStats[index] = true;
    this.recommendationScore = index + 1;
  }

  openProjectHomePage() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = true;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;
    setTimeout(() => {
      this.openProjectHomeSecondIntro = true;
      this.commonService.showToast('새로운 인터뷰가 도착했어요!');
    }, 1000);
  }

  openInterviewAnswerPage() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectHomeSecondIntro = false;
    this.openProjectInterviewAnswer = true;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = false;
    this.openTutorialEnd = false;
  }

  completeAnswerEditor() {
    this.commonService.showConfirmAlert('작성을 완료하시겠습니까?<br>작성 후에는 수정할 수 없으며,<br>부적절한 글을 작성할 경우 삭제 및 프로젝트에서 제외될 수 있습니다.', 
      () => {
        if(this.answerContent == "인터뷰는 프로젝트가 진행되는 동안 기업의 질문에 답변을 해야 합니다. 성실히 참여하지 않을 시 프로젝트에서 제외될 수 있습니다.") {
          this.isInfoHide = true;
          this.isSecondInfoHide = false;
          this.openTutorialIntro = false;
          this.openProjectTabs = false;
          this.openProjectParticipationInfoIntro = false;
          this.openProjectParticipationIntro = false;
          this.openProjectParticipation = false;
          this.openProjectStoryIntro = false;
          this.openProjectStory = false;
          this.openProjectStoryQuizIntro = false;
          this.openProjectStoryQuiz = false;
          this.openInterviewFormIntro = false;
          this.openInterviewForm = false;
          this.openProjectHomeIntro = false;
          this.openProjectHome = false;
          this.openProjectInterviewAnswer = false;
          this.openTutorialSecondIntro = true;
          this.openProjectSecondTabs = true;
          this.openProjectRewardForm = false;
          this.openTutorialEnd = false;
          // this.commonService.showToast('+ ' + this.reward + ' 포인트가 적립되었습니다.');
          this.commonService.showToast('+ 500 포인트가 적립되었습니다.');
          this.totalReward = 1000;
          // this.commonService.showBasicAlert('축하합니다! 프로젝트에 성공적으로 참여했습니다. 안내 내용을 확인해주세요!');
        } else {
          this.commonService.showBasicAlert('이런 이런 오타가 있네요. 다시 한번 확인해주세요.');
        }
      }
    );
  }

  openProjectSecondTabsPage() {
    this.isInfoHide = true;
    this.isSecondInfoHide = false;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectHomeSecondIntro = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = true;
    this.openProjectRewardForm = true;
    this.openTutorialEnd = false;
  }

  openProjectRewardFormPage() {
    this.isInfoHide = true;
    this.isSecondInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectParticipationInfoIntro = false;
    this.openProjectParticipationIntro = false;
    this.openProjectParticipation = false;
    this.openProjectStoryIntro = false;
    this.openProjectStory = false;
    this.openProjectStoryQuizIntro = false;
    this.openProjectStoryQuiz = false;
    this.openInterviewFormIntro = false;
    this.openInterviewForm = false;
    this.openProjectHomeIntro = false;
    this.openProjectHome = false;
    this.openProjectHomeSecondIntro = false;
    this.openProjectInterviewAnswer = false;
    this.openTutorialSecondIntro = false;
    this.openProjectSecondTabs = false;
    this.openProjectRewardForm = true;
    this.openTutorialEnd = false;
    
    this.rewardSlider.lockSwipeToNext(true);
    this.rewardSlider.lockSwipeToPrev(true);
  }

  goNextRewardSlide(index) {
    switch(index) {
      case 0:
        this.commonService.isLoadingActive = true;
        let loading = this.commonService.presentLoading();

        this.userService.rewardTutorial()
        .finally(() => {
          loading.dismiss();
        })
        .subscribe(
          (data) => {
            if(data.success == true) {
              if(data.data) {
        this.rewardSlider.lockSwipeToPrev(true);
                this.rewardSlider.lockSwipeToNext(false);
                this.rewardSlider.slideNext(300);
                this.rewardSlider.lockSwipeToNext(true);
                      }
              else {
                if(data.message == 'is already rewarded') {
                  this.commonService.showBasicAlert('이미 보상을 받으셨습니다.');
                  this.endTutorial();
                }
              }
            }
            else if(data.success == false) {
              this.commonService.apiRequestErrorHandler(data, this.navCtrl)
              .then(() => {
                this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
              });
            }
          },
          (err) => {
            console.log(err);
            this.commonService.showBasicAlert('오류가 발생했습니다.');
          }
        );
        break;
      case 1:
        this.isInfoHide = true;
        this.isSecondInfoHide = true;
        this.openTutorialIntro = false;
        this.openProjectTabs = false;
        this.openProjectParticipationInfoIntro = false;
        this.openProjectParticipationIntro = false;
        this.openProjectParticipation = false;
        this.openProjectStoryIntro = false;
        this.openProjectStory = false;
        this.openProjectStoryQuizIntro = false;
        this.openProjectStoryQuiz = false;
        this.openInterviewFormIntro = false;
        this.openInterviewForm = false;
        this.openProjectHomeIntro = false;
        this.openProjectHome = false;
        this.openProjectHomeSecondIntro = false;
        this.openProjectInterviewAnswer = false;
        this.openTutorialSecondIntro = false;
        this.openProjectSecondTabs = false;
        this.openProjectRewardForm = false;
        this.openTutorialEnd = true;
        break;
    }
  }

  endTutorial() {
    this.navCtrl.setRoot('UserTabsPage');    
  }
}
