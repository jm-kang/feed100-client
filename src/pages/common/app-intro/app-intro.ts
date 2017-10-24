import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppIntroPage');
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
