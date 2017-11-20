import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

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
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  minTextLength: number = 20;
  storySummaryContent: String = '';
  contentPlaceholder: String = '스토리를 보신후 느낀점을 자세하게 이야기해주세요. 성실히 작성된 이야기일수록 기업에게 많은 도움이 됩니다 ^^';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public ModalWrapperPage: ModalWrapperPage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectStorySummaryWritingEditorPage');
  }

  ionViewDidEnter() {
    this.storySummaryContent = this.ModalWrapperPage.modalParams.storySummaryContent.replace(/<br *\/?>/gi, '\n');
  }

  completeEditor() {
    let data = { storySummaryContent: this.storySummaryContent };
    this.ModalWrapperPage.dismissModal(data);
  }

  dismiss() {
    let data = "";
    this.ModalWrapperPage.dismissModal(data);
  }

  swipeEvent(e) {
    if(e.direction == 16) {
      document.querySelector(".editor-modal .scroll-content")['style'].background = 'transparent';
      if(this.contentHandle.scrollTop > -90) {
        this.dismiss();
      }
    }
  }

  panEnd() {
    if(this.contentHandle.scrollTop <= -90) {
      console.log('pan: ' + this.lastBgV);
      document.querySelector(".editor-modal .scroll-content")['style'].background = 'transparent';
      this.dismiss();
    }
  }

  scrollingEvent($e) {
    var stepV = $e.scrollTop /10 ;
    this.scrollVert = this.lastScrollV - stepV ;
    if (this.scrollVert < 0) {
       this.scrollVert = 0 ;
    } else {
       if (this.scrollVert > 100)
          this.scrollVert = 100 ;
    }
    if(this.scrollVert < 20) {
      // this.transparentPercent = 1 - (this.scrollVert /20);
      // document.querySelector(".editor-modal .scroll-content")['style'].background = 'rgba(0,0,0,'+this.transparentPercent+')';
    }
  }

}
