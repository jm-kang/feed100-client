import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';

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
  project_id;

  stats = [];
  
  tempStats = [
    {
      title: '첫인상 평가',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }],
      average: 0,
      totalNum: 0,
      colors: [
        {backgroundColor:'rgba(255,100,0,0.4)'},
      ],
      labels: ['1점', '2점', '3점', '4점', '5점', '6점', '7점', '8점', '9점', '10점'],
      type: 'bar',
      options: {
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero:true,
                userCallback: function(label, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                      return label;
                  }
                },
              }
          }]
        },
        legend: {
          display: false
        },
      },
    },
    {
      title: '추천 지수',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }],
      average: 0,
      totalNum: 0,
      colors: [
        {backgroundColor:'rgba(255,188,0,0.8)'},
      ],
      labels: ['1점', '2점', '3점', '4점', '5점', '6점', '7점', '8점', '9점', '10점'],
      type: 'bar',
      options: {
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero:true,
                userCallback: function(label, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                      return label;
                  }
                },
              }
          }]
        },
        legend: {
          display: false
        },
      },
    } ,
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectStatsPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectStatsPage');
    let loading = this.commonService.presentLoading();

    this.companyService.getProjectParticipants(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          for(let i = 0; i < data.data.length; i++) {
            if(data.data[i].project_first_impression_rate) {
              (this.tempStats[0].datasets[0].data[data.data[i].project_first_impression_rate-1])++;
              this.tempStats[0].totalNum++;
            }
            if(data.data[i].project_recommendation_rate) {
              (this.tempStats[1].datasets[0].data[data.data[i].project_recommendation_rate-1])++;
              this.tempStats[1].totalNum++;
            }
          }
          this.tempAverage(0);
          this.tempAverage(1);
          this.stats = this.tempStats;
          
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          });
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  average(index) {
    if(this.stats[index].totalNum == 0) {
      return 0;
    }
    else {
      let average:number = 0;
      let i: number = 0;
      for(let data of this.stats[index].datasets[0].data) {
        i = i+1;
        average = data * i + average;
      }
      average = average / this.stats[index].totalNum;
      return average;
    }
  }

  tempAverage(index) {
    if(this.tempStats[index].totalNum == 0) {
      return 0;
    }
    else {
      let average:number = 0;
      let i: number = 0;
      for(let data of this.tempStats[index].datasets[0].data) {
        i = i+1;
        average = data * i + average;
      }
      average = average / this.tempStats[index].totalNum;
      this.tempStats[index].average = average / 2;
    }
  }

  back() {
    this.navCtrl.pop();
  }
}
