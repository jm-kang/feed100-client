import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ModalController } from 'ionic-angular';

import { CompanyProjectFeedbackPage } from '../company-project-feedback/company-project-feedback';
import { CompanyProjectSearchResultPage } from '../company-project-search-result/company-project-search-result';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';

/**
 * Generated class for the CompanyProjectReportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-report',
  templateUrl: 'company-project-report.html',
})
export class CompanyProjectReportPage {
  @ViewChild(Slides) slides: Slides;
  project_id;
  
  isFirstSlide: boolean = true;
  isFeedback: boolean = true;
  isLink: boolean = true;

  projectMainImage: String = "assets/img/project-main-image1.png";
  avatarImage: String = "assets/img/company-avatar-image1.png";
  nickname: String = "더콰이엇";
  projectName: String = "안녕하세요 저희 프로젝트는 이겁니다.";
  participantNum: number = 30;
  maxParticipantNum: number = 30;
  progressState: String = "2017-09-13 00:00:00";
  projectSummary: String = "1. 유저 정보<br>2. 참여 조건 통계<br>3. 스토리 요약<br>4. 베스트 피드백<br>5. 프로젝트 통계"
  projectRegistrationDate: String = "2017-09-13 00:00:00";

  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  colors= [
    {backgroundColor:['rgba(240,164,171,0.7)','rgba(217,224,176,0.7)','rgba(249,220,134,0.7)','rgba(255,165,23,0.7)','rgba(245,118,80,0.7)', 'rgba(94, 161, 175,0.7)', 'rgba(173, 209, 208,0.7)', 'rgba(215, 201, 175,0.7)', 'rgba(137, 105, 152,0.7)', 'rgba(203, 175, 197,0.7)', 'rgba(178, 112, 163,0.7)', 'rgba(39, 62, 17, 0.7)', 'rgba(117, 141, 69, 0.7)', 'rgba(180, 189, 75, 0.7)']},
  ];
  type:String= 'pie';
  options= {
    legend: {
      display: false
    },
    title: {
      display: true,
      fontSize: 25,
      fontStyle: 'bold',
      fontColor: '#ffffff',
      lineHeight: '3',
      text: '2. 참여 조건 통계'
    }
  };

  projectUserProfileSlides = [
    {
      title: '성별',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [12, 18],
      }],
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
        title: {
          display: true,
          fontSize: 25,
          fontStyle: 'bold',
          fontColor: '#ffffff',
          lineHeight: '3',
          text: '1. 유저 정보'
        }
      },
    },
    {
      title: '나이',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [4, 2, 0, 12, 12]
      }],
  
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
        title: {
          display: true,
          fontSize: 25,
          fontStyle: 'bold',
          fontColor: '#ffffff',
          lineHeight: '3',
          text: '1. 유저 정보'
        }
      },
    },
    {
      title: '직업',
      // 서버에서 데이터 필요한 부분 (서버에서 가져올때 값이 0이면 안가져올수 있음?)
      datasets: [{
        data: [2,3,4,1,2,4,3,6,2,2,1],
      }],
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
          text: '1. 유저 정보'
        }
      },
    },
    {
      title: '지역',
      // 서버에서 데이터 필요한 부분 (서버에서 가져올때 값이 0이면 안가져올수 있음?)
      datasets: [{
        data: [2,3,4,1,2,4,3,6,2,2,1,0,0,0],
      }],
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
        title: {
          display: true,
          fontSize: 25,
          fontStyle: 'bold',
          fontColor: '#ffffff',
          lineHeight: '3',
          text: '1. 유저 정보'
        }
      },
    }
  ];
  
  projectUserParticipationConditionSlides = [
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

  projectBestFeedbacks = [
    {
      avatar_image: 'assets/img/user-avatar-image.png',
      is_best: true,
      nickname: '지코',
      empathy_num: 10,
      non_empathy_num: 2,
      project_feedback_registration_date: '2017-09-16 00:00:00',
      project_participant_id: 1,
      project_feedback: "[\"We are we are we artist baby We are we are we artist ZICO 뭔가 예감 좋아 번뜩 악상이 떠올라 금토일도 월요일같이 사는 내게 상 줄 거야 Alright 올해도 스케줄 꽉 찼고 길 가면 다 알아보고 Fanxy child 겁나 핫하고 그런데도 나 외로워 What should I do\"]",
      project_feedback_hashtags: "[\"기능\", \"기타\"]",
    },
    {
      avatar_image: 'assets/img/user-avatar-image2.png',
      is_best: true,
      nickname: '설현',
      empathy_num: 10,
      non_empathy_num: 2,
      project_feedback_registration_date: '2017-09-18 00:00:00',
      project_participant_id: 1,
      project_feedback: "[\"어제도 오늘도 네모난 새장 속에 갇혀서 왜 이러고 사는지 참 알쏭달쏭해 삐뚤어질 거야 삐딱해질 거야 뭔가 보여줄 거야 난 달라질 거야 지겨운 건 그만 잔소리도 그만 내가 좋은 내 모습은 유별나서 미움 받는다 해도 상관 말고 살아 될 대로 되라지 오늘 하루가 끝인 것처럼 마음 놓고 뛰어 숨이 벅차 올라 죽을 것처럼 내가 원하는 곳 끝까지 가볼래 난 시작할래 난 이제부터야\"]",
      project_feedback_hashtags: "[\"기능\", \"괜찮아요\"]",
    },
    {
      avatar_image: 'assets/img/user-avatar-image3.png',
      is_best: true,
      nickname: '비와이',
      empathy_num: 10,
      non_empathy_num: 2,
      project_feedback_registration_date: '2017-09-20 00:00:00',
      project_participant_id: 1,
      project_feedback: "[\"래퍼 딱지를 떼는 중 이젠 MC로 폼 잡고 걸어가고 싶어 예술가의 길로 확실히 단단해져버린 내 신념과 Ego 새 역사는 다시금 써지네 내 발자취로 산 증인의 삶 그 삶을 위한 권능을 원해 I need more power 단순히 내 바지 주머니가\"]",
      project_feedback_hashtags: "[\"엄지\", \"Forever\"]",
    },
  ];

  projectStatSlides = [
    {
      title: '첫인상 평가',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [0, 0, 4, 10, 16]
      }],
  
      average: 0,
      colors: [
        {backgroundColor:'rgba(255,100,0,0.8)'},
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
        title: {
          display: true,
          fontSize: 25,
          fontStyle: 'bold',
          fontColor: '#ffffff',
          lineHeight: '3',
          text: '5. 프로젝트 통계'
        }
      },
    },
    {
      title: '추천 지수',
      // 서버에서 데이터 필요한 부분
      datasets: [{
        data: [4, 2, 0, 12, 12]
      }],
  
      average: 0,
      colors: [
        {backgroundColor:'rgba(255,100,0,0.8)'},
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
        title: {
          display: true,
          fontSize: 25,
          fontStyle: 'bold',
          fontColor: '#ffffff',
          lineHeight: '3',
          text: '5. 프로젝트 통계'
        }
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
        {backgroundColor:'rgba(255,100,0,0.8)'},
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
        title: {
          display: true,
          fontSize: 25,
          fontStyle: 'bold',
          fontColor: '#ffffff',
          lineHeight: '3',
          text: '5. 프로젝트 통계'
        }
      },
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectReportPage');
    this.totalPageNum = (this.projectUserProfileSlides.length + this.projectUserParticipationConditionSlides.length + this.projectStatSlides.length) + 3;
  }

  slideChanged() {
    if(this.slides.isBeginning()) {
      this.isFirstSlide = true;
    } else {
      this.isFirstSlide = false;
    }

    if(this.slides.getActiveIndex() > this.totalPageNum) {
      this.currentPageNum = this.totalPageNum;  
    } else {
      this.currentPageNum = this.slides.getActiveIndex();
    };

    this.progressPercent = 100 * ( this.currentPageNum / (this.totalPageNum) );
  }


  back() {
    this.navCtrl.pop();
  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  goFirstSlide() {
    let differencePageNum = this.currentPageNum + 1;
    for(let i = 0; i < differencePageNum; i++) {
      this.slides.slidePrev(200);
    }
  }

  openCompanyProjectFeedbackPage(feedback_id) {
    this.navCtrl.push(CompanyProjectFeedbackPage, { "project_id" : this.project_id, "feedback_id" : feedback_id });
  }

  openCompanyProjectSearchResultPage(hashtags) {
    let companyProjectSearchResultModal = this.modalCtrl.create(CompanyProjectSearchResultPage, 
      { "hashtags" : hashtags,
      "project_id" : this.project_id });
    companyProjectSearchResultModal.present();
  }

  average(index) {
    let average:number = 0;
    let i: number = 0;
    for(let data of this.projectStatSlides[index].datasets[0].data) {
      i = i+1;
      average = data * i + average;
    }
    average = average / this.participantNum;
    this.projectStatSlides[index].average = average;
    return average;
  }

  openCompanyProjectUserProfilePage() {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage);
    companyProjectUserProfileModal.present();
  }
}
