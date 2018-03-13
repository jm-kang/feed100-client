import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompanyProjectGroupInterviewQuestionEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-group-interview-question-editor',
  templateUrl: 'company-project-group-interview-question-editor.html',
})
export class CompanyProjectGroupInterviewQuestionEditorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectGroupInterviewQuestionEditorPage');
  }

}
