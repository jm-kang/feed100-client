import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { CompanyProjectInterviewDetailPage } from '../company-project-interview-detail/company-project-interview-detail';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyProjectInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-interview',
  templateUrl: 'company-project-interview.html',
})
export class CompanyProjectInterviewPage {
  projectName: String = '프로젝트 이름 프로젝트 이름 프로젝트 이름';
  progressState: String = '2017-09-20 00:00:00';
  totalCompanyInterviewNum: number = 20;
  maxCompanyInterviewNum: number = 30;
  interviews = [
    {
      project_participant_id:1,
      avatar_image: 'assets/img/user-avatar-image.png',
      nickname: '스윙스',
      ordinal: 1,
      project_end_date: '2017-09-18 00:00:00',
      interview_response: false,
    },
    {
      project_participant_id:2,
      avatar_image: 'assets/img/user-avatar-image2.png',
      nickname: '지코',
      ordinal: 2,
      project_end_date: '2017-09-17 00:00:00',
      interview_response: false,
    },
    {
      project_participant_id:3,
      avatar_image: 'assets/img/user-avatar-image3.png',
      nickname: '딘딘',
      ordinal: 3,
      project_end_date: '2017-09-13 00:00:00',
      interview_response: true,
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewDidEnter() {
    // let loading = this.httpService.presentLoading();
    
    // this.httpService.getInterviews()
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.interviews = data.data;
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidEnter();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyInterviewPage');
  }
  
  openCompanyProjectInterviewDetailPage(project_participant_id, progressState) {
    if(progressState == '종료') {
      this.commonService.showBasicAlert('이미 종료된 프로젝트입니다.');
    }
    else {
      this.appCtrl.getRootNavs()[0].push(CompanyProjectInterviewDetailPage, { "project_participant_id" : project_participant_id});
    }
  }
}
