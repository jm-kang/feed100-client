import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Nav } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';

/**
 * Generated class for the ModalWrapperPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-wrapper',
  templateUrl: 'modal-wrapper.html',
})
export class ModalWrapperPage {
  @ViewChild(Nav) nav: Nav;
  modalPage:any;
  modalParams: any = { };
  params;
  unregisterBackButtonAction;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private viewCtrl: ViewController, 
    public commonService: CommonServiceProvider) {
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload ModalWrapperPage');
    this.commonService.modalWrapperPage = '';
    this.unRegisterBackButtonCustomHandler();    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalWrapperPage');
    this.commonService.modalWrapperPage = this;

    this.modalPage = this.navParams.get('page');
    this.modalParams = this.navParams.get('params');
    console.log(JSON.stringify(this.modalParams));
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ModalWrapperPage');
  }

  unRegisterBackButtonCustomHandler() {
    console.log('unRegister');
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    this.unregisterBackButtonAction = '';
  }

  dismissModal(data?) {
    if(data) {
      this.viewCtrl.dismiss(data);
    } else {
      this.viewCtrl.dismiss();
    }
  }

}
