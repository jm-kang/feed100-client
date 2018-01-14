import { Component, ViewChild } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ViewController, App, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

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

  participationConditionSlides = [{"options" : "", "value" : ""}];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    public appCtrl: App) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectParticipationConditionFormPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.ModalWrapperPage.modalParams.project_id;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectParticipationConditionFormPage');
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
            this.participationConditionSlides = JSON.parse(data.data.project_participation_objective_conditions);
            
            let index = this.slides.getActiveIndex();
            if(!this.participationConditionSlides[index].value) {
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

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  ionRadioChange(i) {
    if(!this.participationConditionSlides[i].value) {
      this.slides.lockSwipeToNext(true);
    } else {
      this.slides.lockSwipeToNext(false);
    }
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
    this.commonService.isLoadingActive = true;
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
                this.appCtrl.getRootNav().push('UserProjectStoryPage', { "project_id" : this.project_id, "isFeedback" : true });
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
            this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    )
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
