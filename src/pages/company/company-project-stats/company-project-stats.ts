import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

/**
 * Generated class for the CompanyProjectStatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-stats',
  templateUrl: 'company-project-stats.html',
})
export class CompanyProjectStatsPage {
  participantNum:number = 30;

  stats = [
    {
      title: '첫인상 평가',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [0, 0, 4, 10, 16]
      }],
  
      average: 0,
      colors: [
        {backgroundColor:'rgba(255,100,0,0.4)'},
      ],
      labels: ['1점', '2점', '3점', '4점', '5점'],
      type: 'bar',
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
          display: false
        },
      },
    },
    {
      title: '추천 지수 (nps)',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [4, 2, 0, 12, 12]
      }],
  
      average: 0,
      colors: [
        {backgroundColor:'rgba(255,100,0,0.4)'},
      ],
      labels: ['1점', '2점', '3점', '4점', '5점'],
      type: 'bar',
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
          display: false
        },
      },
    } ,
    {
      title: '서비스 만족도',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [5, 6, 9, 4, 6]
      }],
  
      average: 0,
      colors: [
        {backgroundColor:'rgba(255,100,0,0.4)'},
      ],
      labels: ['1점', '2점', '3점', '4점', '5점'],
      type: 'bar',
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        legend: {
          display: false
        },
      },
    } 
  ]
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectStatsPage');
    
  }

  average(index) {
    let average:number = 0;
    let i: number = 0;
    for(let data of this.stats[index].datasets[0].data) {
      i = i+1;
      average = data * i + average;
    }
    average = average / this.participantNum;
    this.stats[index].average = average;
    return average;
  }

  back() {
    this.navCtrl.pop();
  }
}
