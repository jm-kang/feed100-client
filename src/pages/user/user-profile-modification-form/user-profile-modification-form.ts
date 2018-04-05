import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ViewController } from 'ionic-angular';

// import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';

/**
 * Generated class for the UserProfileModificationFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile-modification-form',
  templateUrl: 'user-profile-modification-form.html',
})
export class UserProfileModificationFormPage {
  @ViewChild(Slides) slides: Slides;
  isFirstSlide:boolean = true;
  currentSlideNum:number = 1;
  totalSlideNum:number = 6;
  isWrited:boolean = false;
  
  ages = ['10대','20대','30대','40대','50대+'];
  jobs = ['관리자','전문가','사무직','서비스종사자','판매종사자','기능원 및 관련 기술 종사자','장치, 기계조작 및 조립 종사자','단순노무 종사자','군인','학생','기타'];
  regions = ['서울특별시','부산광역시','대구광역시','인천광역시','광주광역시','대전광역시','울산광역시','세종특별자치시','경기도','강원도','충청도','전라도','경상도','제주도'];
  interests = ['얼리어답터','IT','재테크','자동차','여행 / 아웃도어','건강 / 헬스케어','스포츠','게임 / 엔터테인먼트','비상장주식','창업','라이프스타일','소득공제','디자인','패션','공연 / 전시','음악','사회문제해결','책','하이테크','기부 / 나눔'];
  // 각 슬라이드의 값이 저장되는 배열
  // 예) value = ['남자', '10대', '관리자', '서울특별시', '미혼']
  values = [
    '','','','',''
  ];
  interestValues = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    // public ModalWrapperPage: ModalWrapperPage
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfileModificationFormPage');
    this.slides.lockSwipes(true);    
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserProfileModificationFormPage');
  }


  skip() {
    // this.ModalWrapperPage.dismissModal();
  }

  slideChanged() {
    let slideIndex = this.slides.getActiveIndex();
    if(this.slides.isBeginning()) {
      this.isFirstSlide = true;
    } else {
      this.isFirstSlide = false;
    }
    this.currentSlideNum = slideIndex + 1;
    this.slides.lockSwipes(true);

    if(slideIndex < this.totalSlideNum-1) {
      if(this.values[slideIndex] != '') {
        this.isWrited = true;
      } else {
        this.isWrited = false;
      }
    } else {
      if(this.interestValues.length > 0) {
        this.isWrited = true;
      } else {
        this.isWrited = false;
      }
    }

  }

  goPrevButton() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev(500);
  }

  goNextButton() {
    this.isWrited = false;
    this.slides.lockSwipes(false);
    this.slides.slideNext(500); 
  }

  changeRadio(value) {
    if(value != '') {
      this.isWrited = true;
    } else {
      this.isWrited = false;
    }
  }

  changeCheckbox(interest) {
    let index:number = this.interestValues.indexOf(interest);
    if(index > -1) {
      this.interestValues.splice(index,1);
    } else {
      this.interestValues.push(interest);
    }
    if(this.interestValues.length > 0) {
      this.isWrited = true;
    } else {
      this.isWrited = false;
    }
  
  }

  modifyProfile() {
    this.commonService.isLoadingActive = true;
    let loading = this.commonService.presentLoading();

    let num = Math.floor(Math.random() * 3) + 1; // 1 ~ 3
    let avatar_image = "";
    if(this.values[0] == "남자") {
      avatar_image = "assets/img/user-avatar-image-man" + num + ".png";
    }
    else {
      avatar_image = "assets/img/user-avatar-image-woman" + num + ".png";
    }
    
    this.userService.updateProfile(this.values[0], this.values[1], this.values[2], this.values[3], this.values[4], this.interestValues, avatar_image)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          // this.commonService.showBasicAlert('수정이 완료되었습니다.');
          // this.ModalWrapperPage.dismissModal("refresh");   
          this.navCtrl.setRoot('UserTabsPage');
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.commonService.showBasicAlert('잠시 후 다시 시도해주세요');
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  selectOptions = [
    {
      title: '나이',
    },
    {
      title: '직업',
    },
    {
      title: '지역',
    },
  ];
}
