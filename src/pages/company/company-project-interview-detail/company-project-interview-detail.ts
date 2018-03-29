import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, ActionSheetController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

declare var cordova:any;

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

/**
 * Generated class for the CompanyProjectInterviewDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-interview-detail',
  templateUrl: 'company-project-interview-detail.html',
})
export class CompanyProjectInterviewDetailPage {
  @ViewChild(Content) content: Content;
  project_participant_id;
  isHelpHide: boolean;
  nickname: String = "에반스";
  totalInterviewNum: number = 1;
  minTextLength: number = 20;
  maxTextLength: number = 100;

  questionInterview: string = "";
  projectKeywords = ["버튼위치","어려움","파일업로드","버튼위치","어려움","파일업로드"];
  helpReferances = ["나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다.", "나는 이런 문장이 마음에 든다."]

  interviews = [
    {
      project_name: "프로젝트 제목",
      interview_request_registration_date: "2018-03-25 00:00:00",
      interview_request: "뭐가 제일 만족스러웠나요요?????????",
      project_id: 1,
      project_participant_id: 1,
      interview_id: 1,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "고거시",
      interview_response_registration_date: "2018-03-27 00:00:00",
      interview_response: "나의 대답을 받아라! 만족한걸 만족했다! 만족했나?",
      isLike: false,
    },
    {
      project_name: "프로젝트 제목",
      interview_request_registration_date: "2018-03-25 00:00:00",
      interview_request: "뭐가 제일 만족스러웠나요요?????????",
      project_id: 1,
      project_participant_id: 1,
      interview_id: 1,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "고거시",
      interview_response_registration_date: "2018-03-27 00:00:00",
      interview_response: "나의 대답을 받아라! 만족한걸 만족했다! 만족했나?",
      isLike: false,
    },
    {
      project_name: "프로젝트 제목",
      interview_request_registration_date: "2018-03-25 00:00:00",
      interview_request: "뭐가 제일 만족스러웠나요요?????????",
      project_id: 1,
      project_participant_id: 1,
      interview_id: 1,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "고거시",
      interview_response_registration_date: "2018-03-27 00:00:00",
      interview_response: "나의 대답을 받아라! 만족한걸 만족했다! 만족했나?",
      isLike: false,
    },
    {
      project_name: "프로젝트 제목",
      interview_request_registration_date: "2018-03-25 00:00:00",
      interview_request: "뭐가 제일 만족스러웠나요요?????????",
      project_id: 1,
      project_participant_id: 1,
      interview_id: 1,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "고거시",
      interview_response_registration_date: "2018-03-27 00:00:00",
      interview_response: "나의 대답을 받아라! 만족한걸 만족했다! 만족했나?",
      isLike: false,
    },
    {
      project_name: "프로젝트 제목",
      interview_request_registration_date: "2018-03-25 00:00:00",
      interview_request: "뭐가 제일 만족스러웠나요요?????????",
      project_id: 1,
      project_participant_id: 1,
      interview_id: 1,
      avatar_image: "./../../assets/img/user-avatar-image-man1.png",
      nickname: "고거시",
      interview_response_registration_date: "2018-03-27 00:00:00",
      interview_response: "나의 대답을 받아라! 만족한걸 만족했다! 만족했나?",
      isLike: false,
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectInterviewDetailPage');
    this.commonService.isLoadingActive = true;
    this.project_participant_id = this.navParams.get('project_participant_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectInterviewDetailPage');
    this.isHelpHide = true;
    // let loading = this.commonService.presentLoading();
    
    // this.companyService.getInterview(this.project_participant_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.nickname = data.data.nickname;
    //       this.totalInterviewNum = data.data.total_interview_num;
    //       this.maxInterviewNum = data.data.max_interview_num;
    //       this.isAvailable = data.data.is_available;
    //       let tempInterviews = data.data.interviews;
          
    //       for(let i=0; i<tempInterviews.length; i++) {
    //         if(tempInterviews[i].interview_request_images) {
    //           tempInterviews[i].interview_request_images = JSON.parse(tempInterviews[i].interview_request_images);
    //           for(let j=0; j<tempInterviews[i].interview_request_images.length; j++) {
    //             tempInterviews[i].interview_request_images[j] = { img : tempInterviews[i].interview_request_images[j]}; 
    //           }
    //         }
    //         if(tempInterviews[i].interview_response_images) {
    //           tempInterviews[i].interview_response_images = JSON.parse(tempInterviews[i].interview_response_images);
    //           for(let j=0; j<tempInterviews[i].interview_response_images.length; j++) {
    //             tempInterviews[i].interview_response_images[j] = { img : tempInterviews[i].interview_response_images[j]}; 
    //           }
    //         }
    //       }
    //       this.interviews = tempInterviews;
          setTimeout(() => {
            this.content.scrollToBottom();
          }, 500);
    //     }
    //     else if(data.success == false) {
    //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewWillEnter();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.commonService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );
  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  reportInterview(project_id, project_participant_id, feedback_id, opinion_id, interview_id, report_id) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '신고하기',
          role: 'destructive',
          handler: () => {
            this.commonService.showConfirmAlert('해당 내용을 부적절한<br>게시글로 신고하시겠습니까?', 
            () => {
              this.commonService.isLoadingActive = true;
              let loading = this.commonService.presentLoading();
              
              this.companyService.reportProject(project_id, project_participant_id, feedback_id, opinion_id, interview_id, report_id)
              .finally(() => {
                loading.dismiss();
              })
              .subscribe(
                (data) => {
                  if(data.success == true) {
                    this.commonService.showBasicAlert('신고가 접수되었습니다.');
                  }
                  else if(data.success == false) {
                    if(data.message == 'already reported') {
                      this.commonService.showBasicAlert('이미 신고가 접수되었습니다.');
                    }
                    else {
                      this.commonService.apiRequestErrorHandler(data, this.navCtrl)
                      .then(() => {
                        this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
                      });
                    }
                  }
                },
                (err) => {
                  console.log(err);
                  this.commonService.showBasicAlert('오류가 발생했습니다.');
                }
              );    
            });        
          }
        },{
          text: '취소하기',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  back() {
    this.navCtrl.pop();
  }

  clickLike(interview) {
    if(interview.isLike) {
      interview.isLike = false;
    } else {
      interview.isLike = true;
    }
  }

  sendInterview() {

  }

  help() {
    if(this.isHelpHide) {
      this.isHelpHide = false;
      document.querySelector(".scroll-content")['style'].overflow = 'hidden';
    } else {
      this.isHelpHide = true;
      document.querySelector(".scroll-content")['style'].overflow = 'scroll';
    }
  }

  textCount(text: string) {
    if(text == null) return 0;
    
    let temp: any;
    temp = text.replace(/<br *\/?>/gi, '');
    temp = temp.replace(/(?:\r\n|\r|\n|\s)/g, '');
    return temp.length;
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

  insertKeyword(keyword) {
    this.questionInterview = this.questionInterview + keyword;
  }
  
  openCompanyProjectInterviewWritingEditorPage() {
    let companyProjectInterviewWritingEditorModal = this.modalCtrl.create('ModalWrapperPage',
      { page: 'CompanyProjectInterviewWritingEditorPage', 
        params: {
          "nickname" : this.nickname,
          "project_participant_id" : this.project_participant_id,
          "ordinal" : this.interviews.length + 1
        }
    });
    companyProjectInterviewWritingEditorModal.present();
    companyProjectInterviewWritingEditorModal.onWillDismiss(
      (data) => {
        if(data == "refresh") {
          this.ionViewWillEnter();  
        }
      }
    );
  }

  openInterviewInfo() {
    cordova.ThemeableBrowser.open('https://m.blog.naver.com/feed100_help/221233375208', '_system');
  }
}
