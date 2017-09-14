import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';

import { UserProjectStoryPage } from '../user-project-story/user-project-story';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

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

  project_id;

  projectName: String = "";
  projectMainImage: String = "";

  participationConditionSlides;

  // participationConditionSlides = [
  //   {
  //     participationConditionQuestion: "이런 조건을 만족하고 싶습니다.",
  //     participationConditionOptions: [
  //       {
  //         participationConditionOption: "첫번째",
  //       },
  //       {
  //         participationConditionOption: "두번째",
  //       },
  //       {
  //         participationConditionOption: "세번째",
  //       },
  //       {
  //         participationConditionOption: "네번째",
  //       },
  //       {
  //         participationConditionOption: "다섯번째",
  //       },
  //       {
  //         participationConditionOption: "여섯번째",
  //       },
  //       {
  //         participationConditionOption: "일곱번째",
  //       },
  //       {
  //         participationConditionOption: "여덟번째",
  //       }
  //     ],
  //     value: "",
  //   },
  //   {
  //     participationConditionQuestion: "두번째 조건은 이것을 만족해야되요.",
  //     participationConditionOptions: [
  //       {
  //         participationConditionOption: "첫번째2",
          
  //       },
  //       {
  //         participationConditionOption: "두번째2",
          
  //       },
  //       {
  //         participationConditionOption: "세번째2",
          
  //       },
  //       {
  //         participationConditionOption: "네번째2",
          
  //       }
  //     ],
  //     value: "",
  //   },
  //   {
  //     participationConditionQuestion: "마지막 조건은 원하시는 것을 골라주세요.",
  //     participationConditionOptions: [
  //       {
  //         participationConditionOption: "첫번째3",
          
  //       },
  //       {
  //         participationConditionOption: "두번째3",
          
  //       },
  //       {
  //         participationConditionOption: "세번째3",
          
  //       },
  //       {
  //         participationConditionOption: "네번째3",
          
  //       }
  //     ],
  //     value: "",
  //   },
  // ];

  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public httpService: HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectParticipationConditionFormPage');
    let loading = this.httpService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.httpService.getProject(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          // this.isLink = (data.data.project_link != null) ? true : false;
          // this.projectMainImage = data.data.project_main_image;
          // this.avatarImage = data.data.avatar_image;
          // this.nickname = data.data.nickname;
          // this.projectName = data.data.project_name;
          // this.projectViewNum = data.data.project_view_num;
          // this.participantNum = data.data.participant_num;
          // this.maxParticipantNum = data.data.max_participant_num;
          // this.progressState = data.data.project_end_date;
          // this.projectSummary = data.data.project_summary;
          // this.projectRegistrationDate = data.data.project_registration_date;
          // this.projectStorySlides = JSON.parse(data.data.project_story);

          // this.totalPageNum = this.projectStorySlides.length + 1;
          this.projectName = data.data.project_name;
          this.projectMainImage = data.data.project_main_image;
          this.participationConditionSlides = JSON.parse(data.data.project_participation_objective_conditions);
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

  ionViewDidEnter() {
    let index = this.slides.getActiveIndex();
    if(!this.participationConditionSlides[index].value) {
      this.slides.lockSwipeToNext(true);
    } else {
      this.slides.lockSwipeToNext(false);  
    }
  }

  dismiss() {
    console.log("dismiss");
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
    this.httpService.projectParticipation(this.project_id, this.participationConditionSlides)
    .subscribe(
        (data) => {
        if(data.success == true) {
          if(data.data) {
            this.httpService.showConfirmAlert('축하합니다! 조건이 충족되어 프로젝트에 참여하실 수 있습니다. 스토리를 자세히 보시고 피드백을 작성해주세요.', 
              () => {
                this.navCtrl.push(UserProjectStoryPage, { "project_id" : this.project_id });
                this.dismiss();
              }
            );
          }
          else {
            this.dismiss();
            this.httpService.showBasicAlert('이런! 아쉽게도 프로젝트 조건을 충족하지 못했습니다. 다른 프로젝트에 참여해주세요.');
          }
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.openUserProjectStoryPage();
          });
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    )
  }
}
