import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompanyProjectPriceStatementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-price-statement',
  templateUrl: 'company-project-price-statement.html',
})
export class CompanyProjectPriceStatementPage {

  projectMainImage:String = "assets/img/project-main-image1.png";
  projectRegistrationDate: String = "2017-09-14 00:00:00"
  projectEndDate: String = "2017-09-21 00:00:00"
  type: String = "basic";
  projectName: String = "프로젝트 이름 프로젝트 이름 프로젝트 이름";
  isSale:boolean = true;
  typePrice:number = 500000;
  salePrice:number = 300000;
  particapantNum:number = 30;
  feedbackNum:number = 30;
  opinionNum:number = 870;
  interviewNum:number = 50;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectPriceStatementPage');
  }

}
