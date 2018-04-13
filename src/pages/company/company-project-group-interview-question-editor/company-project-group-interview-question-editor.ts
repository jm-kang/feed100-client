import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content, Platform } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

declare var cordova:any;

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from './../../../providers/company-service/company-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the CompanyProjectGroupInterviewQuestionEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-group-interview-question-editor',
  templateUrl: 'company-project-group-interview-question-editor.html',
})
export class CompanyProjectGroupInterviewQuestionEditorPage {
  // @ViewChild('input') myInput ;

  project_id;

  textcount: number;

  questionContent: string = "";
  contentPlaceholder: string = '이 부분을 터치하여 인터뷰 질문을 작성해 주세요.';
  minTextLength: number = 20;
  maxTextLength: number = 100;
  isHelpHide: boolean;

  helpReferances = ["~에 대하여 어떻게 생각하시나요?", "~에 대하여 자세히 말씀해주세요.", "~했던 경험에 대하여 말씀해주세요.", "왜 그렇게 생각하셨나요?"]

  group = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    private platform: Platform,
    private domSanitizer: DomSanitizer) {
      this.initializeBackButtonCustomHandler();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectGroupInterviewQuestionEditorPage');
    this.project_id = this.ModalWrapperPage.modalParams.project_id;
    this.group = this.ModalWrapperPage.modalParams.group;
    
    this.isHelpHide = true;
  }

  ionViewWillEnter() {    
    console.log('ionViewWillEnter CompanyProjectGroupInterviewQuestionEditorPage');
  }

  initializeBackButtonCustomHandler() {
    this.ModalWrapperPage.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
        this.customHandleBackButton();
    }, 10);
  }

  customHandleBackButton() {
    if(this.isHelpHide) {
      this.dismiss();
    } 
    else {
      this.help();
    }
  }

  completeEditor() {      
    if(this.commonService.hasEmoji(this.questionContent)) {
      return false;
    }
    this.commonService.showConfirmAlert('해당 내용으로 인터뷰를 요청하시겠습니까?<br/>작성 후에는 수정하거나 삭제할 수 없습니다.', 
    () => {
      this.commonService.isLoadingActive = true;
      let loading = this.commonService.presentLoading();
      this.questionContent = this.commonService.textAreaFilter(this.questionContent);

      let project_participants_id = this.group.map((participant) => {
        return participant.project_participant_id;
      })
      
      this.companyService.requestGroupInterview(this.project_id, project_participants_id, this.questionContent)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.ModalWrapperPage.dismissModal('complete'); 
            this.commonService.showBasicAlert('전송되었습니다!<br/>답변이 도착하면 알림과 푸시 알림을 통해<br/>알려드리겠습니다.');            
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
            })
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
    this.commonService.showConfirmAlert('취소하실 경우 현재까지 작성한 내용이 저장되지 않습니다. 그래도 취소하시겠습니까?', 
    () => {
      this.ModalWrapperPage.dismissModal();
    });
  }

  help() {
    if(this.isHelpHide) {
      this.isHelpHide = false;
      document.querySelector(".editor-modal .scroll-content")['style'].overflow = 'hidden';
    } else {
      this.isHelpHide = true;
      document.querySelector(".editor-modal .scroll-content")['style'].overflow = 'scroll';
    }
  }

  insertKeyword(keyword) {
    this.questionContent = this.questionContent + keyword;
  }

  textCount(text: string) {
    if(text == null) return 0;
    
    let temp: any;
    temp = text.replace(/<br *\/?>/gi, '');
    temp = temp.replace(/(?:\r\n|\r|\n|\s)/g, '');
    return temp.length;
  }

  textCountPercent(text: string) {
    let count = this.textCount(text)
    if(count <= this.maxTextLength ) {
      return (this.textCount(text) / this.maxTextLength) * 100;
    } else {
      return 100;
    }
  }

  countColor(count) {
    if(count < 20) { return "#4e4e4c" }
    else if(count <= 100) { return "#23799d" }
    else { return "#ce522f" }
  }

  pointNotice(count) {
    if(count < 20) {return "20자 이상 입력해주세요!" }
    else if(count <= 100) { return "질문이 어렵다면 ?를 터치하여 보세요!" }
    else { return "과유불급! 너무 길면 부담을 느껴요!" } 
  }

  openInterviewInfo() {
    cordova.ThemeableBrowser.open('https://m.blog.naver.com/feed100_help/221233375208', '_system');
  }
}
