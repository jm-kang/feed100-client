import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';

import { UserProjectFeedbackFormPage } from '../user-project-feedback-form/user-project-feedback-form';
import { UserProjectLinkPage } from '../user-project-link/user-project-link';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';


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

  isFirstSlide: boolean = true;
  isFeedback: boolean = true;
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

  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  projectStorySlides = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public httpService: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectStoryPage');
    let project_id = this.navParams.get('project_id');
    this.httpService.getProject(project_id)
    .subscribe(
      (data) => {
        if(data.success == true) {
          console.log(data.data.isLink);
          this.isLink = (data.data.project_link != null) ? true : false;
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
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          });
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    )
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

    if(this.slides.getActiveIndex() > this.totalPageNum) {
      this.currentPageNum = this.totalPageNum;  
    } else {
      this.currentPageNum = this.slides.getActiveIndex();
    };

    // let originalStory = this.projectStorySlides[this.slides.getActiveIndex()-1].storyContent;
    // console.log(originalStory);
    // this.projectStorySlides[this.slides.getActiveIndex()-1].storyContent = '';
    // let originalStoryLen = originalStory.length;
    // console.log(originalStoryLen);
    // let currentStoryLen = 0;
    // let storyInterval = setInterval(() => {
    //   if(originalStoryLen <= currentStoryLen) {
    //     clearInterval(storyInterval);
    //   }
    //   else {
    //     this.projectStorySlides[this.slides.getActiveIndex()-1].storyContent += originalStory[currentStoryLen];
    //     currentStoryLen += 1;
    //   }
    // }, 80);

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

  openProjectLinkPage() {
    let projectLinkModal = this.modalCtrl.create(UserProjectLinkPage);
    projectLinkModal.present();
  }

  openProjectFeedbackFormPage() {
    this.navCtrl.push(UserProjectFeedbackFormPage);
  }
}
