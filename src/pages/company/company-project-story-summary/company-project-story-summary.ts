import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompanyProjectStorySummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-story-summary',
  templateUrl: 'company-project-story-summary.html',
})
export class CompanyProjectStorySummaryPage {

  projectStorySummarys = [
    {
      nickname: '스윙스',
      content: '내게로와 내게로와 내게로와 내게로와 ㅍ 내게로와 내게로와 ㅍ 내게로와 내게로와 내게로와내게로와내게로와내게로와',
    },
    {
      nickname: '지코',
      content: '그대 눈빛은 그대 눈빛은 그대 눈빛은그대 눈빛은그대 눈빛은그대 눈빛은그대 눈빛은 그대 눈빛은그대 눈빛은그대 눈빛은그대 눈빛은 그대 눈빛은 그대 눈빛은',
    },
    {
      nickname: '설현',
      content: '내가 눈물 흘린건 내가 눈물 흘린건내가 눈물 흘린건내가 눈물 흘린건 내가 눈물 흘린건 내가 눈물 흘린건 내가 눈물 흘린건 내가 눈물 흘린건 내가 눈물 흘린건 내가 눈물 흘린건 내가 눈물 흘린건',
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectStorySummaryPage');
  }
  
  back() {
    this.navCtrl.pop();
  }
}
