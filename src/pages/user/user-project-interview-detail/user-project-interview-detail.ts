import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { UserProjectInterviewWritingEditorPage } from '../user-project-interview-writing-editor/user-project-interview-writing-editor';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
/**
 * Generated class for the UserProjectInterviewDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-interview-detail',
  templateUrl: 'user-project-interview-detail.html',
})
export class UserProjectInterviewDetailPage {
  @ViewChild(Content) content: Content;

  project_id;
  
  projectName: String = "프로젝트 이름 프로젝트 이름 프로젝트 이름 프로젝트 이름";
  
  interviews = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private photoViewer: PhotoViewer, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectInterviewDetailPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectInterviewDetailPage');
    let loading = this.commonService.presentLoading();
    let project_id = this.navParams.get('project_id');
    
    this.userService.getInterview(project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectName = data.data.project_name;
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
    console.log('ionViewDidLoad UserProjectInterviewDetailPage');
    this.content.scrollToBottom();
  }

  back() {
    if(this.navParams.get('instance')) {
      console.log('back');
      this.navParams.get('instance').ionViewWillEnter();
    }
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
  
  openUserProjectInterviewWritingEditorPage(interview_id, interview_request, interview_request_images) {
    let userProjectInterviewWritingEditorModal = this.modalCtrl.create(UserProjectInterviewWritingEditorPage, 
      { "projectName" : this.projectName,
      "interview_id" : interview_id,
      "interview_request" : interview_request,
      "interview_request_images" : JSON.parse(JSON.stringify(interview_request_images))
      }
    );
    userProjectInterviewWritingEditorModal.present();
    userProjectInterviewWritingEditorModal.onWillDismiss(
      () => {
        this.ionViewWillEnter();
      }
    );
  }
}
