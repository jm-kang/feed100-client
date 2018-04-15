import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from './../../../providers/admin-service/admin-service';
/**
 * Generated class for the AdminProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-home',
  templateUrl: 'admin-project-home.html',
})
export class AdminProjectHomePage {
  project_id;
  // isProjectProceeding;
  project_name;
  project_main_image;
  first_impression_score = 0;
  participants_num;
  project_end_date;
  man_percent = 0;
  woman_percent = 0;
  max_value;
  ages = [
    {
      title: "10대",
      percent: 0,
    },
    {
      title: "20대",
      percent: 0,
    },
    {
      title: "30대",
      percent: 0,
    },
    {
      title: "40대",
      percent: 0,
    },
    {
      title: "50대+",
      percent: 0,
    }
  ];
  // project_name: string = "일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십";
  // project_main_image: string = "./../../assets/img/project-main-image2.png"
  // first_impression_score: number = 7.5;
  // participants_num: number = 30;
  // project_end_date = "2018-04-04 00:00:00";
  // man_percent: number = 80;
  // woman_percent: number = 20;
  // max_value: number;
  // ages = [
  //   {
  //     title: "10대",
  //     percent: 10,
  //   },
  //   {
  //     title: "20대",
  //     percent: 30,
  //   },
  //   {
  //     title: "30대",
  //     percent: 20,
  //   },
  //   {
  //     title: "40대",
  //     percent: 15,
  //   },
  //   {
  //     title: "50대+",
  //     percent: 5,
  //   }
  // ];

  // interviews = [
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-man1.png",
  //     nickname: "우리형",
  //     content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
  //     interview_answer_registration_date: "2018-03-20 00:00:00",
  //     interview_num: 2,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-man2.png",
  //     nickname: "우리형",
  //     content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
  //     interview_answer_registration_date: "2018-03-20 00:00:00",
  //     interview_num: 2,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-man3.png",
  //     nickname: "우리형",
  //     content: "내가 말이야 왕년에 좀 한 주먹 했거든? 그니까 내가 행동대장할께 너가 날 이끌어줘. 안그러면 내 주먹 맛좀 볼 수 있을 것이야.",
  //     interview_answer_registration_date: "2018-03-20 00:00:00",
  //     interview_num: 2,
  //   },
  // ];
  interviews = [];
  is_proceeding;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectHomePage');
    this.project_id = this.navParams.get('project_id');    
    this.commonService.isLoadingActive = true;
  }

  ionViewWillEnter(){
    console.log('ionWillWillEnter AdminProjectHomePage');
    let loading = this.commonService.presentLoading();
    
    this.adminService.getProjectHome(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data) {
            // this.project_id = data.data.project_id;
            this.project_name = data.data.project_name;
            this.project_main_image = data.data.project_main_image;
            this.project_end_date = data.data.project_end_date;
            this.interviews = data.data.participants;
            this.participants_num = this.interviews.length;
            if(this.participants_num) {
              this.setStats();
              this.is_proceeding = data.data.is_proceeding;
            }
          }
          else {
            // this.isProjectProceeding = false;
          }
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewWillEnter();
          })
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

  setStats() {
    let sum_of_first_impression_score = 0;
    let sum_of_man_num = 0;
    let sum_of_woman_num = 0;
    let sum_of_ages = [0, 0, 0, 0, 0];
    for(let i=0; i<this.participants_num; i++) {
      sum_of_first_impression_score += this.interviews[i].project_first_impression_rate;
      switch(this.interviews[i].gender) {
        case '남자':
          sum_of_man_num++;
          break;
        default:
          sum_of_woman_num++;
          break;
      }
      switch(this.interviews[i].age) {
        case '10대':
          sum_of_ages[0]++;
          break;
        case '20대':
          sum_of_ages[1]++;
          break;
        case '30대':
          sum_of_ages[2]++;
          break;
        case '40대':
          sum_of_ages[3]++;
          break;
        default:
          sum_of_ages[4]++;
          break;
      }
    }
    this.first_impression_score = Number((sum_of_first_impression_score / this.participants_num).toFixed(1));
    this.man_percent = Number((sum_of_man_num / this.participants_num * 100).toFixed(0));
    this.woman_percent = Number((sum_of_woman_num / this.participants_num * 100).toFixed(0));
    for(let i=0; i<5; i++) {
      this.ages[i].percent = Number((sum_of_ages[i] / this.participants_num * 100).toFixed(0));
    }
    this.maxValue();            
  }

  maxValue() {
    let max = this.ages[0].percent;
    for (let age of this.ages)
      if (age.percent > max) max = age.percent;
    this.max_value = max
  }

  openAdminProjectInterviewDetailPage(project_participant_id) {
    this.navCtrl.push('AdminProjectInterviewDetailPage', { 'project_id' : this.project_id, 'project_participant_id' : project_participant_id });    
  }

  openAdminProjectStoryHorizontalPage() {
    this.navCtrl.push('AdminProjectStoryHorizontalPage', { 'project_id' : this.project_id });
  }

  openAdminProjectReportPage() {
    this.navCtrl.push('AdminProjectReportPage', { 'project_id' : this.project_id });
  }

  openAdminProjectGroupInterviewPage() {
    this.navCtrl.push('AdminProjectGroupInterviewPage', { 'project_id' : this.project_id });
  }

}
