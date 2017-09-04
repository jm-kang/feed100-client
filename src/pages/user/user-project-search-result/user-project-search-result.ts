import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, Content } from 'ionic-angular';

import { UserProjectFeedbackPage } from '../user-project-feedback/user-project-feedback';

import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the UserProjectSearchResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-search-result',
  templateUrl: 'user-project-search-result.html',
})
export class UserProjectSearchResultPage {
  @ViewChild("contentRef") contentHandle: Content;

  participantNum: number;
  maxParticipantNum: number = 30;

  feedbacks = [
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image.png",
      nickname: "우와우와굳",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "같으며, 거선의 것은 눈이 용기가 이성은 든 크고 있다. 청춘의 속에서 청춘 가장 것이다. 얼음에 생생하며, 투명하되 찾아다녀도, 인간이 피고 현저하게 운다. 품에 가지에 웅대한 운다. 그러므로 예가 찬미를 꽃이 것이 철환하였는가? 영락과 이상의 끝까지 구하지 꽃 무엇이 같지 이상의 있으랴? 두기 인간은 열락의 이상은 듣는다. 인생을 품었기 위하여서, 행복스럽고 그들은 공자는 그들에게 이상의 위하여서. 우리 그것을 산야에 하였으며, 이 천자만홍이 꽃 청춘 운다.",
      feedbackHashtags: [
        {value: '기능'},
        {value: '개선사항'},
      ],
      empathyNum: 9,
      nonEmpathyNum: 1,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image2.png",
      nickname: "갓준모",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "나는 갓준모. 로비로 나와",
      feedbackHashtags: [
        {value: '전지전능'},
        {value: '로비'},
      ],
      empathyNum: 8,
      nonEmpathyNum: 0,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 7,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 5,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 4,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 3,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 2,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 1,
      nonEmpathyNum: 4,
    },
  ];

  feedbackResults = [
    {
      isBest: true,
      avatarImage: "assets/img/user-avatar-image.png",
      nickname: "우와우와굳",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "같으며, 거선의 것은 눈이 용기가 이성은 든 크고 있다. 청춘의 속에서 청춘 가장 것이다. 얼음에 생생하며, 투명하되 찾아다녀도, 인간이 피고 현저하게 운다. 품에 가지에 웅대한 운다. 그러므로 예가 찬미를 꽃이 것이 철환하였는가? 영락과 이상의 끝까지 구하지 꽃 무엇이 같지 이상의 있으랴? 두기 인간은 열락의 이상은 듣는다. 인생을 품었기 위하여서, 행복스럽고 그들은 공자는 그들에게 이상의 위하여서. 우리 그것을 산야에 하였으며, 이 천자만홍이 꽃 청춘 운다.",
      feedbackHashtags: [
        {value: '기능'},
        {value: '개선사항'},
      ],
      empathyNum: 9,
      nonEmpathyNum: 1,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image2.png",
      nickname: "갓준모",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "나는 갓준모. 로비로 나와",
      feedbackHashtags: [
        {value: '전지전능'},
        {value: '로비'},
      ],
      empathyNum: 8,
      nonEmpathyNum: 0,
    },
    {
      isBest: false,
      avatarImage: "assets/img/user-avatar-image3.png",
      nickname: "지코",
      feedbackRegistrationDate: "2017.5.1",
      feedbackContent: "믿을 수가 없어, 난생 처음인 걸. 이만큼 쏟아부었던 적. 퉁명스러운 말투 숨겨놓은 그 마음을. 입맞춤으로 눈치챘어. 특별해 좀 인정해. 온갖 참견이 너만 지목해. It's okay 내가 이제. 하루 종일 돌봐줄. She's a baby 알고 보면 애기. 혼자 두면 큰일 나요 All day. 때찌때찌 털끝 하나 건드렸담 봐. Let her sleep well yeah",
      feedbackHashtags: [
        {value: 'Shes a Baby'},
        {value: '설현'},
      ],
      empathyNum: 7,
      nonEmpathyNum: 4,
    },
  ];

  projectHashtags = [
    {value: '기능', isActiveHashtag: false},
    {value: '개선사항', isActiveHashtag: false},
    {value: 'Shes a Baby', isActiveHashtag: false},
    {value: '전지전능', isActiveHashtag: false},
    {value: '로비', isActiveHashtag: false},
    {value: '설현', isActiveHashtag: false},
  ];

  searchResults = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public statusBar: StatusBar) {
    this.participantNum = this.feedbacks.length;
    // 베스트 피드백 조건 
    // 현재 피드백의 순위가 전체 참여 가능 인원의 10퍼센트 이하 
    // 현재 참여자수(피드백수)가 최대 전체 참여 가능 인원의 반 이상 
    // 현재 피드백의 공감수가 현재 참여자수의 반 초과 
    if(this.participantNum >= this.maxParticipantNum/2) {
      for(let i = 0; i < this.maxParticipantNum; i ++) {
        if(this.maxParticipantNum/10 > i && this.feedbacks[i].empathyNum > this.participantNum/2) {
          this.feedbacks[i].isBest = true;
        }
      }
    }
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      this.statusBar.show();
      this.viewCtrl.dismiss();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectSearchResultPage');
  }

  ionViewDidEnter() {
    for(let i=0; i < this.searchResults.length; i++) {
      this.projectHashtags.push(this.searchResults[i]);
    }
    this.searchResults.splice(0, this.searchResults.length);
    
    if(!this.navParams.get('hashtags').length) {
      this.searchResults.push(this.navParams.get('hashtags'));
      for(let i=0; i < this.projectHashtags.length; i++) {
        if(this.projectHashtags[i].value == this.navParams.get('hashtags').value) {
          this.projectHashtags.splice(i,1);
        }
      }
    } else {
      for( let i=0; i < this.navParams.get('hashtags').length; i++) {
        this.searchResults.push(this.navParams.get('hashtags')[i]);
        for(let j = 0; j < this.projectHashtags.length; j++) {
          if(this.projectHashtags[j].value == this.searchResults[i].value) {
            this.projectHashtags.splice(j,1);
          }
        }
      }
    }
    this.statusBar.show();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  activeAllHashtag() {
    for(let i=0; i < this.projectHashtags.length; i++) {
        this.searchResults.push(this.projectHashtags[i]);
      }
      this.projectHashtags.splice(0, this.projectHashtags.length);
  }

  activeHashtag(hashtag) {
    this.searchResults.push(hashtag);
    let index: number = this.projectHashtags.indexOf(hashtag);
    this.projectHashtags.splice(index, 1);
  }

  inactiveHashtag(hashtag) {
    this.projectHashtags.push(hashtag);
    let index: number = this.searchResults.indexOf(hashtag);
    this.searchResults.splice(index, 1);
    // if(this.searchResults.length == 0) {
    //   for(let i=0; i < this.projectHashtags.length; i++) {
    //     this.searchResults.push(this.projectHashtags[i]);
    //   }
    //   this.projectHashtags.splice(0, this.projectHashtags.length);
    // }
  }

  openUserProjectFeedbackPage() {
    this.navCtrl.push(UserProjectFeedbackPage);
  }
}
