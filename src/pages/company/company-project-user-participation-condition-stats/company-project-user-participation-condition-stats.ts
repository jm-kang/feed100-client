import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the CompanyProjectUserParticipationConditionStatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-user-participation-condition-stats',
  templateUrl: 'company-project-user-participation-condition-stats.html',
})
export class CompanyProjectUserParticipationConditionStatsPage {
  @ViewChild(Slides) slides: Slides;
  participantNum:number = 30;
  colors= [
    {backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)', 'rgba(94, 161, 175,0.7)', 'rgba(173, 209, 208,0.7)', 'rgba(215, 201, 175,0.7)', 'rgba(137, 105, 152,0.7)', 'rgba(203, 175, 197,0.7)', 'rgba(178, 112, 163,0.7)', 'rgba(39, 62, 17, 0.7)', 'rgba(117, 141, 69, 0.7)', 'rgba(180, 189, 75, 0.7)']},
  ];
  type:String= 'pie';
  options= {
    legend: {
      display: false
    },
  };
  
  stats = [
    {
      question: '첫번째 참여 조건',
      datasets: [{
        data: [12, 18],
      }],
      labels: ['객관식1', '객관식2'],
    },
    {
      question: '두번째 참여 조건',
      datasets: [{
        data: [4, 2, 0, 12, 12]
      }],
      labels: ['객관식1', '객관식2', '객관식3', '객관식4', '객관식5'],
    } ,
    {
      question: '세번째 참여 조건',
      datasets: [{
        data: [2,3,4,1,2,4,3,6,2,2,1],
      }],
      labels: ['객관식1','객관식2','객관식3','객관식4','객관식5','객관식6','객관식7','객관식8','객관식9','객관식10','객관식11'],
    },
  ];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectUserParticipationConditionStatsPage');
  }

  back() {
    this.navCtrl.pop();
  }

  goNextSlide() {
    this.slides.slideNext(500);
  }
  
}
