import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Content } from 'ionic-angular';

import { CompanyProjectFeedbackPage } from '../company-project-feedback/company-project-feedback';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';

import { StatusBar } from '@ionic-native/status-bar';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyProjectSearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-search-result',
  templateUrl: 'company-project-search-result.html',
})
export class CompanyProjectSearchResultPage {
  @ViewChild("contentRef") contentHandle: Content;

  project_id;

  feedbacks = [];

  feedbackResults = [];

  projectHashtags = [];

  searchResults = [];

  hashtags;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public modalCtrl: ModalController, 
    public statusBar: StatusBar,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      this.statusBar.show();
      this.viewCtrl.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectSearchResultPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectSearchResultPage');
    this.statusBar.show();

    let loading = this.commonService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.companyService.getProjectHome(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(!this.searchResults.length) {
            this.projectHashtags = JSON.parse(data.data.project_hashtags);
            this.feedbacks = data.data.feedbacks;
      
            this.hashtags = this.navParams.get('hashtags');
            for(let i = 0; i < this.hashtags.length; i++) {
              this.searchResults.push(this.hashtags[i]);
              let index = this.projectHashtags.indexOf(this.hashtags[i]);
              if(index > -1) {
                this.projectHashtags.splice(index, 1);
              }
            }
            this.filter();
            console.log(this.feedbackResults);
          }
          else {
            this.projectHashtags = JSON.parse(data.data.project_hashtags);
            this.feedbacks = data.data.feedbacks;

            for(let i = 0; i < this.searchResults.length; i++) {
              let index = this.projectHashtags.indexOf(this.searchResults[i]);
              if(index > -1) {
                this.projectHashtags.splice(index, 1);
              }
            }
            this.filter();
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  filter() {
    this.feedbackResults = [];
    for(let i=this.searchResults.length; i>0; i--) {
      let requiredHashtagNum = i;
      for(let j=0; j<this.feedbacks.length; j++) {
        let project_feedback_hashtags = JSON.parse(this.feedbacks[j].project_feedback_hashtags);
        let matchedHashtagNum = 0;
        for(let k=0; k<project_feedback_hashtags.length; k++) {
          if(this.searchResults.indexOf(project_feedback_hashtags[k]) > -1) {
            matchedHashtagNum++;
          }
        }
        if(requiredHashtagNum == matchedHashtagNum) {
          this.feedbackResults.push(this.feedbacks[j]);
        }
      }
    }
  }

  activeAllHashtag() {
    for(let i=0; i < this.projectHashtags.length; i++) {
      this.searchResults.push(this.projectHashtags[i]);
    }
    this.projectHashtags.splice(0, this.projectHashtags.length);
    this.filter();
  }

  activeHashtag(hashtag) {
    this.searchResults.push(hashtag);
    let index: number = this.projectHashtags.indexOf(hashtag);
    this.projectHashtags.splice(index, 1);
    this.filter();
  }

  inactiveHashtag(hashtag) {
    this.projectHashtags.push(hashtag);
    let index: number = this.searchResults.indexOf(hashtag);
    this.searchResults.splice(index, 1);
    this.filter();
  }

  openCompanyProjectFeedbackPage(feedback_id) {
    this.navCtrl.push(CompanyProjectFeedbackPage, { "project_id" : this.project_id, "feedback_id" : feedback_id });
  }

  openCompanyProjectUserProfilePage(project_participant_id) {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage, { "project_participant_id" : project_participant_id });
    companyProjectUserProfileModal.present();
  }


}
