import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, App, ActionSheetController, AlertController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

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
  newsfeed_id;
  bgHori:   number = 0 ; 
  lastBgH:  number = 0 ;
  mobWidth: number = 0 ;

  scrollHori:   number = 0 ;
  lastScrollH:  number = 0 ;
  transparentPercent: number = 0;

  isFirstSlide: boolean = true;
  isLastSlide: boolean = false;
  currentPageNum: number = 0;
  totalPageNum: number = 0;
  progressPercent: number = 0;

  isLike: boolean = false;
  newsfeedMainImage: String = "";
  avatarImage: String = "";
  nickname: String = "";
  newsfeedName: String = "";
  newsfeedSource: String = "";
  newsfeedViewNum: number = 0;
  newsfeedLikeNum: number = 0;
  newsfeedCommentNum: number = 0;
  newsfeedSummary: String = ""
  newsfeedRegistrationDate: String = "";


  newsfeedStorySlides = [];
  newsfeedComments = [];

  newsfeedComment: String = "";


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider,
    public keyboard: Keyboard,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyNewsfeedStoryPage');
    this.commonService.isLoadingActive = true;
    this.newsfeed_id = this.navParams.get('newsfeed_id');
    this.slides.lockSwipeToPrev(true);  
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyNewsfeedStoryPage');
    let loading = this.commonService.presentLoading();

    this.companyService.getNewsfeed(this.newsfeed_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.isLike = (data.data.isLike == 1) ? true : false;
          this.newsfeedMainImage = data.data.newsfeed_main_image;
          this.avatarImage = data.data.newsfeed_avatar_image;
          this.nickname = data.data.newsfeed_nickname;
          this.newsfeedName = data.data.newsfeed_name;
          this.newsfeedSource = data.data.newsfeed_source;
          this.newsfeedViewNum = data.data.newsfeed_view_num;
          this.newsfeedLikeNum = data.data.newsfeed_like_num;
          this.newsfeedCommentNum = data.data.newsfeed_comment_num;
          this.newsfeedSummary = data.data.newsfeed_summary;
          this.newsfeedRegistrationDate = data.data.newsfeed_registration_date;
          this.newsfeedStorySlides = JSON.parse(data.data.newsfeed_story);
          this.newsfeedComments = data.data.newsfeed_comments;

          this.totalPageNum = this.newsfeedStorySlides.length;
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

  reportNewsfeed(newsfeed_id, newsfeed_comment_id) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '신고하기',
          role: 'destructive',
          handler: () => {
            this.commonService.showConfirmAlert('해당 내용을 부적절한<br>게시글로 신고하시겠습니까?', 
            () => {
              this.commonService.isLoadingActive = true;
              let loading = this.commonService.presentLoading();
              
              this.companyService.reportNewsfeed(newsfeed_id, newsfeed_comment_id)
              .finally(() => {
                loading.dismiss();
              })
              .subscribe(
                (data) => {
                  if(data.success == true) {
                    this.commonService.showBasicAlert('신고가 접수되었습니다.');
                  }
                  else if(data.success == false) {
                    if(data.message == 'already reported') {
                      this.commonService.showBasicAlert('이미 신고가 접수되었습니다.');
                    }
                    else {
                      this.commonService.apiRequestErrorHandler(data, this.navCtrl)
                      .then(() => {
                        this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
                      });
                    }
                  }
                },
                (err) => {
                  console.log(err);
                  this.commonService.showBasicAlert('오류가 발생했습니다.');
                }
              );    
            });        
          }
        },{
          text: '취소하기',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  back() {
    this.keyboard.disableScroll(true); // 추가
    this.navCtrl.pop();
  }

  slideChanged() {
    if(this.slides.isBeginning()) {
      this.slides.lockSwipeToPrev(true);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '16px'; // 추가
      this.isFirstSlide = true;
    } else {
      this.slides.lockSwipeToPrev(false);  // 추가
      document.querySelector(".story-slide .slides")['style'].marginLeft = '0'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionProperty = 'margin-left'; // 추가
      document.querySelector(".story-slide .slides")['style'].transitionDuration = '0.4s'; // 추가
      this.isFirstSlide = false;
    }

    if (this.slides.isEnd()) {
      this.isLastSlide = true;
      this.keyboard.disableScroll(false); // 추가
    } else {
      this.isLastSlide = false;
      this.keyboard.disableScroll(true); // 추가
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
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();

    this.companyService.newsfeedLike(this.newsfeed_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.isLike = (data.data.isLike == 1) ? true : false;
          this.newsfeedLikeNum = data.data.newsfeed_like_num;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );

  }

  goNextSlide() {
    this.slides.slideNext(500);
  }

  goFirstSlide() {
    this.slides.slideTo(0);
  }

  writeNewsfeedComment() {
    if(this.commonService.hasEmoji(this.newsfeedComment)) {
      return false;
    }
    if(this.newsfeedComment != '') {
      this.commonService.isLoadingActive = true;
      let loading = this.commonService.presentLoading();
      let newsfeed_comment_content = this.newsfeedComment;
      this.newsfeedComment = '';
      this.newsfeedComments = [];

      newsfeed_comment_content = this.commonService.textAreaFilter(newsfeed_comment_content);
      this.companyService.writeNewsfeedComment(this.newsfeed_id, newsfeed_comment_content)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.newsfeedComments = data.data.newsfeed_comments;
            this.newsfeedCommentNum = data.data.newsfeed_comment_num;
            this.commonService.showBasicAlert('댓글이 등록되었습니다.');
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
            })
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );
    }
  }

}
