import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';

import { UserProjectStoryPage } from '../user-project-story/user-project-story';

/**
 * Generated class for the UserProjectParticipationConditionFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-participation-condition-form',
  templateUrl: 'user-project-participation-condition-form.html',
})
export class UserProjectParticipationConditionFormPage {
  @ViewChild(Slides) slides: Slides;

  projectName: String = "프로젝트 이름 프로젝트 이름 프로젝트 이름";
  projectMainImage: String = "assets/img/project-main-image2.png";

  participationConditionSlides = [
    {
      participationConditionQuestion: "이런 조건을 만족하고 싶습니다.",
      participationConditionOptions: [
        {
          participationConditionOption: "첫번째",
        },
        {
          participationConditionOption: "두번째",
        },
        {
          participationConditionOption: "세번째",
        },
        {
          participationConditionOption: "네번째",
        },
        {
          participationConditionOption: "다섯번째",
        },
        {
          participationConditionOption: "여섯번째",
        },
        {
          participationConditionOption: "일곱번째",
        },
        {
          participationConditionOption: "여덟번째",
        }
      ],
      value: "",
    },
    {
      participationConditionQuestion: "두번째 조건은 이것을 만족해야되요.",
      participationConditionOptions: [
        {
          participationConditionOption: "첫번째2",
          
        },
        {
          participationConditionOption: "두번째2",
          
        },
        {
          participationConditionOption: "세번째2",
          
        },
        {
          participationConditionOption: "네번째2",
          
        }
      ],
      value: "",
    },
    {
      participationConditionQuestion: "마지막 조건은 원하시는 것을 골라주세요.",
      participationConditionOptions: [
        {
          participationConditionOption: "첫번째3",
          
        },
        {
          participationConditionOption: "두번째3",
          
        },
        {
          participationConditionOption: "세번째3",
          
        },
        {
          participationConditionOption: "네번째3",
          
        }
      ],
      value: "",
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectParticipationConditionFormPage');
  }

  ionViewDidEnter() {
    let index = this.slides.getActiveIndex();
    if(!this.participationConditionSlides[index].value) {
      this.slides.lockSwipeToNext(true);
    } else {
      this.slides.lockSwipeToNext(false);  
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  // slideChanged() {
  //   if(this.slides.getActiveIndex() == 0) {
  //     if(!this.isFirstQuestionWrited) {
  //       this.slides.lockSwipeToNext(true);  
  //     } else {
  //       this.slides.lockSwipeToNext(false);  
  //     }
  //   }
  //   if(this.slides.getActiveIndex() == 1) {
  //     if(!this.isSecondQuestionWrited) {
  //       this.slides.lockSwipeToNext(true);  
  //     } else {
  //       this.slides.lockSwipeToNext(false);  
  //     }
  //   }
  // }

  ionRadioChange(i) {
    this.slides.lockSwipeToNext(false);
  }

  slideChanged() {
    let index = this.slides.getActiveIndex();
    if(!this.participationConditionSlides[index].value) {
      this.slides.lockSwipeToNext(true);
    } else {
      this.slides.lockSwipeToNext(false);  
    }
  }

  openUserProjectStoryPage() {
    this.navCtrl.push(UserProjectStoryPage);
  }
}
