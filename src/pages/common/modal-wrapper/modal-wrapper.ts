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

  // openModal(page, params?) {
  //   // 모달 여는 페이지에서 modalpage import해서 함수 호출
  //   if(params) {
  //     this.modalParams = {"project_id" : params.project_id, "interview_id" : params.interview_id};
  //   }
  //   this.modalPage = page;
  // }

  dismissModal(data?) {
    if(data) {
      this.viewCtrl.dismiss(data);
    } else {
      this.viewCtrl.dismiss();
    }
    
  }

}
