import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ViewController } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the UserProjectInterviewWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-interview-writing-editor',
  templateUrl: 'user-project-interview-writing-editor.html',
})
export class UserProjectInterviewWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  projectName: String = "";
  interview_id;
  interview_response: String = "";
  contentPlaceholder: String = ' 작성 후 수정할 수 없습니다. 신중히 작성해주세요.';
  minTextLength: number = 20;
  isFold: boolean = true;

  interview_request: String = "";

  interview_request_images = [];
  
  interview_response_images = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private photoViewer: PhotoViewer,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectInterviewWritingEditorPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectInterviewWritingEditorPage');
    this.projectName = this.ModalWrapperPage.modalParams.projectName;
    this.interview_id = this.ModalWrapperPage.modalParams.interview_id;
    this.interview_request = this.ModalWrapperPage.modalParams.interview_request;
    let temp_interview_request_images = this.ModalWrapperPage.modalParams.interview_request_images;
    for(let i=0; temp_interview_request_images && i<temp_interview_request_images.length; i++) {
      temp_interview_request_images[i] = { "img" : temp_interview_request_images[i].img };
    }
    this.interview_request_images = temp_interview_request_images;
  }

  uploadFiles() {
    console.log("uploadFiles()");    
    return new Promise(
      (resolve, reject) => {
        let cnt = this.interview_response_images.length;
        if(cnt == 0) {
          resolve();
        }
        for(let i=0; i<this.interview_response_images.length; i++) {
          this.commonService.uploadFile(this.interview_response_images[i].formData)
          .subscribe(
            (data) => {
              if(data.success == true) {
                this.interview_response_images[i] = data.data;
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
    let loading = this.commonService.presentLoading();
    this.uploadFiles()
    .then(() => {
      this.userService.responseInterview(this.interview_id, this.interview_response, (this.interview_response_images.length) ? this.interview_response_images : null)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
          (data) => {
          if(data.success == true) {
            this.dismiss();      
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
      );
    });
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }
  
  sanitize(url: string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  photoView(url) {
    this.photoViewer.show(url);
  }

  fold() {
    if(this.isFold) {
      this.isFold = false;
    } else {
      this.isFold = true;
    }
  }

  deleteImage(i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.interview_response_images.splice(i, 1);
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
    this.commonService.selectImage()
    .then(this.commonService.readFile)
    .then((params) => {
      const img = params[0].localURL;
      const formData = params[1];
      this.interview_response_images.push({ "img" : img, "formData" : formData });
    });
  }

  swipeEvent(e) {
    if(e.direction == 16) {
      document.querySelector(".editor-modal .scroll-content")['style'].background = 'transparent';
      if(this.contentHandle.scrollTop > -90) {
        this.dismiss();
      }
    }
  }

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
      this.transparentPercent = 1 - (this.scrollVert /20);
      document.querySelector(".editor-modal .scroll-content")['style'].background = 'rgba(0,0,0,'+this.transparentPercent+')';
    }
  }

}
