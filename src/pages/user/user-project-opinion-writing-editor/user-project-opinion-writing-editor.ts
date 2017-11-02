import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the UserProjectOpinionWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-opinion-writing-editor',
  templateUrl: 'user-project-opinion-writing-editor.html',
})
export class UserProjectOpinionWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  feedback_id;

  opinionContent: String = "";
  minTextLength: number = 20;
  contentPlaceholder: String = '피드백에 대하여 공감 or 비공감 의견글을 작성해주세요.';
  nickname: String = "";
  isEmpathy: boolean;
  opinionImage = "";
  formData;

  tempEmpathy: String = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    private camera: Camera,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public storage: Storage,
     public ModalWrapperPage: ModalWrapperPage,
    private domSanitizer: DomSanitizer) {      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectOpinionWritingEditorPage');
    this.nickname = this.ModalWrapperPage.modalParams.nickname;
    this.feedback_id = this.ModalWrapperPage.modalParams.feedback_id;
  }

  ionViewDidEnter() {    
    this.opinionContent = this.opinionContent.replace(/<br *\/?>/gi, '\n');
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  sanitize(url: string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  deleteImage() {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.opinionImage = "";
    this.formData = "";
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
    this.commonService.selectImage()
    .then(this.commonService.readFile)
    .then((params) => {
      this.opinionImage = params[0].localURL;
      this.formData = params[1];
    });
  }

  uploadFile() {
    return new Promise(
      (resolve, reject) => {
        if(!this.formData) {
          resolve();
        }
        else {        
          this.commonService.uploadFile(this.formData)
          .subscribe(
            (data) => {
              if(data.success == true) {
                this.opinionImage = data.data;
                resolve();
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

  registerOpinion() {
    let loading = this.commonService.presentLoading();
    this.uploadFile()
    .then(() => {
      this.userService.registerOpinion(this.feedback_id, this.isEmpathy, this.opinionContent, (this.opinionImage) ? [this.opinionImage] : null)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            if(data.message == 'opinion is already writed') {
              this.commonService.showBasicAlert('이미 토론에 참여했습니다.');
              this.dismiss();
            }
            else if(data.message == 'project is not proceeding') {
              this.commonService.showBasicAlert('이미 종료된 프로젝트입니다.');
              this.dismiss();
            }
            else {
              this.commonService.showBasicAlert('성공적으로 등록되었습니다.');
              this.dismiss();
            }
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.registerOpinion();
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

  changeEmpathyRadio() {
    console.log(this.tempEmpathy);
    if(this.tempEmpathy == "empathy") {
      this.isEmpathy = true;
      console.log(this.isEmpathy);
    } else {
      this.isEmpathy = false;
      console.log(this.isEmpathy);
    }
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
