import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserProjectFeedbackListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-feedback-list',
  templateUrl: 'user-project-feedback-list.html',
})
export class UserProjectFeedbackListPage {
  @ViewChild(Content) content: Content;
  projectName: String = '';
  segmentFeedbacksCondition: String = '';
  participationFeedbackNum: number = 0;
  nonParticipationFeedbackNum: number = 0;

  project_id;
  feedbacks = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackListPage');
    this.commonService.isLoadingActive = true;
    this.segmentFeedbacksCondition = "nonParticipationFeedback";
    this.project_id = this.navParams.get('project_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectFeedbackListPage');
    let loading = this.commonService.presentLoading();

    this.userService.getProjectHome(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectName = data.data.project_name;
          this.feedbacks = data.data.feedbacks;
          this.participationFeedbackNum = 0;
          this.nonParticipationFeedbackNum = 0;
          for(let feedback of this.feedbacks) {
            if(feedback.is_my_opinion) {
              this.participationFeedbackNum = this.participationFeedbackNum + 1;
            } else {
              this.nonParticipationFeedbackNum = this.nonParticipationFeedbackNum + 1;
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
    );
  }

  doRefresh(refresher) {
    this.commonService.isLoadingActive = true;
    this.ionViewWillEnter();
    refresher.complete();
  }

  openUserProjectFeedbackPage(feedback_id) {
    this.navCtrl.push('UserProjectFeedbackPage', { "project_id" : this.project_id, "feedback_id" : feedback_id });
  }

  openUserProjectSearchResultPage(hashtags) {
    this.navCtrl.push('UserProjectSearchResultPage', { "hashtags" : hashtags, "project_id" : this.project_id });
  }

  changeSegment() {
    this.content.scrollToTop();
  }

}
