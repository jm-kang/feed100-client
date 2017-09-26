import { Component, ViewChild, ElementRef } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { IonicPage, NavController, NavParams, Slides, ModalController, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { CompanyProjectSearchResultPage } from '../company-project-search-result/company-project-search-result';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the CompanyProjectFeedbackPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-feedback',
  templateUrl: 'company-project-feedback.html',
})
export class CompanyProjectFeedbackPage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('imageSize') ElementRef;

  project_id;
  feedback_id;

  slideHeight: number;
  mobWidth: number;

  // projectName: String = "";
  // avatarImage: String = "";
  // nickname: String = "";
  // isBest: boolean;
  // empathyNum: number = 0;
  // nonEmpathyNum: number = 0;
  // feedback: String = "";
  // feedbackRegistrationDate: String = "";

  segmentOpinionsCondition: String = '';
  
  projectName: String = "프로젝트 이름";
  avatarImage: String = "assets/img/user-avatar-image2.png";
  nickname: String = "지코";
  isBest: boolean = true;
  empathyNum: number = 2;
  nonEmpathyNum: number = 1;
  feedback: String = "피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명 피드백 설명";
  feedbackRegistrationDate: String = "2017-09-18 00:00:00";

  feedbackHashtags = [
    '기능','개선사항'
  ];

  feedbackImages = [
    {
      img: 'assets/img/feedback-image1.jpeg', width: '', height: '', top: '', left: '', maxWidth: '', maxHeight: '',
    },
    {
      img: 'assets/img/feedback-image2.jpeg', width: '', height: '', top: '', left: '', maxWidth: '', maxHeight: '',
    },
    {
      img: 'assets/img/feedback-image3.jpeg', width: '', height: '', top: '', left: '', maxWidth: '', maxHeight: '',
    },
    {
      img: 'assets/img/feedback-image4.jpeg', width: '', height: '', top: '', left: '', maxWidth: '', maxHeight: '',
    },
    {
      img: 'assets/img/feedback-image5.jpeg', width: '', height: '', top: '', left: '', maxWidth: '', maxHeight: '',
    },
    {
      img: 'assets/img/feedback-image6.jpeg', width: '', height: '', top: '', left: '', maxWidth: '', maxHeight: '',
    },
  ];

  opinions = [
    {
      is_empathy: true,
      avatar_image: 'assets/img/user-avatar-image.png',
      nickname: '설현',
      opinion_registration_date: '2017-09-18 07:00:00',
      opinion_image: '',
      opinion: '나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다.',
      width: '', height: '', top: '', left: '', maxWidth: '', maxHeight: '',
    },
    {
      is_empathy: false,
      avatar_image: 'assets/img/user-avatar-image2.png',
      nickname: '스윙스',
      opinion_registration_date: '2017-09-18 09:00:00',
      opinion_image: 'assets/img/feedback-opinion-image1.jpeg',
      opinion: '나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다.',
      width: '', height: '', top: '', left: '', maxWidth: '', maxHeight: '',
    },
    {
      is_empathy: true,
      avatar_image: 'assets/img/user-avatar-image3.png',
      nickname: '빈지노',
      opinion_registration_date: '2017-09-19 10:00:00',
      opinion_image: 'assets/img/feedback-opinion-image2.jpeg',
      opinion: '나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다. 나의 의견은 이러하다.',
      width: '', height: '', top: '', left: '', maxWidth: '', maxHeight: '',
    },
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public statusBar: StatusBar, 
    private el:ElementRef, 
    public modalCtrl: ModalController, 
    public popoverCtrl: PopoverController,
    private photoViewer: PhotoViewer,
    public httpService: HttpServiceProvider) {
    this.mobWidth = (window.screen.width);
    this.slideHeight = this.mobWidth * 4 / 5;
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectFeedbackPage');
  }

  ionViewDidEnter() {
    this.statusBar.show();
    this.segmentOpinionsCondition = "all";

    // let loading = this.httpService.presentLoading();
    // this.project_id = this.navParams.get('project_id');
    // this.feedback_id = this.navParams.get('feedback_id');

    // this.httpService.getFeedback(this.project_id, this.feedback_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       let feedback = data.data.feedback;
    //       this.projectName = data.data.project_name;
    //       this.avatarImage = feedback.avatar_image;
    //       this.nickname = feedback.nickname;
    //       this.isMyFeedback = feedback.is_my_feedback;
    //       this.isMyOpinion = feedback.is_my_opinion;
    //       this.isBest = feedback.is_best;
    //       this.empathyNum = feedback.empathy_num;
    //       this.nonEmpathyNum = feedback.non_empathy_num;
    //       this.feedback = JSON.parse(feedback.project_feedback)[0];
    //       this.feedbackRegistrationDate = feedback.project_feedback_registration_date;
    //       this.feedbackHashtags = JSON.parse(feedback.project_feedback_hashtags);
          
    //       let project_feedback_images = (feedback.project_feedback_images) ? JSON.parse(feedback.project_feedback_images) : [];
    //       for(let i=0; i<project_feedback_images.length; i++) {
    //         this.feedbackImages.push({
    //           img : project_feedback_images[i]
    //         });
    //       }

    //       this.opinions = data.data.opinions;
          
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidLoad();
    //       });
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );

  }

  back() {
    this.navCtrl.pop();
  }

  photoView(url) {
    this.photoViewer.show(url);
  }
  
  // 슬라이드 이미지 5:4 비율
  onLoad(img, i) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    if(img.width/5 >= img.height/4) {
      tempHeight = this.slideHeight + 'px';
      tempWidth = img.width*(this.slideHeight/img.height) + 'px';
      tempTop = 'initial';
      tempLeft = "-" + ((img.width*(this.slideHeight/img.height))-this.mobWidth)/2 + 'px';
      
    } else {
      tempWidth = this.mobWidth + 'px';
      tempHeight = img.height*(this.mobWidth/img.width) + 'px';
      tempLeft = 'initial';
      tempTop = "-" + ((img.height*(this.mobWidth/img.width))-this.slideHeight)/2 + 'px';
    }

    this.feedbackImages[i].width = tempWidth;
    this.feedbackImages[i].height = tempHeight;
    this.feedbackImages[i].left = tempLeft;
    this.feedbackImages[i].top = tempTop;
  }

  onOpinionLoad(img, i) {
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
    console.log(JSON.stringify(this.opinions[i]));
    console.log("index: " + i);

    this.opinions[i].width = tempWidth;
    this.opinions[i].height = tempHeight;
    this.opinions[i].left = tempLeft;
    this.opinions[i].top = tempTop;
    this.opinions[i].maxHeight = tempMaxHeight;
    this.opinions[i].maxWidth = tempMaxWidth;
  }

  openCompanyProjectSearchResultPage(hashtags) {
    let companyProjectSearchResultModal = this.modalCtrl.create(CompanyProjectSearchResultPage, 
      { "hashtags" : hashtags,
      "project_id" : this.project_id });
    companyProjectSearchResultModal.present();
  }

  openCompanyProjectUserProfilePage() {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage);
    companyProjectUserProfileModal.present();
  }

}
