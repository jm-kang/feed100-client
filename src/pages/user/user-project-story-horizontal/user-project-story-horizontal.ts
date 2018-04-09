import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, Platform } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

declare var cordova:any;

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';


/**
 * Generated class for the UserProjectStoryHorizontalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-story-horizontal',
  templateUrl: 'user-project-story-horizontal.html',
})
export class UserProjectStoryHorizontalPage {
  @ViewChild(Slides) slides: Slides;

  project_id;

  isFirstSlide: boolean = true;
  // 프로젝트를 참여하기위해 왔는지
  // isFeedback: boolean = true;
  isFeedback;
  // 프로젝트에 테스트할 링크가 있는지
  // isLink: boolean = false;
  isLink;
  // 테스트 시작하기를 한번이라도 눌렀는지
  check;

  // projectMainImage: string = "./../../assets/img/project-main-image3.png";
  // nickname: string = "포텐브라더스";
  // projectName: string = "스마트 거치대 CUBIT : 스마트폰을 이용한 편리한 촬영 도구";
  // projectViewNum: number = 0;
  // participantNum: number = 0;
  // maxParticipantNum: number = 0;
  // maxReward: number = 5500;
  // progressState: string = "";
  // projectRegistrationDate: string = "";
  projectMainImage;
  nickname;
  projectName;
  projectViewNum;
  maxReward;
  progressState;
  project_link;
  // 프로젝트 테스트
  // testInfo: string="asdasdas";
  testInfo;

  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  // projectStorySlides = [
  //   {
  //     storyImage: "",
  //     storyVideo: "",
  //     storyContent: ""
  //   }
  // ];
  projectStorySlides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public platform: Platform,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    private themeableBrowser: ThemeableBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectStoryHorizontalPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
    this.isFeedback = this.navParams.get('isFeedback');
    this.check = this.navParams.get('process_test');

    this.slides.lockSwipeToPrev(true);  
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectStoryHorizontalPage');
    let loading = this.commonService.presentLoading();

    this.userService.getProjectStory(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(this.platform.is('android')) {
            this.isLink = (data.data.android_link) ? true : false;
            this.project_link = data.data.android_link;
          }
          else if(this.platform.is('ios')) {
            this.isLink = (data.data.ios_link) ? true : false;
            this.project_link = data.data.ios_link;
          }
          this.projectMainImage = data.data.project_main_image;
          this.nickname = data.data.nickname;
          this.projectName = data.data.project_name;
          this.projectViewNum = data.data.project_view_num;
          this.maxReward = data.data.project_max_reward;
          this.progressState = data.data.project_end_date;
          this.testInfo = data.data.test_notice;
          this.projectStorySlides = JSON.parse(data.data.project_story);

          this.totalPageNum = this.projectStorySlides.length + 1;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    )
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

  openUserProjectLinkPage() {
    this.commonService.isLoadingActive = true;    
    let loading = this.commonService.presentLoading();
    
    this.userService.checkProcessTest(this.project_id)
    .finally(() => {
      // loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          console.log(data.data);
          if(data.data) {
            this.commonService.showToast('곧 해당 서비스로 이동합니다. 테스트 후에는 반드시 FEED100 앱으로 돌아와주세요!');
            setTimeout(() => {
              cordova.ThemeableBrowser.open(this.project_link, '_system');
              this.check = true;
              loading.dismiss();
            }, 4000);
          }
          else {
            if(data.message == 'project is not proceeding') {
              this.back();
              this.commonService.showBasicAlert('이런! 프로젝트가 이미 종료되었습니다.');
            }
            else if(data.message == 'project is exceeded') {
              this.back();
              this.commonService.showBasicAlert('이런! 인원이 초과되었습니다.');
            }
            loading.dismiss();
          }
        }
        else if(data.success == false) {
          this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
          loading.dismiss();
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    )
  }

  openUserProjectStoryQuizFormPage() {
    this.commonService.showConfirmAlert('잠깐! 스토리를 완벽히 이해하셨나요?<br/>그럼 이제 퀴즈를 풀어볼게요! 준비되셨나요?',
      () => {
        this.navCtrl.push('UserProjectStoryQuizFormPage', { "project_id" : this.project_id});
        setTimeout(() => {
          this.goFirstSlide();
        }, 500);
      }
    );
  }
}
