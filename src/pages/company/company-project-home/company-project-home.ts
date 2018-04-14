import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from './../../../providers/company-service/company-service';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

/**
 * Generated class for the CompanyProjectHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-home',
  templateUrl: 'company-project-home.html',
})
export class CompanyProjectHomePage {
  project_id;
  isProjectProceeding;
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
  // isProjectProceeding:boolean = true;
  // project_name: string = "스마트 거치대 CUBIT : 스마트폰을 이용한 편리한 촬영 도구";
  // project_main_image: string = "./../../assets/img/project-main-image3.png"
  // first_impression_score: number = 7.5;
  // participants_num: number = 30;
  // project_end_date = "2018-04-11 00:00:00";
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
  //     nickname: "Matt",
  //     content: "저는 화면 공유와 두 기기에 같이 저장된다는 부분이 좋은 것 같습니다. 보통 같이 사진을 찍으면 공유하려고 별도로 따로 보내줘야 하는데 공유가 ....",
  //     interview_answer_registration_date: "2018-04-08 01:00:00",
  //     interview_num: 2,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-woman2.png",
  //     nickname: "잠만보오",
  //     content: "휴대폰이 반드시 2개가 있어야 사용할 수 있다는 점? 저는 혼자서도 여행을 자주 가는데 휴대폰은 하나뿐이걸랑요ㅠㅠ.",
  //     interview_answer_registration_date: "2018-04-08 00:00:00",
  //     interview_num: 1,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-man3.png",
  //     nickname: "탈룰라",
  //     content: "멀리서 각도가 조절되는 점이 가장 좋은 것 같습니다. 그리고 연결이 데이터 소모없이 연결되면서 사진도 공유되는게 신기하네요!.",
  //     interview_answer_registration_date: "2018-04-07 18:00:00",
  //     interview_num: 0,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-man2.png",
  //     nickname: "이꾸요잇",
  //     content: "일단 촬영 보조기기가 있어야 결합을 할 수 있다는 점이 아쉽네요 ㅠㅠ 다른 것도 같이 들고 다니지 않고 자체로 가능하면 좋겠습니다.",
  //     interview_answer_registration_date: "2018-04-07 10:00:00",
  //     interview_num: 0,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-woman1.png",
  //     nickname: "호순이",
  //     content: "페이스 트래킹이라는 기능 정말 신기하네요!! 이건 꼭 사진이 아니더라도 영상채팅이나 방송용으로 써도 될 것 같은데요?",
  //     interview_answer_registration_date: "2018-04-07 00:00:00",
  //     interview_num: 0,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-man1.png",
  //     nickname: "김탁구공",
  //     content: "폰이 2개가 있어야 서로 연결되서 쓸 수 있는게 좀.. 뭔가 불편함을 해결하기 위함인데 들고다닐게 많네요 ㅠㅠ 폰도 2대여야 하고, 보조기기도 필요하고요.",
  //     interview_answer_registration_date: "2018-04-06 00:00:00",
  //     interview_num: 0,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-man1.png",
  //     nickname: "파란이빨",
  //     content: "3만원 정도면 적절할 것으로 생각됩니다. 왜냐하면 요즘 특별한 기능 없이 블루투스 정도의 셀카봉도 1~2만원 정도에 팔리고, 삼각대도 약 1~2만원 정도에 팔리는데",
  //     interview_answer_registration_date: "2018-04-06 00:00:00",
  //     interview_num: 0,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-woman2.png",
  //     nickname: "뒤자이너",
  //     content: "큐빗! 정말 좋은 이름이네요. 디자인도 이쁘고, 휴대성도 좋아보여요. 꼭 출시되면 알려주세요~!",
  //     interview_answer_registration_date: "2018-04-05 00:00:00",
  //     interview_num: 0,
  //   },
  //   {
  //     project_participant_id: 1,
  //     avatar_image: "./../../assets/img/user-avatar-image-man3.png",
  //     nickname: "여행준비생",
  //     content: "여친이랑 여행다닐때 각도 못 맞춘다고 혼 많이 났었는데.. 이 제품을 이용하면 앞으로 그럴 일은 없을 것 같아요!",
  //     interview_answer_registration_date: "2018-04-05 00:00:00",
  //     interview_num: 0,
  //   },
  // ];

  interviews = [];
  is_proceeding;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public appCtrl: App,
    private push: Push,
    private uniqueDeviceId: UniqueDeviceID,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider,) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectHomePage');

    // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }
    });

    // to initialize push notifications

    const options: PushOptions = {
      android: {
          senderID: '889490373924'
      },
      ios: {
          alert: true,
          badge: true,
          sound: true,
          clearBadge: true
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      console.log(JSON.stringify(notification.additionalData));
      if(notification.additionalData.foreground) {
        console.log('foreground');
        this.commonService.showBasicAlert(notification.message);
      }
      else {
        console.log('background');
      }
      this.refreshCurrentPage();
    });


    pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      console.log(registration.registrationId);
      this.uniqueDeviceId.get()
      .then((uuid: any) => {
        console.log('uuid:', uuid);
        this.companyService.registerDeviceToken(uuid, registration.registrationId)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );

      })
      .catch((error: any) => console.log(error));
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter CompanyProjectHomePage');
    let loading = this.commonService.presentLoading();
    
    this.companyService.getProjectHome()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          if(data.data) {
            this.isProjectProceeding = true;
            this.project_id = data.data.project_id;
            this.project_name = data.data.project_name;
            this.project_main_image = data.data.project_main_image;
            this.project_end_date = data.data.project_end_date;
            this.interviews = data.data.participants;
            this.participants_num = this.interviews.length;
            if(this.participants_num) {
              this.setStats();
              this.companyService.setNotificationNum();
              this.is_proceeding = data.data.is_proceeding;
            }
          }
          else {
            this.isProjectProceeding = false;
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
  
  openCompanyTutorialPage() {
    this.navCtrl.push("CompanyTutorialPage");
  }

  openCompanyProjectRegistrationPage() {
    let companyProjectRegistrationModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyProjectRegistrationPage'});
    companyProjectRegistrationModal.present();
  }

  openCompanyConfigurePage() {
    this.navCtrl.push("CompanyConfigurePage");
  }

  openCompanyNotificationPage() {
    this.navCtrl.push("CompanyNotificationPage");
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

  openCompanyProjectInterviewDetailPage(project_participant_id) {
    this.navCtrl.push('CompanyProjectInterviewDetailPage', { 'project_id' : this.project_id, 'project_participant_id' : project_participant_id });
  }

  openCompanyProjectStoryHorizontalPage() {
    this.navCtrl.push('CompanyProjectStoryHorizontalPage', { 'project_id' : this.project_id });
  }

  openCompanyProjectReportPage() {
    this.navCtrl.push('CompanyProjectReportPage', { 'project_id' : this.project_id });
  }

  openCompanyProjectGroupInterviewPage() {
    this.navCtrl.push('CompanyProjectGroupInterviewPage', { 'project_id' : this.project_id });
  }

  getNotificationNum() {
    return this.companyService.notificationNum;
  }

  refreshCurrentPage() {
    let instance = this.appCtrl.getActiveNavs()[0].getActive().instance;
    if(instance && instance.ionViewWillEnter && !this.commonService.modalWrapperPage) {
      console.log('refreshCurrentPage');
      instance.ionViewWillEnter();
    }
  }

  openCompanyHelpPage() {
    let manualModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyHelpPage'});
    manualModal.present();
  }

  logout() {
    this.commonService.showConfirmAlert('정말 로그아웃하시겠습니까?',
      () => {
        this.commonService.logout(this.navCtrl);
        localStorage.clear();
      }
    );
  }
}
