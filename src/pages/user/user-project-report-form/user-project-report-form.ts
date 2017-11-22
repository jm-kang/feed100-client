import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ViewController, App, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the UserProjectReportFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-report-form',
  templateUrl: 'user-project-report-form.html',
})
export class UserProjectReportFormPage {
  @ViewChild("contentRef") contentHandle: Content;
  @ViewChild(Slides) slides: Slides;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  slideIndex: number = 0;

  isWrited: boolean = true;

  storySummaryContent: String ="";
  prosContent: String = "";
  consContent: String = "";
  overallOpinionContent: String = "";
  isLink: boolean;

  storySummaryContentPlaceholder: String = "";
  prosContentPlaceholder: String = "";
  consContentPlaceholder: String = "";
  overallOpinionContentPlaceholder: String = "";

  project_id;

  projectMainImage: String = "";

  report_form_images = [];
  // length: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    public appCtrl: App,
    private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    length = 0;
    console.log('ionViewDidLoad UserProjectReportFormPage');
    let loading = this.commonService.presentLoading();
    // navParams.get에만 해당되는 값을 넘겨야한다.
    // this.project_id = this.navParams.get('project_id');
    this.project_id = 5;

    this.userService.getProjectParticipation(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data) {
            this.projectMainImage = data.data.project_main_image;
          }
          else {
            if(data.message == "already written report") {
              this.dismiss();
              this.commonService.showBasicAlert('이런! 이미 결과보고서를 작성했습니다..');
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
    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);
    this.isLink = true;
  }

  deleteImage(i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.report_form_images.splice(i, 1);
    this.checkImageNum();
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
    this.commonService.selectImage()
    .then(this.commonService.readFile)
    .then((params) => {
      const img = params[0].localURL;
      const formData = params[1];
      this.report_form_images.push({ "img" : img, "formData" : formData });
      console.log(formData);
      this.checkImageNum();
    });
  }

  checkImageNum() {
    if(this.report_form_images.length >= 2) {
      this.slides.lockSwipeToNext(false);
      this.isWrited = false;
    } else {
      this.slides.lockSwipeToNext(true);
      this.isWrited = true;
    }
  }

  sanitize(url: string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  slideContentCheck() {
    let storySummaryLength = this.textCount(this.storySummaryContent);
    let prosLength = this.textCount(this.prosContent);
    let consLength = this.textCount(this.consContent);
    let overallLength = this.textCount(this.overallOpinionContent);
    this.slideIndex = this.slides.getActiveIndex();

    if((storySummaryLength >= 50 || this.report_form_images.length >= 2) && this.slideIndex == 0) {
      this.slides.lockSwipeToNext(false);
      this.isWrited = false;
      
    } else if(prosLength >= 50 && this.slideIndex == 1) {
      this.slides.lockSwipeToNext(false);
      this.isWrited = false;
      
    } else if(consLength >= 50 && this.slideIndex == 2) {
      this.slides.lockSwipeToNext(false);
      this.isWrited = false;
      
    } else if(overallLength >= 100 && this.slideIndex == 3) {
      this.slides.lockSwipeToNext(false);
      this.isWrited = false;
      
    } else {
      this.slides.lockSwipeToNext(true);
      this.isWrited = true;
    }
  }

  textCount(content:any) {
    let temp: any;
    temp = content.replace(/<br *\/?>/gi, '');
    temp = content.replace(/(?:\r\n|\r|\n|\s)/g, '');
    return temp.length;
  }

  slideChanged() {
    this.isWrited = true;
    this.slideContentCheck();
    if(this.slideIndex != 0) {
      this.slides.lockSwipeToPrev(false);
    } else {
      this.slides.lockSwipeToPrev(true);
    }
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  submit() {
    // 데이터 저장
    this.ModalWrapperPage.dismissModal();
  }

  goNextSlide() {
    this.isWrited = true;
    this.slides.slideNext(500);
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
