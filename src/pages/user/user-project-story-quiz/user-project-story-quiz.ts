import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ViewController, App, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { isRightSide } from 'ionic-angular/util/util';

/**
 * Generated class for the UserProjectStoryQuizPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-story-quiz',
  templateUrl: 'user-project-story-quiz.html',
})
export class UserProjectStoryQuizPage {
  @ViewChild("contentRef") contentHandle: Content;
  @ViewChild(Slides) slides: Slides;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  project_id;

  projectName: String = "";
  projectMainImage: String = "";

  // storyQuizSlides = [{"options" : "", "value" : ""}];
  storyQuizSlides;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectStoryQuizPage');
    this.project_id = this.navParams.get('project_id');

    let loading = this.commonService.presentLoading();
    this.userService.getProjectParticipation(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data) {
            this.projectName = data.data.project_name;
            this.projectMainImage = data.data.project_main_image;
            this.storyQuizSlides = JSON.parse(data.data.project_story_quiz);

            let index = this.slides.getActiveIndex();
            if(!this.storyQuizSlides[index].value) {
              this.slides.lockSwipeToNext(true);
            } else {
              this.slides.lockSwipeToNext(false);
            }        
          }
          else {
            if(data.message == "project is not proceeding") {
              this.dismiss();
              this.commonService.showBasicAlert('이런! 프로젝트가 이미 종료되었습니다.');
            }
            else if(data.message == "project is max") {
              this.dismiss();
              this.commonService.showBasicAlert('이런! 인원이 초과되었습니다.');
            }
            else if(data.message == "is not approved") {
              this.dismiss();
              this.commonService.showBasicAlert('이런! 조건을 충족하지 못해 이 프로젝트에 참여하실 수 없습니다.');
            }
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    )

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  ionRadioChange(i) {
    if(!this.storyQuizSlides[i].value) {
      this.slides.lockSwipeToNext(true);
    } else {
      this.slides.lockSwipeToNext(false);
    }
  }

  slideChanged() {
    let index = this.slides.getActiveIndex();
    if(this.storyQuizSlides[index] && !this.storyQuizSlides[index].value) {
      this.slides.lockSwipeToNext(true);
    } else {
      this.slides.lockSwipeToNext(false);
    }
  }

  isRightAnswer() {
    for(let storyQuizSlide of this.storyQuizSlides) {
      let value = storyQuizSlide.value;
      for(let option of storyQuizSlide.options) {
        if(value == option.option) {
          if(!option.isApproved) {
            return false;
          }
        }
      }
    }
    return true;
  }

  openUserProjectFeedbackFormPage() {
    console.log(JSON.stringify(this.storyQuizSlides));
    console.log(this.isRightAnswer());
    if(this.isRightAnswer()) {
      this.commonService.showConfirmAlert('정답입니다!<br/>이제 피드백을 작성하러 가볼까요?',
        () => {
          this.navCtrl.push('UserProjectFeedbackFormPage', { "project_id" : this.project_id});          
          this.dismiss();
        }
      );
    }
    else {
      this.commonService.showBasicAlert('이런! 정답이 아닙니다. 스토리를 꼼꼼히 확인하고 다시 시도해주세요.');
      this.dismiss();
    }
  }

  // swipeEvent(e) {
  //   if(e.direction == 16) {
  //     document.querySelector(".slide-question-content .scroll-content")['style'].background = 'transparent';
  //     if(this.contentHandle.scrollTop > -90) {
  //       this.dismiss();
  //     }
  //   }
  // }

  panEnd() {
    if(this.contentHandle.scrollTop <= -90) {
      console.log('pan: ' + this.lastBgV);
      document.querySelector(".slide-question-content .scroll-content")['style'].background = 'transparent';
      this.dismiss();
    }
  }

  scrollingEvent($e) {
    var stepV = $e.scrollTop /10 ;
    this.scrollVert = this.lastScrollV - stepV ;
    if (this.scrollVert < 0) {
       this.scrollVert = 0 ;
    } else {
       if (this.scrollVert > 100)
          this.scrollVert = 100 ;
    }
    if(this.scrollVert < 20) {
      // this.transparentPercent = 1 - (this.scrollVert /20);
      // document.querySelector(".slide-question-content .scroll-content")['style'].background = 'rgba(0,0,0,'+this.transparentPercent+')';
    }
  }
}
