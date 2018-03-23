import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the UserProjectInterviewAnswerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-interview-answer',
  templateUrl: 'user-project-interview-answer.html',
})
export class UserProjectInterviewAnswerPage {
  // @ViewChild('input') myInput ;

  project_id;

  interviewQestion: string = "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십";
  reward: number;
  textcount: number;

  answerContent: string = "";
  contentPlaceholder: string = '프로젝트에 대해 느낀점을 자세히 이야기해주세요. 성실히 작성된 이야기일수록 높은 공감수와 기업에게 큰 도움을 줍니다.';
  minTextLength: number = 20;
  maxTextLength: number = 50;
  isHelpHide: boolean;

  projectKeywords = ["키워드1","키워드2","키워드3"];
  helpReferances = ["나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다."]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectInterviewAnswerPage');
  }

  ionViewWillEnter() {    
    console.log('ionViewWillEnter UserProjectInterviewAnswerPage');
    this.isHelpHide = true;
  }

  completeEditor() {
    if(this.commonService.hasEmoji(this.answerContent)) {
      return false;
    }
    this.answerContent = this.commonService.textAreaFilter(this.answerContent);
    let data = { answerContent: this.answerContent };
    this.ModalWrapperPage.dismissModal(data);
  }

  dismiss() {
    let data = "";
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
    this.answerContent = this.answerContent + keyword;
  }

  openUserProjectStoryVerticalPage() {
    let userProjectStoryVerticalModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectStoryVerticalPage'});
    userProjectStoryVerticalModal.present();
  }

  openUserProjectInterviewDetailPage() {
    let userProjectInterviewDetailModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectInterviewDetailPage'});
    userProjectInterviewDetailModal.present();
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
    if(count < 20) {
      return "#787878"
    } else if(count < 30) {
      return "#4688F1"
    } else if(count < 40) {
      return "#F9BB2D"
    } else if(count < 50) {
      return "#3AA757"
    } else {
      return "#ff6700"
    }
  }

  pointNotice(count) {
    if(count < 20) {
      return "20자 이상을 입력해주세요"
    } else if(count < 30) {
      return "좀만 더 힘내주세요!"
    } else if(count < 40) {
      return "거의 다왔어요!"
    } else if(count < 50) {
      return "힘내라 힘!"
    } else {
      return "완벽해요!"
    }
  }

  rewardPoint(count) {
    if(count < 20) {
      this.reward = 0;
      return 0
    } else if(count < 30) {
      this.reward = 200;
      return 200
    } else if(count < 40) {
      this.reward = 300;
      return 300
    } else if(count < 50) {
      this.reward = 400;
      return 400
    } else {
      this.reward = 500;
      return 500
    }
  }
}
