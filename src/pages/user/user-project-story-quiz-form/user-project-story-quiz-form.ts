import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ViewController, App, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { isRightSide } from 'ionic-angular/util/util';

/**
 * Generated class for the UserProjectStoryQuizFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-story-quiz-form',
  templateUrl: 'user-project-story-quiz-form.html',
})
export class UserProjectStoryQuizFormPage {
  @ViewChild("contentRef") contentHandle: Content;
  @ViewChild(Slides) slides: Slides;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  project_id;

  // projectName: String = "";
  // projectMainImage: String = "";

  // isMultiCheck : 중복선택 질문인지
  // storyQuizSlides =  [{"isMultiCheck": true,"question" : "","options" : [{"option" : "a"},{"option" : "d"},{"option" : "c"},{"option" : "b"},{"option" : "e"}], "value" : ""}];
  projectName;
  projectMainImage;
  storyQuizSlides = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectStoryQuizFormPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectStoryQuizFormPage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getProject(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectName = data.data.project_name;
          this.projectMainImage = data.data.project_main_image;
          this.storyQuizSlides = JSON.parse(data.data.project_story_quiz);
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

  goNextSlide() {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext(300);
    this.slides.lockSwipeToNext(true);
  }

  ionRadioChange(i) {
    // if(!this.storyQuizSlides[i].value) {
    //   this.slides.lockSwipeToNext(true);
    // } else {
    //   this.slides.lockSwipeToNext(false);
    // }
  }

  slideChanged() {
    // let index = this.slides.getActiveIndex();
    // if(this.storyQuizSlides[index] && !this.storyQuizSlides[index].value) {
    //   this.slides.lockSwipeToNext(true);
    // } else {
    //   this.slides.lockSwipeToNext(false);
    // }
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

  openUserProjectInterviewForm() {
    console.log(JSON.stringify(this.storyQuizSlides));
    console.log(this.isRightAnswer());
    if(this.isRightAnswer()) {
      this.commonService.showConfirmAlert('정답입니다!<br/>이제 피드백을 작성하러 가볼까요?',
        () => {
          this.commonService.isLoadingActive = true;    
          let loading = this.commonService.presentLoading();
          
          this.userService.checkProcessQuiz(this.project_id)
          .finally(() => {
            loading.dismiss();
          })
          .subscribe(
            (data) => {
              if(data.success == true) {                      
                if(data.data) {
                  this.navCtrl.pop({animate: false});
                  this.navCtrl.pop({animate: false});                
                  this.navCtrl.push('UserProjectInterviewFormPage', { "project_id" : this.project_id});          
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
                }
              }
              else if(data.success == false) {
                this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
              }
            },
            (err) => {
              console.log(err);
              this.commonService.showBasicAlert('오류가 발생했습니다.');
            }
          )
        }
      );
    }
    else {
      this.commonService.showBasicAlert('이런! 정답이 아닙니다. 스토리를 꼼꼼히 확인하고 다시 시도해주세요.');
      this.back();
    }
  }

}
