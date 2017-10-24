import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  scrollingFun(e) {
    if (e.scrollTop < -150) {
      this.viewCtrl.dismiss();
    }
    if(0 > e.scrollTop) {
      document.querySelector(".modal-header-wrapper")['style'].display = 'none';
    }
    if(0 <= e.scrollTop) {
      document.querySelector(".modal-header-wrapper")['style'].display = 'block';
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
