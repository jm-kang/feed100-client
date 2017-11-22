import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the UserProjectReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-report',
  templateUrl: 'user-project-report.html',
})
export class UserProjectReportPage {
  @ViewChild("contentRef") contentHandle: Content;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  // nickname: String = "";
  // avatar_image: String = "";
  // project_report_images = [];
  // project_report_story_summary_content: String = "";
  // project_report_pros_content: String = "";
  // project_report_cons_content: String = "";
  // project_report_overall_opinion_content: String = "";
  // project_report_registration_date: String = "";

  nickname: String = "닉네임";
  avatar_image: String = "assets/img/user-avatar-image2.png";
  project_report_images = [];
  project_report_story_summary_content: String = "";
  project_report_pros_content: String = "프로젝트 좋은 점 프로젝트 좋은 점 프로젝트 좋은 점 프로젝트 좋은 점 프로젝트 좋은 점프로젝트 좋은 점프로젝트 좋은 점 프로젝트 좋은 점프로젝트 좋은 점프로젝트 좋은 점프로젝트 좋은 점프로젝트 좋은 점프로젝트 좋은 점프로젝트 좋은 점프로젝트 좋은 점";
  project_report_cons_content: String = "프로젝트 별로 프로젝트 별로프로젝트 별로프로젝트 별로프로젝트 별로프로젝트 별로프로젝트 별로프로젝트 별로프로젝트 별로프로젝트 별로프로젝트 별로프로젝트 별로v프로젝트 별로 프로젝트 별로 프로젝트 별로 프로젝트 별로 프로젝트 별로 v 프로젝트 별로";
  project_report_overall_opinion_content: String = "프로젝트 총평 프로젝트 총평 프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평ㅍ 프로젝트 총평 ㅍ 프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평프로젝트 총평 프로젝트 총평";
  project_report_registration_date: String = "2017-11-22 00:00:00";


  project_report_is_select: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public photoViewer: PhotoViewer, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectReportPage');
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  photoView(url) {
    this.photoViewer.show(url);
  }

  panEnd() {
    if(this.contentHandle.scrollTop <= -90) {
      console.log('pan: ' + this.lastBgV);
      document.querySelector(".project-user-report-content .scroll-content")['style'].background = 'transparent';
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
      // this.transparentPercent = 1 - (this.scrollVert /20);
      // document.querySelector(".help-page-content .scroll-content")['style'].background = 'rgba(0,0,0,'+this.transparentPercent+')';
    }
  }
}
