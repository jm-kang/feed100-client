import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Content } from 'ionic-angular';

import { CompanyProjectFeedbackPage } from '../company-project-feedback/company-project-feedback';
import { CompanyProjectUserProfilePage } from '../company-project-user-profile/company-project-user-profile';

import { StatusBar } from '@ionic-native/status-bar';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyProjectSearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-search-result',
  templateUrl: 'company-project-search-result.html',
})
export class CompanyProjectSearchResultPage {
  @ViewChild("contentRef") contentHandle: Content;

  project_id;

  feedbacks = [];

  feedbackResults = [];

  projectHashtags = [];

  searchResults = [];

  hashtags;


  park = {
    project_id: 5,
    company_id: 5,
    project_main_image: "https://elasticbeanstalk-ap-northeast-2-035223481599.s3.ap-northeast-2.amazonaws.com/feed100/images/1504179095595785273",
    project_name: "테스트2",
    project_summary: "테스트중입니다.",
    project_story: "[{\"storyImage\": \"https://elasticbeanstalk-ap-northeast-2-035223481599.s3.ap-northeast-2.amazonaws.com/feed100/images/1504179108028103806\", \"storyVideo\": \"\", \"storyContent\": \"스토리 1페이지\"}, {\"storyImage\": \"\", \"storyVideo\": \"https://youtube.com/embed/afxLaQiLu-o\", \"storyContent\": \"스토리 2페이지\"}, {\"storyImage\": \"https://elasticbeanstalk-ap-northeast-2-035223481599.s3.ap-northeast-2.amazonaws.com/feed100/images/1504179127156314088\", \"storyVideo\": \"\", \"storyContent\": \"스토리 3페이지\"}, {\"storyImage\": \"https://elasticbeanstalk-ap-northeast-2-035223481599.s3.ap-northeast-2.amazonaws.com/feed100/images/1504179132352650539\", \"storyVideo\": \"\", \"storyContent\": \"스토리 4페이지\"}]",
    max_participant_num: 10,
    project_registration_date: "2017-08-31T11:33:02.000Z",
    project_end_date: "2017-09-27T15:00:00.000Z",
    project_link: "http://www.feed100.me",
    project_view_num: 9,
    project_hashtags: "[\"기능\", \"개선사항\", \"기타\"]",
    project_participation_gender_conditions: "[{\"condition\": \"남자\", \"isApproved\": true}, {\"condition\": \"여자\", \"isApproved\": true}]",
    project_participation_age_conditions: "[{\"condition\": \"10대\", \"isApproved\": true}, {\"condition\": \"20대\", \"isApproved\": true}, {\"condition\": \"30대\", \"isApproved\": true}, {\"condition\": \"40대\", \"isApproved\": true}, {\"condition\": \"50대+\", \"isApproved\": true}]",
    project_participation_job_conditions: "[{\"condition\": \"관리자\", \"isApproved\": true}, {\"condition\": \"전문가\", \"isApproved\": true}, {\"condition\": \"사무직\", \"isApproved\": true}, {\"condition\": \"서비스종사자\", \"isApproved\": true}, {\"condition\": \"판매종사자\", \"isApproved\": true}, {\"condition\": \"기능원 및 관련 기능 종사자\", \"isApproved\": true}, {\"condition\": \"장치, 기계조작 및 조립 종사자\", \"isApproved\": true}, {\"condition\": \"단순노무 종사자\", \"isApproved\": true}, {\"condition\": \"군인\", \"isApproved\": true}, {\"condition\": \"학생\", \"isApproved\": true}, {\"condition\": \"기타\", \"isApproved\": true}]",
    project_participation_region_conditions: "[{\"condition\": \"서울특별시\", \"isApproved\": true}, {\"condition\": \"부산광역시\", \"isApproved\": true}, {\"condition\": \"대구광역시\", \"isApproved\": true}, {\"condition\": \"인천광역시\", \"isApproved\": true}, {\"condition\": \"광주광역시\", \"isApproved\": true}, {\"condition\": \"대전광역시\", \"isApproved\": true}, {\"condition\": \"울산광역시\", \"isApproved\": true}, {\"condition\": \"세종특별자치시\", \"isApproved\": true}, {\"condition\": \"경기도\", \"isApproved\": true}, {\"condition\": \"강원도\", \"isApproved\": true}, {\"condition\": \"충청도\", \"isApproved\": true}, {\"condition\": \"전라도\", \"isApproved\": true}, {\"condition\": \"경상도\", \"isApproved\": true}, {\"condition\": \"제주도\", \"isApproved\": true}]",
    project_participation_marriage_conditions: "[{\"condition\": \"미혼\", \"isApproved\": true}, {\"condition\": \"기혼\", \"isApproved\": true}]",
    project_participation_objective_conditions: "null",
    user_id: 5,
    role: "company",
    auth_id: "local:wnsadh12@naver.codam",
    username: "wnsadh12@naver.codam",
    password: "1NNOPsGvt1gT/1uc9zRq6WluzQbChZCQdCENCA0uZLxihNLUNwtV4ssTPzAB6zCGz9i+1WQot1kCO2WYeN5aJBIiM4hz3SIe8eXCwQZ5SYvksJdUz5lnhcVZIvPJrzSwn2u25FcIynHKnVn5lz3dqd3ZQY9z+x48gNvNj+9Sr6E=",
    salt: "N3+Rtmpdo1wuT1o/w52eOlYHz/BkioBTuPv5PrHbfeVAFY37UbLrbmHBQz9X2EJ+Ufm7bYMs/T5p0OK5ubPeZw==",
    nickname: "adwwd",
    avatar_image: "assets/img/user-avatar-image.png",
    user_registration_date: "2017-08-10T20:22:55.000Z",
    device_tokens: null,
    level: 1,
    experience_point: 0,
    point: 0,
    introduction: null,
    gender: null,
    age: null,
    job: null,
    region: null,
    marriage: null,
    interests: null,
    interview_num: 0,
    participant_num: 3,
    feedbacks: [
        {
            project_participant_id: 18,
            project_id: 5,
            user_id: 1,
            project_participation_date: "2017-09-02T12:27:17.000Z",
            project_potential_point: 0,
            project_reward_date: null,
            project_feedback: "[\"나는 갓준모. 로비로 나와\", \"asdasd\"]",
            project_feedback_registration_date: "2017-09-05T05:47:11.000Z",
            project_feedback_hashtags: "[\"기능\", \"기타\"]",
            project_feedback_images: "[\"assets/img/feedback-image1.jpeg\", \"assets/img/feedback-image2.jpeg\", \"assets/img/feedback-image3.jpeg\", \"assets/img/feedback-image4.jpeg\"]",
            role: "user",
            auth_id: "local:wnsah12@naver.com",
            username: "wnsah12@naver.com",
            password: "a0WwGvIxPU2vpnGsgYluEF7FBajwRx5f5yKxydEHJPYU3uv0aYIMhTdoJTZIbegRxdShrDSv0UoZuxXaile+kZ5oRgguHYhcuW/573Dzfva39sg8SOoyb5PI8wqqc20xnGWpxNWLVOsnVX7yR3J0J2qD3aTqmS8d7ZmaWCkCGnQ=",
            salt: "WfNCAGmBEP4o1mgB1f/Th4EY9vLz8pmYg/R+QZIHcVgY/WC1sYKHeGm8tvgqBWetnJn5aOE5ea61gXw0hkqyEg==",
            nickname: "DeepPlain",
            avatar_image: "assets/img/user-avatar-image.png",
            user_registration_date: "2017-08-10T13:24:32.000Z",
            device_tokens: null,
            level: 1,
            experience_point: 0,
            point: 0,
            introduction: null,
            gender: null,
            age: null,
            job: null,
            region: null,
            marriage: null,
            interests: null,
            empathy_num: 1,
            non_empathy_num: 0,
            is_my_opinion: 0,
            is_my_feedback: 0,
            is_best: true
        },
        {
            project_participant_id: 17,
            project_id: 5,
            user_id: 8,
            project_participation_date: "2017-09-02T12:27:17.000Z",
            project_potential_point: 0,
            project_reward_date: null,
            project_feedback: "[\"같으며, 거선의 것은 눈이 용기가 이성은 든 크고 있다. 청춘의 속에서 청춘 가장 것이다. 얼음에 생생하며, 투명하되 찾아다녀도, 인간이 피고 현저하게 운다. 품에 가지에 웅대한 운다. 그러므로 예가 찬미를 꽃이 것이 철환하였는가? 영락과 이상의 끝까지 구하지 꽃 무엇이 같지 이상의 있으랴? 두기 인간은 열락의 이상은 듣는다. 인생을 품었기 위하여서, 행복스럽고 그들은 공자는 그들에게 이상의 위하여서. 우리 그것을 산야에 하였으며, 이 천자만홍이 꽃 청춘 운다.\"]",
            project_feedback_registration_date: "2017-09-05T05:40:52.000Z",
            project_feedback_hashtags: "[\"기능\", \"개선사항\"]",
            project_feedback_images: "[\"assets/img/feedback-image1.jpeg\", \"assets/img/feedback-image2.jpeg\", \"assets/img/feedback-image3.jpeg\", \"assets/img/feedback-image4.jpeg\"]",
            role: "user",
            auth_id: "local:junmo.kang0818@gmail.com",
            username: "junmo.kang0818@gmail.com",
            password: "gHuwvWldmKu0H/p3d9gDkuG/vW1OQfbCnrbcUoXqeKC1Dy4STgY8p/jgJcg6SjsKv8pSkjoiJuYc08rQXrEe2MuBqC/pj8B8Iw3vWBIMZFXcfdyF5NSIApr5u0QGRpRPbdCUlDDBwvzWGAEX13w6VV4iPUzk1amIrhdbL7jN9/Q=",
            salt: "+pn61RaElzJrwrt+a0UOtu/W0Ow4aDIajr0jDdKJ/J5mFSKK1WfjpSbUl45xEma/P1MAlZFZBigBFqATi0gMNg==",
            nickname: "딥플레인",
            avatar_image: "assets/img/user-avatar-image.png",
            user_registration_date: "2017-08-11T11:18:44.000Z",
            device_tokens: null,
            level: 1,
            experience_point: 0,
            point: 0,
            introduction: null,
            gender: null,
            age: null,
            job: null,
            region: null,
            marriage: null,
            interests: null,
            empathy_num: 1,
            non_empathy_num: 0,
            is_my_opinion: 0,
            is_my_feedback: 1,
            is_best: false
        },
        {
            project_participant_id: 20,
            project_id: 5,
            user_id: 12,
            project_participation_date: "2017-09-04T12:02:01.000Z",
            project_potential_point: 0,
            project_reward_date: null,
            project_feedback: "[\"믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah\"]",
            project_feedback_registration_date: "2017-09-05T05:47:21.000Z",
            project_feedback_hashtags: "[\"개선사항\"]",
            project_feedback_images: null,
            role: "user",
            auth_id: "facebook:594359217427113",
            username: "Wq",
            password: null,
            salt: null,
            nickname: "Sd",
            avatar_image: "assets/img/user-avatar-image.png",
            user_registration_date: "2017-08-11T17:49:02.000Z",
            device_tokens: null,
            level: 1,
            experience_point: 0,
            point: 0,
            introduction: null,
            gender: "남자",
            age: "20대",
            job: "학생",
            region: "대전광역시",
            marriage: "미혼",
            interests: null,
            empathy_num: 1,
            non_empathy_num: 1,
            is_my_opinion: 0,
            is_my_feedback: 0,
            is_best: false
        },
        {
          project_participant_id: 18,
          project_id: 5,
          user_id: 1,
          project_participation_date: "2017-09-02T12:27:17.000Z",
          project_potential_point: 0,
          project_reward_date: null,
          project_feedback: "[\"나는 갓준모. 로비로 나와\", \"asdasd\"]",
          project_feedback_registration_date: "2017-09-05T05:47:11.000Z",
          project_feedback_hashtags: "[\"기능\", \"기타\"]",
          project_feedback_images: "[\"assets/img/feedback-image1.jpeg\", \"assets/img/feedback-image2.jpeg\", \"assets/img/feedback-image3.jpeg\", \"assets/img/feedback-image4.jpeg\"]",
          role: "user",
          auth_id: "local:wnsah12@naver.com",
          username: "wnsah12@naver.com",
          password: "a0WwGvIxPU2vpnGsgYluEF7FBajwRx5f5yKxydEHJPYU3uv0aYIMhTdoJTZIbegRxdShrDSv0UoZuxXaile+kZ5oRgguHYhcuW/573Dzfva39sg8SOoyb5PI8wqqc20xnGWpxNWLVOsnVX7yR3J0J2qD3aTqmS8d7ZmaWCkCGnQ=",
          salt: "WfNCAGmBEP4o1mgB1f/Th4EY9vLz8pmYg/R+QZIHcVgY/WC1sYKHeGm8tvgqBWetnJn5aOE5ea61gXw0hkqyEg==",
          nickname: "DeepPlain",
          avatar_image: "assets/img/user-avatar-image.png",
          user_registration_date: "2017-08-10T13:24:32.000Z",
          device_tokens: null,
          level: 1,
          experience_point: 0,
          point: 0,
          introduction: null,
          gender: null,
          age: null,
          job: null,
          region: null,
          marriage: null,
          interests: null,
          empathy_num: 1,
          non_empathy_num: 0,
          is_my_opinion: 0,
          is_my_feedback: 0,
          is_best: true
      },
      {
          project_participant_id: 17,
          project_id: 5,
          user_id: 8,
          project_participation_date: "2017-09-02T12:27:17.000Z",
          project_potential_point: 0,
          project_reward_date: null,
          project_feedback: "[\"같으며, 거선의 것은 눈이 용기가 이성은 든 크고 있다. 청춘의 속에서 청춘 가장 것이다. 얼음에 생생하며, 투명하되 찾아다녀도, 인간이 피고 현저하게 운다. 품에 가지에 웅대한 운다. 그러므로 예가 찬미를 꽃이 것이 철환하였는가? 영락과 이상의 끝까지 구하지 꽃 무엇이 같지 이상의 있으랴? 두기 인간은 열락의 이상은 듣는다. 인생을 품었기 위하여서, 행복스럽고 그들은 공자는 그들에게 이상의 위하여서. 우리 그것을 산야에 하였으며, 이 천자만홍이 꽃 청춘 운다.\"]",
          project_feedback_registration_date: "2017-09-05T05:40:52.000Z",
          project_feedback_hashtags: "[\"기능\", \"개선사항\"]",
          project_feedback_images: "[\"assets/img/feedback-image1.jpeg\", \"assets/img/feedback-image2.jpeg\", \"assets/img/feedback-image3.jpeg\", \"assets/img/feedback-image4.jpeg\"]",
          role: "user",
          auth_id: "local:junmo.kang0818@gmail.com",
          username: "junmo.kang0818@gmail.com",
          password: "gHuwvWldmKu0H/p3d9gDkuG/vW1OQfbCnrbcUoXqeKC1Dy4STgY8p/jgJcg6SjsKv8pSkjoiJuYc08rQXrEe2MuBqC/pj8B8Iw3vWBIMZFXcfdyF5NSIApr5u0QGRpRPbdCUlDDBwvzWGAEX13w6VV4iPUzk1amIrhdbL7jN9/Q=",
          salt: "+pn61RaElzJrwrt+a0UOtu/W0Ow4aDIajr0jDdKJ/J5mFSKK1WfjpSbUl45xEma/P1MAlZFZBigBFqATi0gMNg==",
          nickname: "딥플레인",
          avatar_image: "assets/img/user-avatar-image.png",
          user_registration_date: "2017-08-11T11:18:44.000Z",
          device_tokens: null,
          level: 1,
          experience_point: 0,
          point: 0,
          introduction: null,
          gender: null,
          age: null,
          job: null,
          region: null,
          marriage: null,
          interests: null,
          empathy_num: 1,
          non_empathy_num: 0,
          is_my_opinion: 0,
          is_my_feedback: 1,
          is_best: false
      },
      {
          project_participant_id: 20,
          project_id: 5,
          user_id: 12,
          project_participation_date: "2017-09-04T12:02:01.000Z",
          project_potential_point: 0,
          project_reward_date: null,
          project_feedback: "[\"믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah\"]",
          project_feedback_registration_date: "2017-09-05T05:47:21.000Z",
          project_feedback_hashtags: "[\"개선사항\"]",
          project_feedback_images: null,
          role: "user",
          auth_id: "facebook:594359217427113",
          username: "Wq",
          password: null,
          salt: null,
          nickname: "Sd",
          avatar_image: "assets/img/user-avatar-image.png",
          user_registration_date: "2017-08-11T17:49:02.000Z",
          device_tokens: null,
          level: 1,
          experience_point: 0,
          point: 0,
          introduction: null,
          gender: "남자",
          age: "20대",
          job: "학생",
          region: "대전광역시",
          marriage: "미혼",
          interests: null,
          empathy_num: 1,
          non_empathy_num: 1,
          is_my_opinion: 0,
          is_my_feedback: 0,
          is_best: false
      }
    ]
  }


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public modalCtrl: ModalController, 
    public statusBar: StatusBar,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      this.statusBar.show();
      this.viewCtrl.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectSearchResultPage');
  }

  ionViewDidEnter() {
    this.statusBar.show();

    // let loading = this.httpService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.projectHashtags = JSON.parse(this.park.project_hashtags);
    this.feedbacks = this.park.feedbacks;

    this.hashtags = this.navParams.get('hashtags');
    for(let i = 0; i < this.hashtags.length; i++) {
      this.searchResults.push(this.hashtags[i]);
      let index = this.projectHashtags.indexOf(this.hashtags[i]);
      if(index > -1) {
        this.projectHashtags.splice(index, 1);
      }
    }
    this.filter();
  

    // this.httpService.getProjectHome(this.project_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.projectHashtags = JSON.parse(data.data.project_hashtags);
    //       this.feedbacks = data.data.feedbacks;
      
    //       this.hashtags = this.navParams.get('hashtags');
    //       for(let i = 0; i < this.hashtags.length; i++) {
    //         this.searchResults.push(this.hashtags[i]);
    //         let index = this.projectHashtags.indexOf(this.hashtags[i]);
    //         if(index > -1) {
    //           this.projectHashtags.splice(index, 1);
    //         }
    //       }
    //       this.filter();
    //       console.log(this.feedbackResults);
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidLoad();
    //       });
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  filter() {
    this.feedbackResults = [];
    for(let i=this.searchResults.length; i>0; i--) {
      let requiredHashtagNum = i;
      for(let j=0; j<this.feedbacks.length; j++) {
        let project_feedback_hashtags = JSON.parse(this.feedbacks[j].project_feedback_hashtags);
        let matchedHashtagNum = 0;
        for(let k=0; k<project_feedback_hashtags.length; k++) {
          if(this.searchResults.indexOf(project_feedback_hashtags[k]) > -1) {
            matchedHashtagNum++;
          }
        }
        if(requiredHashtagNum == matchedHashtagNum) {
          this.feedbackResults.push(this.feedbacks[j]);
        }
      }
    }

    
  }

  activeAllHashtag() {
    for(let i=0; i < this.projectHashtags.length; i++) {
      this.searchResults.push(this.projectHashtags[i]);
    }
    this.projectHashtags.splice(0, this.projectHashtags.length);
    this.filter();
  }

  activeHashtag(hashtag) {
    this.searchResults.push(hashtag);
    let index: number = this.projectHashtags.indexOf(hashtag);
    this.projectHashtags.splice(index, 1);
    this.filter();
  }

  inactiveHashtag(hashtag) {
    this.projectHashtags.push(hashtag);
    let index: number = this.searchResults.indexOf(hashtag);
    this.searchResults.splice(index, 1);
    this.filter();
  }

  openCompanyProjectFeedbackPage(feedback_id) {
    this.navCtrl.push(CompanyProjectFeedbackPage, { "project_id" : this.project_id, "feedback_id" : feedback_id });
  }

  openCompanyProjectUserProfilePage() {
    let companyProjectUserProfileModal = this.modalCtrl.create(CompanyProjectUserProfilePage);
    companyProjectUserProfileModal.present();
  }


}
