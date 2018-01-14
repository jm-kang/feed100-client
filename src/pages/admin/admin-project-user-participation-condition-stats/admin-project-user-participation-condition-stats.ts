import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectUserParticipationConditionStatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-user-participation-condition-stats',
  templateUrl: 'admin-project-user-participation-condition-stats.html',
})
export class AdminProjectUserParticipationConditionStatsPage {
  @ViewChild(Slides) slides: Slides;
  project_id;

  colors= [
    {backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)', 'rgba(94, 161, 175,0.7)', 'rgba(173, 209, 208,0.7)', 'rgba(215, 201, 175,0.7)', 'rgba(137, 105, 152,0.7)', 'rgba(203, 175, 197,0.7)', 'rgba(178, 112, 163,0.7)', 'rgba(39, 62, 17, 0.7)', 'rgba(117, 141, 69, 0.7)', 'rgba(180, 189, 75, 0.7)']},
  ];
  type:String= 'pie';
  options= {
    legend: {
      display: false
    },
  };
  
  stats = [];

  tempStats = [];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectUserParticipationConditionStatsPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminProjectUserParticipationConditionStatsPage');
    let loading = this.commonService.presentLoading();

    this.adminService.getProjectParticipants(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          for(let i = 0; i < data.data.length; i++) {
            let project_participation_objective_conditions = JSON.parse(data.data[i].project_participation_objective_conditions);
            for(let j = 0; j < project_participation_objective_conditions.length; j++) {
              if(this.tempStats.length < (j + 1)) {
                let data = [];
                let labels = [];
                for(let k = 0; k < project_participation_objective_conditions[j].options.length; k++) {
                  labels.push(project_participation_objective_conditions[j].options[k].option);
                  data.push(0);
                }
                this.tempStats.push({
                  question: project_participation_objective_conditions[j].question,
                  datasets: [{
                    data: data,
                  }],
                  totalNum: 0,
                  labels: labels,
                });
              }
              let index = this.tempStats[j].labels.indexOf(project_participation_objective_conditions[j].value);
              if(index > -1) {
                this.tempStats[j].datasets[0].data[index]++;
                this.tempStats[j].totalNum++;
              }
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
