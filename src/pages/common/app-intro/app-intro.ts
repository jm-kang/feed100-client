import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ModalWrapperPage } from './../modal-wrapper/modal-wrapper';

/**
 * Generated class for the AppIntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-app-intro',
  templateUrl: 'app-intro.html',
})
export class AppIntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppIntroPage');
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

}
