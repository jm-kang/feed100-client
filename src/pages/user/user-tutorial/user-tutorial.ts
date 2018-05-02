import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';
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
  openTutorialIntro;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    private platform: Platform,
    private domSanitizer: DomSanitizer,
    private photoViewer: PhotoViewer,
    public actionSheetCtrl: ActionSheetController,
    public keyboard: Keyboard,
    public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad UserTutorialPage');
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad UserTutorialPage');
    this.openTutorialIntro = true;
  }

}
