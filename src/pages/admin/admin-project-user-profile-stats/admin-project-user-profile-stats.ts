import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectUserProfileStatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-user-profile-stats',
  templateUrl: 'admin-project-user-profile-stats.html',
})
export class AdminProjectUserProfileStatsPage {
  @ViewChild(Slides) slides: Slides;
  project_id;
  
  stats = [];

  tempStats = [
    {
      title: '성별',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [0, 0],
      }],
      totalNum: 0,
      colors: [
        {backgroundColor:['rgba(131,196,240,0.7)','rgba(252,158,178,0.7)']},
      ],
      // 서버에서 데이터 필요한 부분
      labels: ['남자', '여자'],
      type: 'doughnut',
      options: {
        legend: {
          display: false
        },
      },
    },
    {
      title: '나이',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [0, 0, 0, 0, 0]
      }],
      totalNum: 0,
      colors: [
        {backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)']},
      ],
      // 서버에서 데이터 필요한 부분
      labels: ['10대', '20대', '30대', '40대', '50대+'],
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
      title: '직업',
      // 서버에서 데이터 필요한 부분 (서버에서 가져올때 값이 0이면 안가져올수 있음?)
      datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }],
      totalNum: 0,
      colors: [
        {backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)', 'rgba(94, 161, 175,0.7)', 'rgba(173, 209, 208,0.7)', 'rgba(215, 201, 175,0.7)', 'rgba(137, 105, 152,0.7)', 'rgba(203, 175, 197,0.7)', 'rgba(178, 112, 163,0.7)']},
      ],
      // 서버에서 데이터 필요한 부분 (서버에서 가져올때 값이 0이면 안가져올수 있음?)
      labels: ['관리자','전문가','사무직','서비스종사자','판매종사자','기능원 및 관련 기술 종사자','장치, 기계조작 및 조립 종사자','단순노무 종사자','군인','학생','기타'],
      
      type: 'doughnut',
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          fontSize: 25,
          fontStyle: 'bold',
          fontColor: '#ffffff',
          lineHeight: '3',
        }
      },
    },
    {
      title: '지역',
      // 서버에서 데이터 필요한 부분 (서버에서 가져올때 값이 0이면 안가져올수 있음?)
      datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }],
      totalNum: 0,
      colors: [
        {backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)', 'rgba(94, 161, 175,0.7)', 'rgba(173, 209, 208,0.7)', 'rgba(215, 201, 175,0.7)', 'rgba(137, 105, 152,0.7)', 'rgba(203, 175, 197,0.7)', 'rgba(178, 112, 163,0.7)', 'rgba(39, 62, 17, 0.7)', 'rgba(117, 141, 69, 0.7)', 'rgba(180, 189, 75, 0.7)']},
      ],
      // 서버에서 데이터 필요한 부분 (서버에서 가져올때 값이 0이면 안가져올수 있음?)
      labels: ['서울특별시','부산광역시','대구광역시','인천광역시','광주광역시','대전광역시','울산광역시','세종특별자치시','경기도','강원도','충청도','전라도','경상도','제주도'],
      type: 'pie',
      options: {
        legend: {
          display: false
        },
      },
    }
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectUserProfileStatsPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectUserProfileStatsPage');
    let loading = this.commonService.presentLoading();

    this.adminService.getProjectParticipants(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          for(let i = 0; i < data.data.length; i++) {
            let index;
            index = this.tempStats[0].labels.indexOf(data.data[i].gender);
            if(index > -1) {
              this.tempStats[0].datasets[0].data[index]++;
              this.tempStats[0].totalNum++;
            }
            index = this.tempStats[1].labels.indexOf(data.data[i].age);
            if(index > -1) {
              this.tempStats[1].datasets[0].data[index]++;
              this.tempStats[1].totalNum++;
            }
            index = this.tempStats[2].labels.indexOf(data.data[i].job);
            if(index > -1) {
              this.tempStats[2].datasets[0].data[index]++;
              this.tempStats[2].totalNum++;
            }
            index = this.tempStats[3].labels.indexOf(data.data[i].region);
            if(index > -1) {
              this.tempStats[3].datasets[0].data[index]++;
              this.tempStats[3].totalNum++;
            }
          }
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
  
  back() {
    this.navCtrl.pop();
  }
  goNextSlide() {
    this.slides.slideNext(500);
  }
}
