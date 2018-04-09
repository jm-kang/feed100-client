import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController, Platform } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

declare var cordova:any;

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectStoryHorizontalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-story-horizontal',
  templateUrl: 'admin-project-story-horizontal.html',
})
export class AdminProjectStoryHorizontalPage {
  @ViewChild(Slides) slides: Slides;

  project_id;

  isFirstSlide: boolean = true;
  isLink: boolean = true;
  // 프로젝트에 테스트할 링크가 있는지
  projectMainImage: string = "./../../assets/img/project-main-image3.png";
  nickname: string = "포텐브라더스";
  projectName: string = "스마트 거치대 CUBIT : 스마트폰을 이용한 편리한 촬영 도구";
  projectViewNum: number = 0;
  participantNum: number = 0;
  maxParticipantNum: number = 0;
  maxReward: number = 5500;
  progressState: string = "2018-04-20 00:00:00";
  projectSummary: string = "";
  projectRegistrationDate: string = "";
  project_link;


  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  projectStorySlides = [
    {
      storyImage: "",
      storyVideo: "",
      storyContent: ""
    }
  ];

  isPrivate;
  isTermination;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public platform: Platform,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectStoryHorizontalPage');
    // this.commonService.isLoadingActive = true;
    // this.project_id = this.navParams.get('project_id');
    this.slides.lockSwipeToPrev(true);  
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectStoryHorizontalPage');
    // let loading = this.commonService.presentLoading();

    // this.adminService.getProject(this.project_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       if(this.platform.is('android')) {
    //         this.isLink = (data.data.project_android_link) ? true : false;
    //         this.project_link = data.data.project_android_link;
    //       }
    //       else if(this.platform.is('ios')) {
    //         this.isLink = (data.data.project_ios_link) ? true : false;
    //         this.project_link = data.data.project_ios_link;
    //       }
    //       this.projectMainImage = data.data.project_main_image;
    //       this.nickname = data.data.nickname;
    //       this.projectName = data.data.project_name;
    //       this.projectViewNum = data.data.project_view_num;
    //       this.participantNum = data.data.participant_num;
    //       this.maxParticipantNum = data.data.max_participant_num;
    //       this.progressState = data.data.project_end_date;
    //       this.projectSummary = data.data.project_summary;
    //       this.projectRegistrationDate = data.data.project_registration_date;
    //       this.projectStorySlides = JSON.parse(data.data.project_story);
    //       this.isPrivate = data.data.is_private;

          this.totalPageNum = this.projectStorySlides.length + 1;
    //     }
    //     else if(data.success == false) {
    //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewWillEnter();
    //       });
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.commonService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // )    
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

  openAdminProjectLinkPage() {
    this.commonService.isLoadingActive = true;    
    let loading = this.commonService.presentLoading();
    this.commonService.showToast('곧 해당 서비스로 이동합니다. 테스트 후에는 반드시 FEED100 앱으로 돌아와주세요!');
    setTimeout(() => {
      cordova.ThemeableBrowser.open(this.project_link, '_system');
      loading.dismiss();
    }, 4000);
  }

  updatePrivateState() {
    let message = '';
    let value;
    if(this.isPrivate) {
      message = '현재 비공개 상태입니다.<br/>공개 상태로 변경하시겠습니까?';
      value = 0;
    }
    else {
      message = '현재 공개 상태입니다.<br/>비공개 상태로 변경하시겠습니까?';
      value = 1;
    }
    this.commonService.showConfirmAlert(message, 
    () => {
      this.commonService.isLoadingActive = true;
      let loading = this.commonService.presentLoading();
  
      this.adminService.updateProjectPrivateState(this.project_id, value)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            if(this.isPrivate) {
              this.isPrivate = false;
            }
            else {
              this.isPrivate = true;
            }
            this.commonService.showBasicAlert('변경되었습니다.');
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
            })
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );  
    }
    );
  }

  terminateProject() {
    let message = '';
    // let value;
    if(!this.isTermination) {
      message = '현재 진행중 상태입니다.<br/>종료 상태로 변경하시겠습니까?';
      // value = 1;
    }
    this.commonService.showConfirmAlert(message, 
    () => {
      // this.commonService.isLoadingActive = true;
      // let loading = this.commonService.presentLoading();
  
      // this.adminService.updateProjectPrivateState(this.project_id, value)
      // .finally(() => {
      //   loading.dismiss();
      // })
      // .subscribe(
      //   (data) => {
      //     if(data.success == true) {
      //       if(this.isTermination) {
      //         this.isTermination = false;
      //       }
      //       else {
      //         this.isTermination = true;
      //       }
      //       this.commonService.showBasicAlert('변경되었습니다.');
      //     }
      //     else if(data.success == false) {
      //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
      //       .then(() => {
      //         this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
      //       })
      //     }
      //   },
      //   (err) => {
      //     console.log(err);
      //     this.commonService.showBasicAlert('오류가 발생했습니다.');
      //   }
      // );  
    }
    );    
  }
}
