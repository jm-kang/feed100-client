import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, App } from 'ionic-angular';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyNewsfeedStoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-newsfeed-story',
  templateUrl: 'company-newsfeed-story.html',
})
export class CompanyNewsfeedStoryPage {
  @ViewChild(Slides) slides: Slides;

  isFirstSlide: boolean = true;
  isLastSlide: boolean = false;
  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;
  
  isLike: boolean = false;
  // newsfeedMainImage: String = "";
  // avatarImage: String = "";
  // nickname: String = "";
  // newsfeedName: String = "";
  // newsfeedSource: String = "";
  // newsfeedViewNum: number = 0;
  // newsfeedLikeNum: number = 0;
  // newsfeedCommentNum: number = 0;
  // newsfeedSummary: String = ""
  // newsfeedRegistrationDate: String = "";

  newsfeedMainImage: String = "assets/img/newsfeed-main-image1.png";
  avatarImage: String = "assets/img/newsfeed-avatar-image1.png";
  nickname: String = "아밀라아제";
  newsfeedName: String = "뉴스피드 제목 뉴스피드 제목";
  newsfeedSource: String = "www.wadiz.com";
  newsfeedViewNum: number = 200;
  newsfeedLikeNum: number = 80;
  newsfeedCommentNum: number = 4;
  newsfeedSummary: String = "뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명 뉴스피드 설명"
  newsfeedRegistrationDate: String = "2017-09-18 00:00:00";
  
  newsfeedStorySlides = [
    {
      storyImage: '',
      storyVideo: 'https://www.youtube.com/embed/sbBynX2_TUM',
      storyContent: '스토리 동영상',
    },
    {
      storyImage: 'assets/img/newsfeed-story-image01.jpeg',
      storyVideo: '',
      storyContent: '스토리 내용 스토리 내용 스토리 내용 스토리 내용',
    },
    {
      storyImage: 'assets/img/newsfeed-story-image02.jpeg',
      storyVideo: '',
      storyContent: '스토리 내용 스토리 내용 스토리 내용스토리 내용 스토리 내용 스토리 내용스토리 내용 스토리 내용스토리 내용스토리 내용스토리 내용스토리 내용 스토리 내용 스토리 내용 스토리 내용 스토리 내용',
    }
  ];
  newsfeedComments = [
    {
      avatar_image: 'assets/img/user-avatar-image.png',
      nickname: '스윙스',
      newsfeed_comment_content : '나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다.',
      newsfeed_comment_registration: '2017-09-12 00:00:00',
    },
    {
      avatar_image: 'assets/img/company-avatar-image1.png',
      nickname: '더콰이엇',
      newsfeed_comment_content : '나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다.',
      newsfeed_comment_registration: '2017-09-12 00:00:00',
    },
    {
      avatar_image: 'assets/img/user-avatar-image2.png',
      nickname: '지코',
      newsfeed_comment_contet : '나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다.',
      newsfeed_comment_registration: '2017-09-12 00:00:00',
    },
    {
      avatar_image: 'assets/img/company-avatar-image2.png',
      nickname: '도끼',
      newsfeed_comment_content : '나는 그러했다. 나는 그러했다. 나는 그러했다. 나는 그러했다.',
      newsfeed_comment_registration: '2017-09-12 00:00:00',
    },
  ];

  newsfeedComment: String = "";

  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad UserNewsfeedStoryPage');
    // let loading = this.httpService.presentLoading();
    // let newsfeed_id = this.navParams.get('newsfeed_id');

    // this.httpService.getNewsfeed(newsfeed_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.isLike = (data.data.isLike == 1) ? true : false;
    //       this.newsfeedMainImage = data.data.newsfeed_main_image;
    //       this.avatarImage = data.data.newsfeed_avatar_image;
    //       this.nickname = data.data.newsfeed_nickname;
    //       this.newsfeedName = data.data.newsfeed_name;
    //       this.newsfeedSource = data.data.newsfeed_source;
    //       this.newsfeedViewNum = data.data.newsfeed_view_num;
    //       this.newsfeedLikeNum = data.data.newsfeed_like_num;
    //       this.newsfeedCommentNum = data.data.newsfeed_comment_num;
    //       this.newsfeedSummary = data.data.newsfeed_summary;
    //       this.newsfeedRegistrationDate = data.data.newsfeed_registration_date;
    //       this.newsfeedStorySlides = JSON.parse(data.data.newsfeed_story);
    //       this.newsfeedComments = data.data.newsfeed_comments;

    //       this.totalPageNum = this.newsfeedStorySlides.length;
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

          this.totalPageNum = this.newsfeedStorySlides.length;
  }

  back() {
    this.navCtrl.pop();
  }

  slideChanged() {
    if(this.slides.isBeginning()) {
      this.isFirstSlide = true;
    } else {
      this.isFirstSlide = false;
    }

    if (this.slides.isEnd()) {
      this.isLastSlide = true;
    } else {
      this.isLastSlide = false;
    }

    if(this.slides.getActiveIndex() > this.totalPageNum) {
      this.currentPageNum = this.totalPageNum;  
    } else {
      this.currentPageNum = this.slides.getActiveIndex();
    }
    this.progressPercent = 100 * ( this.currentPageNum / (this.totalPageNum) );
  }

  slideToComment() {
    this.slides.slideTo(this.newsfeedStorySlides.length + 1);
  }

  clickLike() {
    // let loading = this.httpService.presentLoading();
    // let newsfeed_id = this.navParams.get('newsfeed_id');

    // this.httpService.newsfeedLike(newsfeed_id)
    // .finally(() => {
    //   loading.dismiss();
    // })
    // .subscribe(
    //   (data) => {
    //     if(data.success == true) {
    //       this.isLike = (data.data.isLike == 1) ? true : false;
    //       this.newsfeedLikeNum = data.data.newsfeed_like_num;
    //     }
    //     else if(data.success == false) {
    //       this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //       .then(() => {
    //         this.ionViewDidLoad();
    //       })
    //     }
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.httpService.showBasicAlert('오류가 발생했습니다.');
    //   }
    // );

  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  goFirstSlide() {
    this.slides.slideTo(0);
  }

  writeNewsfeedComment() {
    // if(this.newsfeedComment != '') {
    //   let loading = this.httpService.presentLoading();
    //   let newsfeed_comment_content = this.newsfeedComment;
    //   this.newsfeedComment = '';
    //   this.newsfeedComments = [];
    //   let newsfeed_id = this.navParams.get('newsfeed_id');
      
    //   this.httpService.writeNewsfeedComment(newsfeed_id, newsfeed_comment_content)
    //   .finally(() => {
    //     loading.dismiss();
    //   })
    //   .subscribe(
    //     (data) => {
    //       if(data.success == true) {
    //         this.newsfeedComments = data.data.newsfeed_comments;
    //         this.newsfeedCommentNum = data.data.newsfeed_comment_num;
    //         this.httpService.showBasicAlert('댓글이 등록되었습니다.');
    //       }
    //       else if(data.success == false) {
    //         this.httpService.apiRequestErrorHandler(data, this.navCtrl)
    //         .then(() => {
    //           this.ionViewDidLoad();
    //         })
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //       this.httpService.showBasicAlert('오류가 발생했습니다.');
    //     }
    //   );
    // }
  }

}
