import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Nav } from 'ionic-angular';

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

  constructor(public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalWrapperPage');
    this.modalPage = this.navParams.get('page');
    this.modalParams = this.navParams.get('params');
    console.log(JSON.stringify(this.modalParams));
  }

  dismissModal(data?) {
    if(data) {
      this.viewCtrl.dismiss(data);
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

}
