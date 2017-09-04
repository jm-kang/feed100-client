import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserProjectFeedbackModificationEditorPage } from '../user-project-feedback-modification-editor/user-project-feedback-modification-editor';

/**
 * Generated class for the UserProjectFeedbackPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-feedback-popover',
  templateUrl: 'user-project-feedback-popover.html',
})
export class UserProjectFeedbackPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackPopoverPage');
  }

  openUserProjectFeedbackModificationEditorPage() {
    let userProjectFeedbackModificationEditorModal = this.modalCtrl.create(UserProjectFeedbackModificationEditorPage);
    userProjectFeedbackModificationEditorModal.present();
  }

}
