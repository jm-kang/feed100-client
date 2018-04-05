import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminProjectGroupInterviewQuestionEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-group-interview-question-editor',
  templateUrl: 'admin-project-group-interview-question-editor.html',
})
export class AdminProjectGroupInterviewQuestionEditorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectGroupInterviewQuestionEditorPage');
  }

}
