import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';

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
  @ViewChild(Slides) slides: Slides;
  project_id;
  satisfaction: number = 0;
  recommendation: number = 0;
  isQuestionWrited = [false, false, false];
  feedbackPoint: number = 0;
  opinionPoint: number = 0;
  interviewPoint: number = 0;
  projectPoint: number = 0;
  exp: number = 0;
  interviewNum = 0;

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
    this.slides.lockSwipeToNext(true);
  }

  ionViewDidEnter() {

  }
  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      this.dismiss();
    }
  }

  dismiss() {
    if(this.slides.getActiveIndex() == 2) {
      this.viewCtrl.dismiss("refresh");
    }
    else {
      this.viewCtrl.dismiss();
    }
  }

  slideChanged() {
    if(this.slides.getActiveIndex() == 0) {
      if(!this.isQuestionWrited[0]) {
        this.slides.lockSwipeToNext(true);  
      } else {
        this.slides.lockSwipeToNext(false);  
      }
    }
    if(this.slides.getActiveIndex() == 1) {
      if(!this.isQuestionWrited[1]) {
        this.slides.lockSwipeToNext(true);  
      } else {
        this.slides.lockSwipeToNext(true);  
      }
    }
    if(this.slides.getActiveIndex() == 2) {
      this.slides.lockSwipes(true);
    }
  }

  onModelChange(newVal, index) {
    if(newVal > 0) {
      this.isQuestionWrited[index] = true;
      if(index == 1) {
        this.slides.lockSwipeToNext(true);
      }
      else {
        this.slides.lockSwipeToNext(false);
      }
    } else {
      this.isQuestionWrited[index] = false;
      this.slides.lockSwipeToNext(true);
    }
  }

  goNextSlide(index) {
    switch(index) {
      case 0:
        this.slides.slideNext(500);
        break;
      case 1:
        let loading = this.commonService.presentLoading();

        this.userService.reward(this.project_id, this.satisfaction, this.recommendation)
        .finally(() => {
          loading.dismiss();
        })
        .subscribe(
          (data) => {
            if(data.success == true) {
              this.feedbackPoint = data.data.feedback_point;
              this.opinionPoint = data.data.opinion_point;
              this.interviewPoint = data.data.interview_point;
              this.projectPoint = data.data.project_point;
              this.exp = data.data.experience_point;
              this.interviewNum = data.data.interview_num;
          
              this.slides.lockSwipeToNext(false);
              this.slides.slideNext(500);
            }
            else if(data.success == false) {
              this.commonService.apiRequestErrorHandler(data, this.navCtrl)
              .then(() => {
                this.goNextSlide(index);
              });
            }
          },
          (err) => {
            console.log(err);
            this.commonService.showBasicAlert('오류가 발생했습니다.');
          }
        );
        break;
      case 2:
        this.dismiss();
        break;
    }
  }
}
