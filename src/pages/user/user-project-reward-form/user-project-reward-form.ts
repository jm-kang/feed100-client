import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides } from 'ionic-angular';

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
  satisfaction: number = 0;
  nps: number = 0;
  isQuestionWrited = [false, false, false];
  projectPoint: number = 20000;
  feedbackPoint: number = 1500;
  opinionPoint: number = 300;
  interviewPoint: number = 5000;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectRewardFormPage');
    this.slides.lockSwipeToNext(true);
  }

  ionViewDidEnter() {

  }
  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      this.viewCtrl.dismiss();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
        this.slides.lockSwipeToNext(false);  
      }
    }
  }

  onModelChange(newVal, index) {
    if(newVal > 0) {
      this.isQuestionWrited[index] = true; 
      this.slides.lockSwipeToNext(false);
    } else {
      this.isQuestionWrited[index] = false;
      this.slides.lockSwipeToNext(true);
    }
  }

  goNextSlide() {
    this.slides.slideNext(500);
  }
}
