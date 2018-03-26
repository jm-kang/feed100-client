import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, ViewController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

declare var cordova:any;

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserProjectStoryVerticalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-story-vertical',
  templateUrl: 'user-project-story-vertical.html',
})
export class UserProjectStoryVerticalPage {

  project_id;

  isLink: boolean = true;

  projectMainImage: string = "./../../assets/img/feed100-intro-slide4.png";
  nickname: string = "포텐브라더스";
  projectName: string = "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십";
  maxReward: number = 5500;
  testContent: string = "asd";
  project_link;

  projectStorys = [
    {
      storyImage: "./../../assets/img/help-img1.png",
      storyVideo: "",
      storyContent: "마ㅓ누아ㅓ문아ㅓㅜㅏㅓㅇ ㅓ마누아ㅓ 무나ㅓ움ㄴㅇ  머ㅏㅜㄴ아"
    },

    {
      storyImage: "./../../assets/img/help-img2.png",
      storyVideo: "",
      storyContent: "마ㅓ누아ㅓ문아ㅓㅜㅏㅓㅇ ㅓ마누아ㅓ 무나ㅓ움ㄴㅇ  머ㅏㅜㄴ아"
    },

    {
      storyImage: "./../../assets/img/help-img4.png",
      storyVideo: "",
      storyContent: "마ㅓ누아ㅓ문아ㅓㅜㅏㅓㅇ ㅓ마누아ㅓ 무나ㅓ움ㄴㅇ  머ㅏㅜㄴ아"
    }

  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public ModalWrapperPage: ModalWrapperPage,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectStoryVerticalPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProjectStoryPage');
    // let loading = this.commonService.presentLoading();

    // this.userService.getProject(this.project_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       if(this.platform.is('android')) {
    //         this.isLink = (data.data.project_android_link) ? true : false;
    //         this.project_link = data.data.project_android_link;
    //       }
    //       else if(this.platform.is('ios')) {
    //         this.isLink = (data.data.project_ios_link) ? true : false;
    //         this.project_link = data.data.project_ios_link;
    //       }
    //       this.projectMainImage = data.data.project_main_image;
    //       this.avatarImage = data.data.avatar_image;
    //       this.nickname = data.data.nickname;
    //       this.projectName = data.data.project_name;
    //       this.projectViewNum = data.data.project_view_num;
    //       this.participantNum = data.data.participant_num;
    //       this.maxParticipantNum = data.data.max_participant_num;
    //       this.progressState = data.data.project_end_date;
    //       this.projectSummary = data.data.project_summary;
    //       this.projectRegistrationDate = data.data.project_registration_date;
    //       this.projectStorySlides = JSON.parse(data.data.project_story);

    //     }
    //     else if(data.success == false) {
    //       this.commonService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewWillEnter();
    //       });
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.commonService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // )
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  openUserProjectLinkPage() {
    cordova.ThemeableBrowser.open(this.project_link, '_system');
  }

}
