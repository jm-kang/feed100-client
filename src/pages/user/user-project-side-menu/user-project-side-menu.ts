import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { UserProjectFeedbackPage } from '../user-project-feedback/user-project-feedback';
import { UserProjectInterviewDetailPage } from '../user-project-interview-detail/user-project-interview-detail';
import { UserProjectFeedbackListPage } from '../user-project-feedback-list/user-project-feedback-list';

import { StatusBar } from '@ionic-native/status-bar';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserProjectSideMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-side-menu',
  templateUrl: 'user-project-side-menu.html',
})
export class UserProjectSideMenuPage {
  @ViewChild("contentRef") contentHandle: Content;

  project_id;
  feedback_id;

  projectName: String = "";
  avatarImage: String = "";
  nickname: String = "";
  level: number = 1;
  levelClass: String = "";
  maxHeight: any =  "";
  maxWidth: any =  "";
  height: any =  "";
  width: any =  "";
  left: any =  "";
  top: any =  "";
  isBest: boolean = false;

  empathyNum: number = 0;
  nonEmpathyNum: number = 0;
  
  feedbackNum: number = 0;
  myOpinionNum: number = 0;

  completedInterviewNum: number = 0;
  interviewNum: number = 0;

  feedbackReward: number = 1000;
  opinionReward: number = 100;
  interviewReward: number = 1000;
  bestFeedbackReward: number = 10000;

  feedbackPoint: number = 0;
  opinionPoint: number = 0;
  maxOpinionPoint: number = 0;
  interviewPoint: number = 0;
  projectPoint: number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public statusBar: StatusBar,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }
  
  back() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectSideMenuPage');
    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.userService.getSideMenuData(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectName = data.data.project.project_name;
          this.avatarImage = data.data.avatar_image;
          this.nickname = data.data.nickname;
          this.level = data.data.level;
          this.levelClass = data.data.levelClass;
          this.isBest = data.data.feedback.is_best;
          this.empathyNum = data.data.feedback.empathy_num;
          this.nonEmpathyNum = data.data.feedback.non_empathy_num;
          this.feedbackNum = data.data.project.participant_num;
          this.myOpinionNum = data.data.my_opinion_num;
          this.completedInterviewNum = data.data.project.completed_interview_num;
          this.interviewNum = data.data.project.interview_num;

          this.feedback_id = data.data.feedback.project_participant_id;

          this.feedbackPoint = this.feedbackReward + ((this.isBest) ? this.bestFeedbackReward : 0);
          this.opinionPoint = this.opinionReward * this.myOpinionNum;
          this.maxOpinionPoint = this.opinionReward * this.feedbackNum;
          this.interviewPoint = this.interviewReward * this.completedInterviewNum;
          this.projectPoint = this.feedbackPoint + this.opinionPoint + this.interviewPoint;
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
    );

  }

  scrollingFun(e) {
    if (e.scrollTop < 30) {
      // console.log("top: " + e.scrollingFun);
      document.querySelector(".side-menu-header")['style'].background = 'transparent';
      document.querySelector(".side-menu-header")['style'].borderBottom = '0';
      document.querySelector(".side-menu-header .pop-button ion-icon")['style'].color = '#fff';
      document.querySelector(".side-menu-header .project-header-title")['style'].color = '#fff';
    } else {
      // console.log("bottom: " + e.scrollingFun);
      document.querySelector(".side-menu-header")['style'].background = '#fff';
      document.querySelector(".side-menu-header")['style'].borderBottom = '0.55px solid #e8e8e8';
      document.querySelector(".side-menu-header .pop-button ion-icon")['style'].color = '#787878';
      document.querySelector(".side-menu-header .project-header-title")['style'].color = '#383838';
    }
  }

  openProjectFeedbackPage() {
    this.navCtrl.push(UserProjectFeedbackPage, { "project_id" : this.project_id, "feedback_id" : this.feedback_id });
  }

  openProjectFeedbackListPage() {
    this.navCtrl.push(UserProjectFeedbackListPage, { "project_id" : this.project_id });
  }

  openProjectInterviewDetailPage() {
    this.navCtrl.push(UserProjectInterviewDetailPage, { "project_id" : this.project_id });
  }

}
