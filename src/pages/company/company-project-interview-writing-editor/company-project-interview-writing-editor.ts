import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ViewController, ModalController } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the CompanyProjectInterviewWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-interview-writing-editor',
  templateUrl: 'company-project-interview-writing-editor.html',
})
export class CompanyProjectInterviewWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  project_participant_id;
  nickname: String = "";
  ordinal: number = 1;
  interviewContent: String = "";
  contentPlaceholder: String = '20자 이상 작성해야 인터뷰를 보낼 수 있습니다. 요청 후 수정이 불가능하니 신중히 작성해주시기 바랍니다.';
  minTextLength: number = 20;

  interviewImages = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectInterviewWritingEditorPage');
    this.nickname = this.ModalWrapperPage.modalParams.nickname;
    this.project_participant_id = this.ModalWrapperPage.modalParams.project_participant_id;
    this.ordinal = this.ModalWrapperPage.modalParams.ordinal;
  }

  uploadFiles() {
    console.log("uploadFiles()");    
    return new Promise(
      (resolve, reject) => {
        let cnt = this.interviewImages.length;
        if(cnt == 0) {
          resolve();
        }
        for(let i=0; i<this.interviewImages.length; i++) {
          this.commonService.uploadFile(this.interviewImages[i].formData)
          .subscribe(
            (data) => {
              if(data.success == true) {
                this.interviewImages[i] = data.data;
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

  completeEditor() {
    console.log("completeEditor() : 완료 버튼");
    this.commonService.showConfirmAlert('작성을 완료하시겠습니까?<br/>작성 후에는 수정할 수 없습니다.', 
      () => {
        let loading = this.commonService.presentLoading();
        this.uploadFiles()
        .then(() => {
          this.companyService.requestInterview(this.project_participant_id, this.interviewContent, (this.interviewImages.length) ? this.interviewImages : null)
          .finally(() => {
            loading.dismiss();
          })
          .subscribe(
              (data) => {
              if(data.success == true) {
                if(!data.data) {
                  if(data.message == "interview is not available") {
                    this.commonService.showBasicAlert('인터뷰를 요청할 수 있는 기간이 아닙니다.');
                    this.dismiss();
                  }
                  else if(data.message == "interview_num is exceeded") {
                    this.commonService.showBasicAlert('인터뷰 요청 개수가 초과되었습니다.');
                    this.dismiss();
                  }
                }
                else {
                  this.ModalWrapperPage.dismissModal("refresh");
                }
              }
              else if(data.success == false) {
                this.commonService.apiRequestErrorHandler(data, this.navCtrl)
                .then(() => {
                  this.completeEditor();
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

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  sanitize(url: string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  deleteImage(target, i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.interviewImages.splice(i, 1);
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
    this.commonService.selectImage()
    .then(this.commonService.readFile)
    .then((params) => {
      const img = params[0].localURL;
      const formData = params[1];
      this.interviewImages.push({ "img" : img, "formData" : formData });
    });
  }

  openCompanyProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('CompanyProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

  // swipeEvent(e) {
  //   if(e.direction == 16) {
  //     document.querySelector(".editor-modal .scroll-content")['style'].background = 'transparent';
  //     if(this.contentHandle.scrollTop > -90) {
  //       this.dismiss();
  //     }
  //   }
  // }

  panEnd() {
    if(this.contentHandle.scrollTop <= -90) {
      console.log('pan: ' + this.lastBgV);
      document.querySelector(".editor-modal .scroll-content")['style'].background = 'transparent';
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
      // document.querySelector(".editor-modal .scroll-content")['style'].background = 'rgba(0,0,0,'+this.transparentPercent+')';
    }
  }
}
