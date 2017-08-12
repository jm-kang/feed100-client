import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-interview',
  templateUrl: 'user-interview.html',
})
export class UserInterviewPage {
  activeAccordion: boolean = false;

  projects = [
    {
      avatarImage: "assets/img/company-avatar-image1.png",
      projectName: "Anchor Labs",
      companyInterviewNum: "2차 인터뷰",
      progressState: "3일 남음",
      isNew:"3",
    },
    {
      avatarImage: "assets/img/company-avatar-image2.png",
      projectName: "Anchor Labs",
      companyInterviewNum: "1차 인터뷰",
      progressState: "1일 남음",
      isNew:"2",
    },
    {
      avatarImage: "assets/img/company-avatar-image3.png",
      projectName: "Anchor Labs",
      companyInterviewNum: "-",
      progressState: "종료",
      isNew:"",
    }
    
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInterviewPage');
  }

  accordion() {
    if(this.activeAccordion) {
      this.activeAccordion = false;
    } else {
      this.activeAccordion = true;
    }
  }

}
