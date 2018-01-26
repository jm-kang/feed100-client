import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ViewController, App, Content, Platform } from 'ionic-angular';

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
  isLink;

  storySummaryContentPlaceholder: String = "";
  prosContentPlaceholder: String = "";
  consContentPlaceholder: String = "";
  overallOpinionContentPlaceholder: String = "";

  project_id;

  projectMainImage: String = "";

  project_report_images = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    public appCtrl: App,
    public platform: Platform,
    private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectReportFormPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.ModalWrapperPage.modalParams.project_id;    
    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectReportFormPage');
    let loading = this.commonService.presentLoading();

    this.userService.getProjectReport(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data.project_report_registration_date) {
            this.commonService.showBasicAlert('이미 심층 피드백을 작성하셨습니다!');
            this.dismiss();
          }
          if(this.platform.is('android')) {
            this.isLink = (data.data.project_android_link) ? true : false; 
          }
          else if(this.platform.is('ios')) {
            this.isLink = (data.data.project_ios_link) ? true : false;
          }
          this.projectMainImage = data.data.project_main_image;
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

  deleteImage(i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.project_report_images.splice(i, 1);
    this.checkImageNum();
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
    this.commonService.selectImage()
    .then(this.commonService.readFile)
    .then((params) => {
      const img = params[0].localURL;
      const formData = params[1];
      this.project_report_images.push({ "img" : img, "formData" : formData });
      console.log(formData);
      this.checkImageNum();
    });
  }

  checkImageNum() {
    if(this.project_report_images.length >= 2) {
      // this.slides.lockSwipeToNext(false);
      this.isWrited = false;
    } else {
      // this.slides.lockSwipeToNext(true);
      this.isWrited = true;
    }
  }

  sanitize(url: string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  // textCount(content:any) {
  //   let temp: any;
  //   temp = content.replace(/<br *\/?>/gi, '');
  //   temp = content.replace(/(?:\r\n|\r|\n|\s)/g, '');
  //   return temp.length;
  // }

  slideChanged() {
    let index = this.slides.getActiveIndex();
    switch(index) {
      case 0:
        this.slides.lockSwipeToPrev(true);
        break;
      case 1:
      case 2:
      case 3:
        this.slides.lockSwipeToPrev(false);
      default:
        break;
    }
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  uploadFiles() {
    console.log("uploadFiles()");    
    return new Promise(
      (resolve, reject) => {
        let cnt = this.project_report_images.length;
        if(cnt == 0) {
          resolve();
        }
        for(let i=0; i<this.project_report_images.length; i++) {
          this.commonService.uploadFile(this.project_report_images[i].formData)
          .subscribe(
            (data) => {
              if(data.success == true) {
                this.project_report_images[i] = data.data;
                cnt--;
                if(cnt == 0) {
                  resolve();
                }
              }
              else if(data.success == false) {
                this.commonService.apiRequestErrorHandler(data, this.navCtrl)
                .then(() => {
                  this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
                });
              }
            }
          )
        }
      }
    )
  }

  submit() {
    if(this.commonService.hasEmoji(this.overallOpinionContent)) {
      return false;
    }
    this.commonService.showConfirmAlert('작성을 완료하시겠습니까?<br/>작성 후에는 수정할 수 없으며, 부적적한 글 작성시 제재를 받을 수 있습니다.',
      () => {
        this.commonService.isLoadingActive = true;
        let loading = this.commonService.presentLoading();
        this.uploadFiles()
        .then(() => {
          this.storySummaryContent = this.commonService.textAreaFilter(this.storySummaryContent);
          this.prosContent = this.commonService.textAreaFilter(this.prosContent);
          this.consContent = this.commonService.textAreaFilter(this.consContent);
          this.overallOpinionContent = this.commonService.textAreaFilter(this.overallOpinionContent);
          this.userService.writeProjectReport(this.project_id, (this.project_report_images.length) ? this.project_report_images : null, this.storySummaryContent, this.prosContent, this.consContent, this.overallOpinionContent)
          .finally(() => {
            loading.dismiss();
          })
          .subscribe(
              (data) => {
              if(data.success == true) {
                this.commonService.showBasicAlert('성공적으로 작성되었습니다.');
                this.ModalWrapperPage.dismissModal("refresh");                
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
        });
      }
    );
  }

  goNextSlide(content) {
    // console.log(content);
    if(this.commonService.hasEmoji(content)) {
      return false;
    }
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext(500);
    this.slides.lockSwipeToNext(true);
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
