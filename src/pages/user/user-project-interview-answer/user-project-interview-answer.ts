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
  project_participant_id;
  interview_id;

  interviewQuestion;
  is_max;

  // interviewQuestion: string = "프로젝트 테스트를 진행하면서 가장 불편했던 사항이 무엇이였나요?";
  reward: number;
  textcount: number;

  // is_max: boolean = false;

  answerContent: string = "";
  contentPlaceholder: string = '이 부분을 터치하여 인터뷰 질문에 답변해 주세요.';
  minTextLength: number = 20;
  maxTextLength: number = 50;
  isHelpHide: boolean;

  projectKeywords = ["버튼위치","어려움","파일업로드"];
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
    this.project_id = this.ModalWrapperPage.modalParams.project_id;    
    this.project_participant_id = this.ModalWrapperPage.modalParams.project_participant_id;
    
    this.isHelpHide = true;
  }

  ionViewWillEnter() {    
    console.log('ionViewWillEnter UserProjectInterviewAnswerPage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getInterview(this.project_participant_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.interview_id = data.data.interview_id;
          this.interviewQuestion = data.data.interview_question;
          this.is_max = data.data.is_max;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  completeEditor() {
    if(this.commonService.hasEmoji(this.answerContent)) {
      return false;
    }
    this.commonService.showConfirmAlert('작성을 완료하시겠습니까?<br>작성 후에는 수정할 수 없으며,<br>부적절한 글을 작성할 경우 삭제 및 프로젝트에서 제외될 수 있습니다.', 
      () => {
        this.commonService.isLoadingActive = true;
        let loading = this.commonService.presentLoading();
        this.answerContent = this.commonService.textAreaFilter(this.answerContent);
        
        this.userService.answerInterview(this.project_id, this.project_participant_id, this.interview_id, this.answerContent, this.reward)
        .finally(() => {
          loading.dismiss();
        })
        .subscribe(
            (data) => {
            if(data.success == true) {
              if(this.is_max) {
                this.commonService.showToast('우수 참여자로 선정될 가능성이 높아졌어요!');
              }
              else {
                this.commonService.showToast('+ ' + this.reward + ' 포인트가 적립되었습니다.');
              }
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
        );

      }
    );
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal("cancel");
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
    let userProjectStoryVerticalModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectStoryVerticalPage', params: { "project_id" : this.project_id }});
    userProjectStoryVerticalModal.present();
  }

  openUserProjectInterviewDetailPage() {
    let userProjectInterviewDetailModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectInterviewDetailPage', params: { "project_participant_id" : this.project_participant_id }});
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
    if(count < 20) { return "#4e4e4c" }
    else if(count < 30) { return "#7a3c8e" }
    else if(count < 40) { return "#23799d" }
    else if(count < 50) { return "#62941b" }
    else if(count < 100) { return "#f59926" }
    else { return "#ce522f" }
  }

  pointNotice(count) {
    if(count < 20) {return "20자 이상 입력해주세요!" }
    else if(count < 30) { return "더 많은 포인트를 향하여!" }
    else if(count < 40) { return "좋아요! 잘하고 있어요!" }
    else if(count < 50) { return "필력이 대단하네요!"}
    else if(count < 100) { return "당신의 정성에 감동했어요!" }
    else { return "훌륭해요! 더 이상 바랄게 없어요." } 
  }

  rewardPoint(count) {
    if(count < 20) { this.reward = 0; }
    else if(count < 50) { this.reward = (Math.floor(count/10))*100; }
    else { this.reward = 500; }
    return this.reward;
  }
}
