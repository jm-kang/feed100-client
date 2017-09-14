import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';

import { UserProjectFeedbackPage } from '../user-project-feedback/user-project-feedback';
import { UserProjectSearchResultPage } from '../user-project-search-result/user-project-search-result';

/**
 * Generated class for the UserProjectFeedbackListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-feedback-list',
  templateUrl: 'user-project-feedback-list.html',
})
export class UserProjectFeedbackListPage {
  @ViewChild(Content) content: Content;
  projectName: String = '프로젝트 이름 프로젝트 이름프로젝트 이름프로젝트 이름 프로젝트 이름';
  segmentFeedbacksCondition: String = '';
  participationFeedbackNum: number = 0;
  nonParticipationFeedbackNum: number = 0;

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
      isMyOpinion: true,
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
      isMyOpinion: true,
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
      isMyOpinion: false,
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
      isMyOpinion: true,
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
      isMyOpinion: true,
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
      isMyOpinion: false,
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
      isMyOpinion: true,
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
      isMyOpinion: true,
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
      isMyOpinion: true,
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
      isMyOpinion: true,
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
      isMyOpinion: true,
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
      isMyOpinion: true,
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
      isMyOpinion: true,
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
      isMyOpinion: true,
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
      isMyOpinion: false,
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  back() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackListPage');
  }

  ionViewDidEnter() {
    this.segmentFeedbacksCondition = "nonParticipationFeedback";
    for(let feedback of this.feedbacks) {
      if(feedback.isMyOpinion) {
        this.participationFeedbackNum = this.participationFeedbackNum + 1;    
      } else {
        this.nonParticipationFeedbackNum = this.nonParticipationFeedbackNum + 1;
      }
    }
  }

  openUserProjectFeedbackPage() {
    this.navCtrl.push(UserProjectFeedbackPage);
  }

  openUserProjectSearchResultPage(hashtags) {
    let userProjectSearchResultModal = this.modalCtrl.create(UserProjectSearchResultPage, {hashtags: hashtags});
    userProjectSearchResultModal.present();
  }

  changeSegment() {
    this.content.scrollToTop();
  }

}
