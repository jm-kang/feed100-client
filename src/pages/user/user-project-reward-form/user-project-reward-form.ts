import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserProjectRewardFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-reward-form',
  templateUrl: 'user-project-reward-form.html',
})
export class UserProjectRewardFormPage {
  @ViewChild("contentRef") contentHandle: Content;
  @ViewChild(Slides) slides: Slides;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  project_id;

  recommendationScore: number = 0;
  isSelect: boolean = false;
  feedbackPoint: number = 0;
  opinionPoint: number = 0;
  interviewPoint: number = 0;
  reportPoint: number = 0; // 심층 피드백 보상 금액
  projectPoint: number = 0;
  exp: number = 0;
  interviewNum: number = 0;

  recommendationStats = [false,false,false,false,false,false,false,false,false,false];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectRewardFormPage');
    this.project_id = this.navParams.get('project_id');
    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectRewardFormPage');
  }

  back() {
    if(this.slides.getActiveIndex() == 1) {
      // this.ModalWrapperPage.dismissModal("refresh");
      this.navCtrl.pop();
    }
    else {
      // this.ModalWrapperPage.dismissModal();
      this.navCtrl.pop();
    }
  }

  goNextSlide(index) {
    switch(index) {
      case 0:
        this.slides.lockSwipeToNext(false);
        this.slides.slideNext(300);
        this.slides.lockSwipeToNext(true);
        // this.commonService.isLoadingActive = true;
        // let loading = this.commonService.presentLoading();

        // this.userService.reward(this.project_id, this.recommendation)
        // .finally(() => {
        //   loading.dismiss();
        // })
        // .subscribe(
        //   (data) => {
        //     if(data.success == true) {
        //       this.isBest = data.data.feedback_is_best;
        //       this.isSelect = data.data.report_is_select;
        //       this.feedbackPoint = data.data.feedback_point;
        //       this.opinionPoint = data.data.opinion_point;
        //       this.interviewPoint = data.data.interview_point;
        //       this.reportPoint = data.data.report_point;
        //       this.projectPoint = data.data.project_point;
        //       this.exp = data.data.experience_point;
        //       this.interviewNum = data.data.interview_num;
          
        //       this.slides.lockSwipeToNext(false);
        //       this.slides.slideNext(500);
        //     }
        //     else if(data.success == false) {
        //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
        //       .then(() => {
        //         this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
        //       });
        //     }
        //   },
        //   (err) => {
        //     console.log(err);
        //     this.commonService.showBasicAlert('오류가 발생했습니다.');
        //   }
        // );
        break;
      case 1:
        this.back();
        break;
    }
  }

  clickRecommendation(stat:boolean, index:number) {
    for(let i = 0; i < this.recommendationStats.length; i++) {
      this.recommendationStats[i] = false;
    }
    this.recommendationStats[index] = true;
    this.recommendationScore = index + 1;
  }

}
