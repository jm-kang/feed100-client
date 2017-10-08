import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { CompanyProjectInterviewWritingEditorPage } from '../company-project-interview-writing-editor/company-project-interview-writing-editor';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';

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
  
  nickname: String = "";
  totalInterviewNum: number = 0;
  maxInterviewNum: number = 0;
  isAvailable;

  interviews = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private photoViewer: PhotoViewer, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectInterviewDetailPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectInterviewDetailPage');
    let loading = this.commonService.presentLoading();
    this.project_participant_id = this.navParams.get('project_participant_id');
    
    this.companyService.getInterview(this.project_participant_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.nickname = data.data.nickname;
          this.totalInterviewNum = data.data.total_interview_num;
          this.maxInterviewNum = data.data.max_interview_num;
          this.isAvailable = data.data.is_available;
          let tempInterviews = data.data.interviews;
          
          for(let i=0; i<tempInterviews.length; i++) {
            if(tempInterviews[i].interview_request_images) {
              tempInterviews[i].interview_request_images = JSON.parse(tempInterviews[i].interview_request_images);
              for(let j=0; j<tempInterviews[i].interview_request_images.length; j++) {
                tempInterviews[i].interview_request_images[j] = { img : tempInterviews[i].interview_request_images[j]}; 
              }
            }
            if(tempInterviews[i].interview_response_images) {
              tempInterviews[i].interview_response_images = JSON.parse(tempInterviews[i].interview_response_images);
              for(let j=0; j<tempInterviews[i].interview_response_images.length; j++) {
                tempInterviews[i].interview_response_images[j] = { img : tempInterviews[i].interview_response_images[j]}; 
              }
            }
          }
          this.interviews = tempInterviews;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter CompanyProjectInterviewDetailPage');
    this.content.scrollToBottom();
  }

  back() {
    this.navCtrl.pop();
  }

  onInterviewDetailCompanyImageLoad(img, count, i) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;

    if(img.width >= img.height) {
      tempHeight = img.width + 'px';
      tempWidth = 'auto';
      tempTop = 'initial';
      tempLeft = "-" + (img.width*(img.width/img.height)-img.width)/2 + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      tempWidth = img.height + 'px';
      tempHeight = 'auto';
      tempLeft = 'initial';
      tempTop = "-" + (img.height-img.width)/2 + 'px';
      tempMaxWidth = '100%';
      tempMaxHeight = 'initial';
    }
    this.interviews[count].interview_request_images[i].width = tempWidth;
    this.interviews[count].interview_request_images[i].height = tempHeight;
    this.interviews[count].interview_request_images[i].left = tempLeft;
    this.interviews[count].interview_request_images[i].top = tempTop;
    this.interviews[count].interview_request_images[i].maxHeight = tempMaxHeight;
    this.interviews[count].interview_request_images[i].maxWidth = tempMaxWidth;    
  }

  onInterviewDetailUserImageLoad(img, count, i) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;

    if(img.width >= img.height) {
      tempHeight = img.width + 'px';
      tempWidth = 'auto';
      tempTop = 'initial';
      tempLeft = "-" + (img.width*(img.width/img.height)-img.width)/2 + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      tempWidth = img.height + 'px';
      tempHeight = 'auto';
      tempLeft = 'initial';
      tempTop = "-" + (img.height-img.width)/2 + 'px';
      tempMaxWidth = '100%';
      tempMaxHeight = 'initial';
    }
    this.interviews[count].interview_response_images[i].width = tempWidth;
    this.interviews[count].interview_response_images[i].height = tempHeight;
    this.interviews[count].interview_response_images[i].left = tempLeft;
    this.interviews[count].interview_response_images[i].top = tempTop;
    this.interviews[count].interview_response_images[i].maxHeight = tempMaxHeight;
    this.interviews[count].interview_response_images[i].maxWidth = tempMaxWidth;
  }

  photoView(url) {
    this.photoViewer.show(url);
  }
  
  openCompanyProjectInterviewWritingEditorPage() {
    let companyProjectInterviewWritingEditorModal = this.modalCtrl.create(CompanyProjectInterviewWritingEditorPage, 
      {
      "nickname" : this.nickname,
      "project_participant_id" : this.project_participant_id,
      "ordinal" : this.interviews.length + 1
    }
  );
    companyProjectInterviewWritingEditorModal.present();
    companyProjectInterviewWritingEditorModal.onWillDismiss(
      () => {
        this.ionViewWillEnter();  
      }
    );
    companyProjectInterviewWritingEditorModal.onDidDismiss(
      () => {
        this.ionViewDidEnter();
      }
    );
  }

  openCompanyProjectUserProfilePage(project_participant_id) {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage, { "project_participant_id" : project_participant_id });
    companyProjectUserProfileModal.present();
  }

}
