import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

/**
 * Generated class for the UserProjectStorySummaryWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-story-summary-writing-editor',
  templateUrl: 'user-project-story-summary-writing-editor.html',
})
export class UserProjectStorySummaryWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;
  minTextLength: number = 20;
  storySummaryContent: String = '';
  contentPlaceholder: String = '스토리를 보신후 느낀점을 자세하게 이야기해주세요. 성실히 작성된 이야기일수록 기업에게 많은 도움이 됩니다 ^^';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectStorySummaryWritingEditorPage');
  }

  ionViewDidEnter() {
    this.storySummaryContent = this.navParams.get('storySummaryContent').replace(/<br *\/?>/gi, '\n');
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      let data = "";
      this.viewCtrl.dismiss(data);
    }
  }

  completeEditor() {
    let data = { storySummaryContent: this.storySummaryContent };
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
    let data = "";
    this.viewCtrl.dismiss(data);
  }

}
