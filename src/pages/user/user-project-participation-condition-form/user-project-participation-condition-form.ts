import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';

import { UserProjectStoryPage } from '../user-project-story/user-project-story';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

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

  participationConditionSlides = [{"options" : "", "value" : ""}];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectParticipationConditionFormPage');
    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

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
            this.participationConditionSlides = JSON.parse(data.data.project_participation_objective_conditions);
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

  ionRadioChange(i) {
    this.slides.lockSwipeToNext(false);
  }

  slideChanged() {
    let index = this.slides.getActiveIndex();
    if(this.participationConditionSlides[index] && !this.participationConditionSlides[index].value) {
      this.slides.lockSwipeToNext(true);
    } else {
      this.slides.lockSwipeToNext(false);
    }
  }

  openUserProjectStoryPage() {
    let loading = this.commonService.presentLoading();

    this.userService.projectParticipation(this.project_id, this.participationConditionSlides)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
        (data) => {
        if(data.success == true) {
          if(data.data) {
            this.commonService.showConfirmAlert('축하합니다! 조건이 충족되어 프로젝트에 참여하실 수 있습니다. 스토리를 자세히 보시고 피드백을 작성해주세요.',
              () => {
                this.navCtrl.push(UserProjectStoryPage, { "project_id" : this.project_id, "isFeedback" : true });
                this.dismiss();
              }
            );
          }
          else {
            this.dismiss();
            this.commonService.showBasicAlert('이런! 아쉽게도 프로젝트 조건을 충족하지 못했습니다. 다른 프로젝트에 참여해주세요.');
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.openUserProjectStoryPage();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    )
  }
}
