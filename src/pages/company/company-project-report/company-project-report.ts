import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the CompanyProjectReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-report',
  templateUrl: 'company-project-report.html',
})
export class CompanyProjectReportPage {
  @ViewChild(Content) content: Content;
  segmentReport:String = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectReportPage');
  }

  ionViewDidEnter(){
    this.segmentReport = "segmentuUserInfo";
    this.statusBar.styleLightContent();
  }

  back() {
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }

  changeSegment() {
    this.content.scrollToTop();
  }
}
