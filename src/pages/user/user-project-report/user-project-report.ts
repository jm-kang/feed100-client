import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

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
  
  project_id;

  nickname: String = "";
  avatar_image: String = "";
  project_report_images = [];
  project_report_story_summary_content: String = "";
  project_report_pros_content: String = "";
  project_report_cons_content: String = "";
  project_report_overall_opinion_content: String = "";
  project_report_registration_date: String = "";
  project_report_is_select: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public photoViewer: PhotoViewer, 
    public ModalWrapperPage: ModalWrapperPage,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectReportPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.ModalWrapperPage.modalParams.project_id;    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectReportPage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getProjectReport(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(!data.data.project_report_registration_date) {
            this.commonService.showBasicAlert('심층 피드백을 작성해주세요!');
            this.dismiss();
          }
          else {
            this.nickname = data.data.nickname;
            this.avatar_image = data.data.avatar_image;
            this.project_report_story_summary_content = data.data.project_report_story_summary_content;
            this.project_report_pros_content = data.data.project_report_pros_content;
            this.project_report_cons_content = data.data.project_report_cons_content;
            this.project_report_overall_opinion_content = data.data.project_report_overall_opinion_content;
            this.project_report_registration_date = data.data.project_report_registration_date;
            this.project_report_is_select = data.data.project_report_is_select;

            this.project_report_images = JSON.parse(data.data.project_report_images);
            for(let j=0; j<this.project_report_images.length; j++) {
              this.project_report_images[j] = {img : this.project_report_images[j]};
            }  
          }
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
    )

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
