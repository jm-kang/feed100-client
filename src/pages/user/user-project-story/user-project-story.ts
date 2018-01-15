import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, Platform } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserProjectStoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-story',
  templateUrl: 'user-project-story.html',
})
export class UserProjectStoryPage {
  @ViewChild(Slides) slides: Slides;

  project_id;

  isFirstSlide: boolean = true;
  isFeedback: boolean = false;
  isLink: boolean = true;

  projectMainImage: String = "";
  avatarImage: String = "";
  nickname: String = "";
  projectName: String = "";
  projectViewNum: number = 0;
  participantNum: number = 0;
  maxParticipantNum: number = 0;
  progressState: String = "";
  projectSummary: String = ""
  projectRegistrationDate: String = "";
  project_link;

  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  projectStorySlides = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public platform: Platform,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectStoryPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
    this.isFeedback = this.navParams.get('isFeedback');
    this.slides.lockSwipeToPrev(true);  
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectStoryPage');
    let loading = this.commonService.presentLoading();

    this.userService.getProject(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(this.platform.is('android')) {
            this.isLink = (data.data.project_android_link != null) ? true : false;
            this.project_link = data.data.project_android_link;
          }
          else if(this.platform.is('ios')) {
            this.isLink = (data.data.project_ios_link != null) ? true : false;
            this.project_link = data.data.project_ios_link;
          }
          this.projectMainImage = data.data.project_main_image;
          this.avatarImage = data.data.avatar_image;
          this.nickname = data.data.nickname;
          this.projectName = data.data.project_name;
          this.projectViewNum = data.data.project_view_num;
          this.participantNum = data.data.participant_num;
          this.maxParticipantNum = data.data.max_participant_num;
          this.progressState = data.data.project_end_date;
          this.projectSummary = data.data.project_summary;
          this.projectRegistrationDate = data.data.project_registration_date;
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
    let projectLinkModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectLinkPage', params: { "project_link" : this.project_link }});
    projectLinkModal.present();
  }

  openUserProjectStoryQuizPage() {
    this.commonService.showConfirmAlert('잠깐! 스토리를 완벽히 이해하셨나요?<br/>그럼 이제 퀴즈를 풀어볼게요! 준비되셨나요?',
      () => {
        this.navCtrl.push('UserProjectStoryQuizPage', { "project_id" : this.project_id});
        setTimeout(() => {
          this.goFirstSlide();
        }, 500);
      }
    );
  }
}
