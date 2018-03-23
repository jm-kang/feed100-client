import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content, ViewController } from 'ionic-angular';

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

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  openUserProjectLinkPage() {
    let userProjectLinkModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProjectLinkPage'});
    userProjectLinkModal.present();
  }

}
