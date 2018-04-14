import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from './../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminProjectGroupInterviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-project-group-interview',
  templateUrl: 'admin-project-group-interview.html',
})
export class AdminProjectGroupInterviewPage {
  project_id;

  interviews = [
    // {
    //   project_participant_id: 1,
    //   avatar_image: "./../../assets/img/user-avatar-image-man1.png",
    //   nickname: "우리형",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
    // {
    //   project_participant_id: 2,
    //   avatar_image: "./../../assets/img/user-avatar-image-man2.png",
    //   nickname: "asda",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
    // {
    //   project_participant_id: 3,
    //   avatar_image: "./../../assets/img/user-avatar-image-man3.png",
    //   nickname: "sdfsdf",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
    // {
    //   project_participant_id: 4,
    //   avatar_image: "./../../assets/img/user-avatar-image-woman1.png",
    //   nickname: "xcvxzcv",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
    // {
    //   project_participant_id: 5,
    //   avatar_image: "./../../assets/img/user-avatar-image-woman2.png",
    //   nickname: "asdasd",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
    // {
    //   project_participant_id: 6,
    //   avatar_image: "./../../assets/img/user-avatar-image-woman3.png",
    //   nickname: "sdafasdf",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
    // {
    //   project_participant_id: 7,
    //   avatar_image: "./../../assets/img/user-avatar-image-man1.png",
    //   nickname: "zxcsdv",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
    // {
    //   project_participant_id: 8,
    //   avatar_image: "./../../assets/img/user-avatar-image-man2.png",
    //   nickname: "klaasdas",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
    // {
    //   project_participant_id: 9,
    //   avatar_image: "./../../assets/img/user-avatar-image-man3.png",
    //   nickname: "zxc",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
    // {
    //   project_participant_id: 10,
    //   avatar_image: "./../../assets/img/user-avatar-image-woman1.png",
    //   nickname: "asd",
    //   project_first_impression_rate: 7.5,
    //   age: '20대',
    //   gender: '남자',
    //   interview_answer_registration_date: "2018-03-20 00:00:00",
    //   interview_num: 2,
    //   isCheck: false,
    // },
  ];

  group = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public commonService: CommonServiceProvider,
    public adminService: AdminServiceProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminProjectGroupInterviewPage');
    this.commonService.isLoadingActive = true;
    this.project_id = this.navParams.get('project_id');
    this.uncheckAll();    
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter AdminProjectGroupInterviewPage');
    let loading = this.commonService.presentLoading();
    
    this.adminService.getProjectParticipants(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.interviews = data.data;
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

  check(i) {
    if (this.interviews[i].isCheck) {
      this.interviews[i].isCheck = false;
      let index = this.group.indexOf(this.interviews[i]);
      this.group.splice(index, 1);
    } else {
      this.interviews[i].isCheck = true;
      this.group.unshift(this.interviews[i]);
    }
  }

  inactive(user) {
    let group_index = this.group.indexOf(user);
    let interview_index = this.interviews.indexOf(user);
    this.interviews[interview_index].isCheck = false;
    this.group.splice(group_index, 1);
  }

  openAdminProjectGroupInterviewQuestionEditorPage() {
    let adminProjectGroupInterviewQuestionEditorModal = this.modalCtrl.create('ModalWrapperPage', {
      page: 'AdminProjectGroupInterviewQuestionEditorPage',
      params: {
        project_id: this.project_id,
        group: this.group
      }
    });
    adminProjectGroupInterviewQuestionEditorModal.present();
    adminProjectGroupInterviewQuestionEditorModal.onWillDismiss(
      (data) => {
        if(data == 'complete') {
          this.back();
        }
    });
  }

  checkAll() {
    this.group = this.interviews.map((interview) => {
      return interview;
    });
    for(let interview of this.interviews) {
      interview.isCheck = true;
    }
  }

  uncheckAll() {
    this.group = [];
    for(let interview of this.interviews) {
      interview.isCheck = false;
    }
  }

}
