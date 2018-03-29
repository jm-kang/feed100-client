import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content } from 'ionic-angular';
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

  interviewQestion: string = "프로젝트 테스트를 진행하면서 가장 불편했던 사항이 무엇이였나요?";
  reward: number;
  textcount: number;

  is_max: boolean = false;

  questionContent: string = "";
  contentPlaceholder: string = '프로젝트에 대해 느낀점을 자세히 이야기해주세요. 성실히 작성된 이야기일수록 높은 공감수와 기업에게 큰 도움을 줍니다.';
  minTextLength: number = 20;
  maxTextLength: number = 100;
  isHelpHide: boolean;

  projectKeywords = ["버튼위치","어려움","파일업로드"];
  helpReferances = ["나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다."]

  group = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectGroupInterviewQuestionEditorPage');
    this.group = this.ModalWrapperPage.modalParams.group;
  }

  ionViewWillEnter() {    
    console.log('ionViewWillEnter CompanyProjectGroupInterviewQuestionEditorPage');
    this.isHelpHide = true;
  }

  completeEditor() {
    if(this.commonService.hasEmoji(this.questionContent)) {
      return false;
    }
    this.questionContent = this.commonService.textAreaFilter(this.questionContent);
    let data = { group: this.group };
    this.ModalWrapperPage.dismissModal(data);
  }

  dismiss() {
    let data = { group: this.group };
    this.ModalWrapperPage.dismissModal(data);
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
    if(count < 20) {return "20자 이상을 입력해주세요!" }
    else if(count <= 100) { return "완료버튼을 눌러 인터뷰를 보내보세요!" }
    else { return "100자 이하로 입력해주세요!" } 
  }

  openInterviewInfo() {
    cordova.ThemeableBrowser.open('https://m.blog.naver.com/feed100_help/221233375208', '_system');
  }
}
