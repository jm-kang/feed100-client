import { ModalWrapperPage } from './../modal-wrapper/modal-wrapper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



/**
 * Generated class for the PrivateInfoPolicyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-private-info-policy',
  templateUrl: 'private-info-policy.html',
})
export class PrivateInfoPolicyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivateInfoPolicyPage');
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

}
