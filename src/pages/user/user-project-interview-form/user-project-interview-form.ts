import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content, Slides } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the UserProjectInterviewFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-interview-form',
  templateUrl: 'user-project-interview-form.html',
})
export class UserProjectInterviewFormPage {
  // @ViewChild('input') myInput ;
  @ViewChild(Slides) slides: Slides;
  firstImpressionScoreNums = [false,false,false,false,false,false,false,false,false,false];

  project_id;

  reward: number;
  totalReward: number;
  textcount: number;

  contentPlaceholder: string = '이 부분을 터치하여 인터뷰 질문에 답변해 주세요.';
  minTextLength: number = 20;
  isHelpHide: boolean;

  firstImpressionScore: number = 0;
  currentSlide: number = 0;

  projectKeywords = ["키워드1","키워드2","키워드3"];
  helpReferances = ["나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다."]

  satisfiedContent = {
    interviewQuestion: "서비스를 경험했을 때 어떤 부분이 가장 매력적이셨나요? 가장 만족스러웠던 부분과 그 이유에 대해 말씀해주세요.",
    answerContent: ""
  }

  unsatisfiedContent = {
    interviewQuestion: "서비스를 경험했을 때 불편사항이나 개선사항이 있던가요? 아쉬웠던 부분과 그 이유에 대해 말씀해주세요.",
    answerContent: ""
  }

  interviewTimeSlide =  {
    "options" : [
      {"option" : "00시 ~ 03시"},
      {"option" : "03시 ~ 06시"},
      {"option" : "06시 ~ 09시"},
      {"option" : "09시 ~ 12시"},
      {"option" : "12시 ~ 15시"},
      {"option" : "15시 ~ 18시"},
      {"option" : "18시 ~ 21시"},
      {"option" : "21시 ~ 24시"},
    ],
    "value" : ""
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectInterviewFormPage');
    this.project_id = this.navParams.get('project_id');
    this.slides.lockSwipeToPrev(true);
    this.slides.lockSwipeToNext(true);

    this.isHelpHide = true;    
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter UserProjectInterviewFormPage');    
  }

  completeEditor() {
    let interviews = [];
    let totalReward = 0;
    switch(this.firstImpressionType()) {
      case 'positive':
        interviews.push({
          'interview_question' : this.satisfiedContent.interviewQuestion,
          'interview_answer' : this.satisfiedContent.answerContent,
          'interview_reward' : this.rewardPoint(this.textCount(this.satisfiedContent.answerContent))
        });
        totalReward += this.rewardPoint(this.textCount(this.satisfiedContent.answerContent));
        break;
      case 'neutral':
        interviews.push({
          'interview_question' : this.satisfiedContent.interviewQuestion,
          'interview_answer' : this.satisfiedContent.answerContent,
          'interview_reward' : this.rewardPoint(this.textCount(this.satisfiedContent.answerContent))
        });
        interviews.push({
          'interview_question' : this.unsatisfiedContent.interviewQuestion,
          'interview_answer' : this.unsatisfiedContent.answerContent,
          'interview_reward' : this.rewardPoint(this.textCount(this.unsatisfiedContent.answerContent))
        });
        totalReward += this.rewardPoint(this.textCount(this.satisfiedContent.answerContent));
        totalReward += this.rewardPoint(this.textCount(this.unsatisfiedContent.answerContent));
        break;
      case 'negative':
        interviews.push({
          'interview_question' : this.unsatisfiedContent.interviewQuestion,
          'interview_answer' : this.unsatisfiedContent.answerContent,
          'interview_reward' : this.rewardPoint(this.textCount(this.unsatisfiedContent.answerContent))
        });
        totalReward += this.rewardPoint(this.textCount(this.unsatisfiedContent.answerContent));
        break;
    }
    this.commonService.showConfirmAlert('작성을 완료하시겠습니까?<br/>작성 후에는 수정할 수 없으며, 부적절한 글 작성시 제재를 받을 수 있습니다.', 
      () => {
        this.commonService.isLoadingActive = true;
        let loading = this.commonService.presentLoading();
        let interviews = [];
        switch(this.firstImpressionType()) {
          case 'positive':
            interviews.push({
              'interview_question' : this.satisfiedContent.interviewQuestion,
              'interview_answer' : this.satisfiedContent.answerContent,
              'interview_reward' : this.rewardPoint(this.textCount(this.satisfiedContent.answerContent))
            });
            break;
          case 'neutral':
            interviews.push({
              'interview_question' : this.satisfiedContent.interviewQuestion,
              'interview_answer' : this.satisfiedContent.answerContent,
              'interview_reward' : this.rewardPoint(this.textCount(this.satisfiedContent.answerContent))
            });
            interviews.push({
              'interview_question' : this.unsatisfiedContent.interviewQuestion,
              'interview_answer' : this.unsatisfiedContent.answerContent,
              'interview_reward' : this.rewardPoint(this.textCount(this.unsatisfiedContent.answerContent))
            });
            break;
          case 'negative':
            interviews.push({
              'interview_question' : this.unsatisfiedContent.interviewQuestion,
              'interview_answer' : this.unsatisfiedContent.answerContent,
              'interview_reward' : this.rewardPoint(this.textCount(this.unsatisfiedContent.answerContent))
            });
            break;
        }

        this.userService.completeParticipationProcess(this.project_id, this.firstImpressionScore, interviews, this.interviewTimeSlide.value)
        .finally(() => {
          loading.dismiss();
        })
        .subscribe(
            (data) => {
            if(data.success == true) {
              if(data.data) {
                this.commonService.showToast('+ ' + totalReward + ' 포인트가 적립되었습니다.');
                this.commonService.showBasicAlert('축하합니다! 프로젝트에 성공적으로 참여했습니다. 안내 내용을 확인해주세요!');
                this.navCtrl.pop({animate: false});                
                this.navCtrl.push('UserProjectHomePage', { "project_id" : this.project_id});          
              }
              else {
                if(data.message == 'project is not proceeding') {
                  this.back();
                  this.commonService.showBasicAlert('이런! 프로젝트가 이미 종료되었습니다.');
                }
                else if(data.message == 'project is exceeded') {
                  this.back();
                  this.commonService.showBasicAlert('이런! 인원이 초과되었습니다.');
                }
              }
            }
            else if(data.success == false) {
              this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
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
    if(this.currentSlideType() == 'unsatisfiedEditor') {
      this.unsatisfiedContent.answerContent = this.unsatisfiedContent.answerContent + keyword;
    }
    if(this.currentSlideType() == 'satisfiedEditor') {
      this.satisfiedContent.answerContent = this.satisfiedContent.answerContent + keyword;
    }
  }

  openUserProjectStoryVerticalPage() {
    let userProjectStoryVerticalModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectStoryVerticalPage', params: { "project_id" : this.project_id }});
    userProjectStoryVerticalModal.present();
  }

  textCount(text: string) {
    if(text == null) return 0;
    
    let temp: any;
    temp = text.replace(/<br *\/?>/gi, '');
    temp = temp.replace(/(?:\r\n|\r|\n|\s)/g, '');
    return temp.length;
  }

  textCountPercent(text: string, maxTextLength) {
    let count = this.textCount(text)
    if(count <= maxTextLength ) {
      return (this.textCount(text) / maxTextLength) * 100;
    } else {
      return 100;
    }
  }

  countColor(count) {
    if(this.firstImpressionType() == "negative" || this.firstImpressionType() == "positive") {
      if(count < 20) { return "#4e4e4c" }
      else if(count < 40) { return "#7a3c8e" }
      else if(count < 60) { return "#23799d" }
      else if(count < 80) { return "#62941b" }
      else if(count < 100) { return "#f59926" }
      else { return "#ce522f" }
    }
    if(this.firstImpressionType() == "neutral") {
      if(count < 20) { return "#4e4e4c" }
      else if(count < 30) { return "#7a3c8e" }
      else if(count < 40) { return "#23799d" }
      else if(count < 50) { return "#62941b" }
      else if(count < 100) { return "#f59926" }
      else { return "#ce522f" }
    }
  }

  pointNotice(count) {
    if(this.firstImpressionType() == "negative" || this.firstImpressionType() == "positive") {
      if(count < 20) {return "20자 이상 입력해주세요!" }
      else if(count < 40) { return "더 많은 포인트를 향하여!" }
      else if(count < 60) { return "좋아요! 잘하고 있어요!" }
      else if(count < 80) { return "필력이 대단하네요!"}
      else if(count < 100) { return "당신의 정성에 감동했어요!" }
      else { return "훌륭해요! 더 이상 바랄게 없어요." }
    }
    if(this.firstImpressionType() == "neutral") {
      if(count < 20) {return "20자 이상 입력해주세요!" }
      else if(count < 30) { return "더 많은 포인트를 향하여!" }
      else if(count < 40) { return "좋아요! 잘하고 있어요!" }
      else if(count < 50) { return "필력이 대단하네요!"}
      else if(count < 100) { return "당신의 정성에 감동했어요!" }
      else { return "훌륭해요! 더 이상 바랄게 없어요." } 
    }
  }

  rewardPoint(count) {
    if(this.firstImpressionType() == "negative" || this.firstImpressionType() == "positive") {
      if(count < 20) { this.reward = 0; }
      else if(count < 100) { this.reward = (Math.floor(count/20))*200; }
      else { this.reward = 1000; }
    }
    if(this.firstImpressionType() == "neutral") {
      if(count < 20) { this.reward = 0; }
      else if(count < 50) { this.reward = (Math.floor(count/10))*100; }
      else { this.reward = 500; }
    }
    this.totalReward = this.totalReward + this.reward;
    return this.reward
  }

  back() {
    this.navCtrl.pop();
  }

  goNextSlide(content) {
    if(this.commonService.hasEmoji(content)) {
      return false;
    }
    this.satisfiedContent.answerContent = this.commonService.textAreaFilter(this.satisfiedContent.answerContent);
    this.unsatisfiedContent.answerContent = this.commonService.textAreaFilter(this.unsatisfiedContent.answerContent);
    
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext(300);
    this.slides.lockSwipeToNext(true);
  }
  goPrevSlide() {
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev(300);
    this.slides.lockSwipeToPrev(true);
  }

  firstImpressionType() {
    if(this.firstImpressionScore < 7) {
      return "negative"
    } else if(this.firstImpressionScore < 9) {
      return "neutral"
    } else {
      return "positive"
    }
  }
  getSlideIndex() {
    this.currentSlide = this.slides.getActiveIndex();
    return this.currentSlide;
  }

  clickImpression(stat:boolean, index:number) {
    for(let i = 0; i < this.firstImpressionScoreNums.length; i++) {
      this.firstImpressionScoreNums[i] = false;
    }
    this.firstImpressionScoreNums[index] = true;
    this.firstImpressionScore = index + 1;
  }
  
  currentSlideType() {
    this.currentSlide = this.slides.getActiveIndex();
    if(this.firstImpressionScore < 7) {
      if(this.currentSlide == 0) {
        return "firstImpressionSelect"
      } else if(this.currentSlide == 1) {
        return "unsatisfiedEditor"
      } else {
        return "interviewTime"
      }
    } else if (this.firstImpressionScore < 9) {
      if(this.currentSlide == 0) {
        return "firstImpressionSelect"
      } else if(this.currentSlide == 1) {
        return "satisfiedEditor"
      } else if(this.currentSlide == 2) {
        return "unsatisfiedEditor"
      } else {
        return "interviewTime"
      }
    } else {
      if(this.currentSlide == 0) {
        return "firstImpressionSelect"
      } else if(this.currentSlide == 1) {
        return "satisfiedEditor"
      } else {
        return "interviewTime"
      }
    }
  }
}
