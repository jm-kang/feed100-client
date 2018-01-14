import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ModalWrapperPage } from './../modal-wrapper/modal-wrapper';

/**
 * Generated class for the TermsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter TermsPage');
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

}
