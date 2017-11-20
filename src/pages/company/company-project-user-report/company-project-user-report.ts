import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the CompanyProjectUserReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-user-report',
  templateUrl: 'company-project-user-report.html',
})
export class CompanyProjectUserReportPage {
  userReports = [
    {
      nickname: "닉네임",
      avatar_image: "assets/img/user-avatar-image.png",
      report_form_images: [{ img : "assets/img/feedback-image1.jpeg", formData : "formData" }, { img : "assets/img/feedback-image2.jpeg", formData : "formData" }],
      story_summary_content: "",
      pros_content: "프로젝트 서비스 장점 프로젝트 서비스 장점 프로젝트 서비스 장점프로젝트 서비스 장점프로젝트 서비스 장점 프로젝트 서비스 장점 프로젝트 서비스 장점 프로젝트 서비스 장점프로젝트 서비스 장점",
      cons_content: "프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점",
      overall_opinion_content: "프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평",
      report_registration_date: "2017-11-01 00:00:00",
      isSelection: true,
      project_participant_id: 1,
    },
    {
      nickname: "닉네임",
      avatar_image: "assets/img/user-avatar-image.png",
      report_form_images: [{ img : "assets/img/feedback-image1.jpeg", formData : "formData" }],
      story_summary_content: "",
      pros_content: "프로젝트 서비스 장점 프로젝트 서비스 장점 프로젝트 서비스 장점프로젝트 서비스 장점프로젝트 서비스 장점 프로젝트 서비스 장점 프로젝트 서비스 장점 프로젝트 서비스 장점프로젝트 서비스 장점",
      cons_content: "프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점 프로젝트 서비스 단점",
      overall_opinion_content: "프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 프로젝트 총평 v",
      report_registration_date: "2017-11-01 00:00:00",
      isSelection: false,
      project_participant_id: 1,
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectUserReportPage');
  }

  back() {
    this.navCtrl.pop();
  }

  photoView(url) {
    this.photoViewer.show(url);
  }

  bestSelection() {
    // 선정 버튼
  }

  openCompanyProjectUserProfilePage(project_participant_id) {
    this.navCtrl.push('CompanyProjectUserProfilePage', { "project_participant_id" : project_participant_id });    
  }

}
