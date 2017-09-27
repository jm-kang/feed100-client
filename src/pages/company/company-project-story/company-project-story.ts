import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';

import { CompanyProjectLinkPage } from '../company-project-link/company-project-link';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';


/**
 * Generated class for the CompanyProjectStoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-story',
  templateUrl: 'company-project-story.html',
})
export class CompanyProjectStoryPage {
  @ViewChild(Slides) slides: Slides;

  isFirstSlide: boolean = true;
  isFeedback: boolean = true;
  isLink: boolean = true;

  // projectMainImage: String = "";
  // avatarImage: String = "";
  // nickname: String = "";
  // projectName: String = "";
  // projectViewNum: number = 0;
  // participantNum: number = 0;
  // maxParticipantNum: number = 0;
  // progressState: String = "";
  // projectSummary: String = ""
  // projectRegistrationDate: String = "";

  projectMainImage: String = "assets/img/project-main-image1.png";
  avatarImage: String = "assets/img/company-avatar-image1.png";
  nickname: String = "더콰이엇";
  projectName: String = "프로젝트 이름 프로젝트 이름 프로젝트 이름";
  projectViewNum: number = 200;
  participantNum: number = 10;
  maxParticipantNum: number = 30;
  progressState: String = "2017-09-13 00:00:00";
  projectSummary: String = "프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명"
  projectRegistrationDate: String = "2017-09-13 00:00:00";

  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  projectStorySlides = [
    {
      storyImage: '',
      storyVideo: 'https://www.youtube.com/embed/sbBynX2_TUM',
      storyContent: '스토리 동영상',
    },
    {
      storyImage: 'assets/img/project-story-image01.jpeg',
      storyVideo: '',
      storyContent: '스토리 설명 스토리 설명스토리 설명스토리 설명스토리 설명스토리 설명스토리 설명스토리 설명스토리 설명스토리 설명스토리 설명스토리 설명',
    },
    {
      storyImage: 'assets/img/project-story-image02.jpeg',
      storyVideo: '',
      storyContent: '스토리 설명 스토리 설명',
    },
    
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UserProjectStoryPage');
    // let loading = this.httpService.presentLoading();
    // let project_id = this.navParams.get('project_id');

    // this.httpService.getProject(project_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.isLink = (data.data.project_link != null) ? true : false;
    //       this.projectMainImage = data.data.project_main_image;
    //       this.avatarImage = data.data.avatar_image;
    //       this.nickname = data.data.nickname;
    //       this.projectName = data.data.project_name;
    //       this.projectViewNum = data.data.project_view_num;
    //       this.participantNum = data.data.participant_num;
    //       this.maxParticipantNum = data.data.max_participant_num;
    //       this.progressState = data.data.project_end_date;
    //       this.projectSummary = data.data.project_summary;
    //       this.projectRegistrationDate = data.data.project_registration_date;
    //       this.projectStorySlides = JSON.parse(data.data.project_story);

    //       this.totalPageNum = this.projectStorySlides.length + 1;
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidLoad();
    //       });
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // )
    
    // 지워도됨
    this.totalPageNum = this.projectStorySlides.length + 1;
    // end
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

  openCompanyProjectLinkPage() {
    let projectLinkModal = this.modalCtrl.create(CompanyProjectLinkPage);
    projectLinkModal.present();
  }
}
