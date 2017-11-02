import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { ModalWrapperPage } from './../modal-wrapper/modal-wrapper';

import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

declare var cordova:any;

/**
 * Generated class for the FaqPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  constructor(private themeableBrowser: ThemeableBrowser,  public statusBar: StatusBar, public viewCtrl: ViewController, public navCtrl: NavController, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
    this.statusBar.styleLightContent();
    this.ModalWrapperPage.dismissModal();

    cordova.ThemeableBrowser.open('https://m.naver.com', '_blank', {
      statusbar: {
        color: '#000000'
      },
      hiddden: 'yes',
      // clearcache: 'yes',
      toolbar: {
        height: 44,
        color: '#000000'
      },
      title: {
        color: '#ffffff',
        staticText: 'FEED100',
      },
      backButton: {
        wwwImage: 'assets/images/back.png',
        wwwImagePressed: 'assets/images/back_pressed.png',
        wwwImageDensity: 3,
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/images/forward.png',
        wwwImagePressed: 'assets/images/forward_pressed.png',
        wwwImageDensity: 3,
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        wwwImage: 'assets/images/close.png',
        wwwImagePressed: 'assets/images/close_pressed.png',
        wwwImageDensity: 3,
        align: 'right',
        event: 'closePressed'
      },
      backButtonCanClose: true
    }).addEventListener('closePressed', function(e) {
        console.log('close');

    }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
        console.error(e.message);
    }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
        console.log(e.message);
    });
  }

  ionViewDidEnter() {
    this.statusBar.styleDefault();
    console.log('enter');
  }

}
