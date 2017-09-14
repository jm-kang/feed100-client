import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { UserProjectFeedbackPage } from '../user-project-feedback/user-project-feedback';
import { UserProjectHistoryPage } from '../user-project-history/user-project-history';
import { UserProjectInterviewDetailPage } from '../user-project-interview-detail/user-project-interview-detail';
import { UserProjectFeedbackListPage } from '../user-project-feedback-list/user-project-feedback-list';

import { StatusBar } from '@ionic-native/status-bar';


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

  projectName: String = "프로젝트 이름 프로젝트 이름 프로젝트 이름 프로젝트 이름 프로젝트 이름";
  avatarImage: String = "assets/img/user-avatar-image.png";
  nickname: String = "스윙스";
  level: number = 1;
  levelClass: String = "연구원";
  maxHeight: any =  "";
  maxWidth: any =  "";
  height: any =  "";
  width: any =  "";
  left: any =  "";
  top: any =  "";
  maxOpinionPoint: number = 5000;
  isBest: boolean = true;

  empathyNum: number = 5;
  nonEmpathyNum: number = 2;
  
  feedbackNum: number = 17;
  myOpinionNum: number = 8;

  totalInterviewNum: number = 2;
  interviewNum: number = 2;

  projectPoint: number = 20000;
  feedbackPoint: number = 1500;
  opinionPoint: number = 300;
  interviewPoint: number = 5000;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public statusBar: StatusBar,
  ) {}
  
  back() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectSideMenuPage');
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

  onAvatarImageLoad(img) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;

    console.log("img : (" + img.width + " * " + img.height + ")");

    if(img.width/16 >= img.height/9) {
      tempHeight = img.width*9/16 + 'px';
      tempWidth = 'auto';
      tempTop = 'initial';
      tempLeft = "-" + (img.width-img.height*16/9)/2  + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      tempWidth = img.height*16/9 + 'px';
      tempHeight = 'auto';
      tempLeft = 'initial';
      tempTop = "-" + (img.height-img.width*9/16)/2 + 'px';
      tempMaxWidth = '100%';
      tempMaxHeight = 'initial';
    }
    this.width = tempWidth;
    this.height = tempHeight;
    this.left = tempLeft;
    this.top = tempTop;
    this.maxHeight = tempMaxHeight;
    this.maxWidth = tempMaxWidth;
  }

  openProjectFeedbackPage() {
    this.navCtrl.push(UserProjectFeedbackPage);
  }

  openProjectFeedbackListPage() {
    this.navCtrl.push(UserProjectFeedbackListPage);
  }

  openProjectInterviewDetailPage() {
    this.navCtrl.push(UserProjectInterviewDetailPage);
  }

}
