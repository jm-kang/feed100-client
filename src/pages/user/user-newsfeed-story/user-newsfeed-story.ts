import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, App } from 'ionic-angular';

/**
 * Generated class for the UserNewsfeedStoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-newsfeed-story',
  templateUrl: 'user-newsfeed-story.html',
})
export class UserNewsfeedStoryPage {
  @ViewChild(Slides) slides: Slides;

  isFirstSlide: boolean = true;
  isLastSlide: boolean = false;
  isLike: boolean = false;
  newsfeedMainImage: String = "assets/img/newsfeed-main-image1.png";
  avatarImage: String = "assets/img/newsfeed-avatar-image1.png";
  nickname: String = "카플라노코리아";
  newsfeedName: String = "언제 어디서나 리얼 에스프레소를 만나다 : 카플라노 컴프레소";
  newsfeedSource: String = "www.wadiz.kr";
  newsfeedViewNum: number = 2155;
  newsfeedLikeNum: number = 80;
  newsfeedCommentNum: number = 0;
  newsfeedSummary: String = "세계 최초로 가장 컴팩하고 가볍게 만들어 언제 어디서나 가지고 다니면서 시간, 장소에 구애받지 않으면서 9bar의 리얼 에스프로소를 만들 수 있는 신개념 커피메이커입니다."
  newsfeedRegistrationDate: String = "2017.7.31";
  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;
  newsfeedComment: String = "";

  newsfeedStorySlides = [
    {
      storyImage: "",
      storyVideo: "https://www.youtube.com/embed/8bJCt7CgFhM",
      storyContent: "세계 최초로 가장 컴팩하고 가볍게 만들어 언제 어디서나 가지고 다니면서 시간, 장소에 구애받지 않으면서 9bar의 리얼 에스프로소를 만들 수 있는 신개념 커피메이커입니다."
    },
    {
      storyImage: "assets/img/newsfeed-story-image01.jpeg",
      storyVideo: "",
      storyContent: "하루에 한잔 이상은 꼭 마시게 되는 커피. 이제는 기호 식품이 아니라 한 끼 먹듯이 마시는 음료가 된 것 같습니다. 그래서, 우리는 늘 맛있고, 저렴하고, 손 쉽게 마실 수 있는 커피를 원합니다. 커피 맛으로 유명한 카페에 찾아가기엔 시간도 없고, 매일같이 사 먹기엔 가격이 부담이 되는 것이 사실입니다. 그렇다고 편의점에서 구매해서 마시자니 다 그 맛이 그 맛. 저렴한 카페에서 사 먹으니 내 입맛이랑 뭔가 맞지 않아서 다 마시지도 못하고 버리게 됩니다. 맛있고, 저렴하고, 쉬운 커피는 정말 없는 걸까요?"
    },
    {
      storyImage: "assets/img/newsfeed-story-image02.jpeg",
      storyVideo: "",
      storyContent: "요즘들어 조용하게 커피를 즐길 수 있는 홈카페에 대한 마음이 커지신다구요? 친한 누구는 요즘 커핑 원데이클래스를 다닌다고 하던데, 그렇다고 드립을 배우자니 준비하는 데에도 돈이 필요한 것 같고, 매번 장비를 들고 다닐 수 없으니까요. 사무실에서도, 집에서도, 피크닉에 가서도, 등산이나 캠핑장에서도,. 쉽게 먹을 수 있어야 진짜 '쉬운 커피' 아닐까요?"
    },
    {
      storyImage: "assets/img/newsfeed-story-image03.jpeg",
      storyVideo: "",
      storyContent: "커피를 사랑하는 모든 분들,  그리고  카플라노의 새로운 제품을 기다려주신 분들께, 정식 출시 이전에 와디즈에서 부담없는 가격 혜택을 통해 인사드리려고 합니다. 200그램도 되지 않는 가벼운 무게,  뒷주머니나 핸드백에도 쏙 들어가는 컴팩트한 사이즈로 언제 어디서나 고소하고 맛있는 에스프레소를 추출할 수 있는 커피메이커 입니다."
    },
    {
      storyImage: "assets/img/newsfeed-story-image04.jpeg",
      storyVideo: "",
      storyContent: "휴대용 커피메이커의 단점 중 하나는,  아무리 작고 가볍다 하더라도  커피원두와 재료들을 챙기다보면 짐이 한가득 나오게 된다는 점입니다. 카플라노 컴프레소는 175그램의 무게와 17X10cm로 지갑과 비슷한 사이즈 입니다."
    },
    {
      storyImage: "assets/img/newsfeed-story-image05.jpeg",
      storyVideo: "",
      storyContent: "원리는 어렵지만 사용방법은 쉽습니다."
    }
  ];

  newsfeedComments = [
    {
      nickname: "ktwjzzang",
      avatarImage: "assets/img/user-avatar-image.png",
      commentRegistrationDate: "2017.8.13 23:27",
      commentContent: "기다리던 카플라노 컴프레소!!<br>따로 공지가 안떠서 3시부터 들락날락하면서 확인했었네요~<br>좋은 상품 기대할꼐요~<br>아울러 페이스북 이벤트 참여완료했습니다!<br>https://www.facebook.com/noweatgnak/posts/1616307451778037<br>감사합니다~~"
    },
    {
      nickname: "Monica",
      avatarImage: "assets/img/user-avatar-image2.png",
      commentRegistrationDate: "2017.8.13 16:31",
      commentContent: "사전예약신청했었는데 연락도 안오고 알림도 안뜨고 . . . . 제가들어와봐서 알았네요 . . . . ."
    },
    {
      nickname: "Nisam",
      avatarImage: "assets/img/user-avatar-image3.png",
      commentRegistrationDate: "2017.8.13 15:36",
      commentContent: "오웃.."
    },
    {
      nickname: "ktwjzzang",
      avatarImage: "assets/img/user-avatar-image.png",
      commentRegistrationDate: "2017.8.13 23:27",
      commentContent: "기다리던 카플라노 컴프레소!!<br>따로 공지가 안떠서 3시부터 들락날락하면서 확인했었네요~<br>좋은 상품 기대할꼐요~<br>아울러 페이스북 이벤트 참여완료했습니다!<br>https://www.facebook.com/noweatgnak/posts/1616307451778037<br>감사합니다~~"
    },
    {
      nickname: "Monica",
      avatarImage: "assets/img/user-avatar-image2.png",
      commentRegistrationDate: "2017.8.13 16:31",
      commentContent: "사전예약신청했었는데 연락도 안오고 알림도 안뜨고 . . . . 제가들어와봐서 알았네요 . . . . ."
    },
    {
      nickname: "Nisam",
      avatarImage: "assets/img/user-avatar-image3.png",
      commentRegistrationDate: "2017.8.13 15:36",
      commentContent: "오웃.."
    },
    {
      nickname: "ktwjzzang",
      avatarImage: "assets/img/user-avatar-image.png",
      commentRegistrationDate: "2017.8.13 23:27",
      commentContent: "기다리던 카플라노 컴프레소!!<br>따로 공지가 안떠서 3시부터 들락날락하면서 확인했었네요~<br>좋은 상품 기대할꼐요~<br>아울러 페이스북 이벤트 참여완료했습니다!<br>https://www.facebook.com/noweatgnak/posts/1616307451778037<br>감사합니다~~"
    },
    {
      nickname: "Monica",
      avatarImage: "assets/img/user-avatar-image2.png",
      commentRegistrationDate: "2017.8.13 16:31",
      commentContent: "사전예약신청했었는데 연락도 안오고 알림도 안뜨고 . . . . 제가들어와봐서 알았네요 . . . . ."
    },
    {
      nickname: "Nisam",
      avatarImage: "assets/img/user-avatar-image3.png",
      commentRegistrationDate: "2017.8.13 15:36",
      commentContent: "오웃.."
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
    this.totalPageNum = this.newsfeedStorySlides.length - 1;
    this.newsfeedCommentNum = this.newsfeedComments.length;
    this.newsfeedStorySlides.length = this.newsfeedStorySlides.length-1;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserNewsfeedStoryPage');
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

    if (this.slides.isEnd()) {
      this.isLastSlide = true;
    } else {
      this.isLastSlide = false;
    }

    if(this.slides.getActiveIndex() > this.totalPageNum) {
      this.currentPageNum = this.totalPageNum;  
    } else {
      this.currentPageNum = this.slides.getActiveIndex();
    }
    this.progressPercent = 100 * ( this.currentPageNum / (this.totalPageNum) );
  }

  slideToComment() {
    let differencePageNum = this.totalPageNum - this.currentPageNum + 1;
    for(let i = 0; i < differencePageNum; i++) {
      this.slides.slideNext(200);
    }
  }

  clickLike() {
    if(this.isLike) {
      this.newsfeedLikeNum = this.newsfeedLikeNum - 1;
      this.isLike = false;
    } else {
      this.newsfeedLikeNum = this.newsfeedLikeNum + 1;
      this.isLike = true;
    }
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

  writeNewsfeedComment() {

  }

}
