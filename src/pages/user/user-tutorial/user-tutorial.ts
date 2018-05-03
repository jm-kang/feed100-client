// import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Slides, Content, Platform, AlertController, ActionSheetController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Keyboard } from '@ionic-native/keyboard';
import { Ionic2RatingModule } from 'ionic2-rating';

declare var cordova:any;

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the UserTutorialPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-tutorial',
  templateUrl: 'user-tutorial.html',
})
export class UserTutorialPage {
  isInfoHide = true;
  openTutorialIntro;
  openProjectTabs;
  openProjectTabsIntro;

  // 추천 프로젝트
  recommendedProjects = [
    {
      project_id: 1,
      project_main_image:"./../../assets/img/project-main-image5.png",
      project_name: "하플리 : 예쁜 한복들만 모았다! 허리치마, 저고리, 한복원피스 등.",
      project_max_reward: 5500,
    },
  ];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    private platform: Platform,
    private domSanitizer: DomSanitizer,
    private photoViewer: PhotoViewer,
    public actionSheetCtrl: ActionSheetController,
    public keyboard: Keyboard) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad UserTutorialPage');
  }

  
  ionViewWillEnter() {
    console.log('ionViewDidLoad UserTutorialPage');
    this.isInfoHide = true;
    this.openTutorialIntro = true;
    this.openProjectTabs = false;
    this.openProjectTabsIntro = false;
  }
  
  accessProjectCard(project_id) {
    this.isInfoHide = true;
    this.openTutorialIntro = false;
    this.openProjectTabs = false;
    this.openProjectTabsIntro = true;
  }

  openProjectTabsPage() {
    this.isInfoHide = false;
    this.openTutorialIntro = false;
    this.openProjectTabs = true;
    this.openProjectTabsIntro = false;
  }
}
