import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Content } from 'ionic-angular';

import { ModalWrapperPage } from './../../common/modal-wrapper/modal-wrapper';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the UserAccountModificationFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-account-modification-form',
  templateUrl: 'user-account-modification-form.html',
})
export class UserAccountModificationFormPage {
  @ViewChild("contentRef") contentHandle: Content;
  bgVert:   number = 0 ;
  lastBgV:  number = 0 ;
  
  scrollVert:   number = 0 ;
  lastScrollV:  number = 0 ;
  transparentPercent: number = 0;

  avatarImage: String = "";
  formData;
  nickname: String = "";
  username: String = "";
  registrationDate: String = "";
  introduction: String = "";
  gender: String = "";
  age: String = "";
  job: String = "";
  region: String = "";
  marriage: String = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public alertCtrl: AlertController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public ModalWrapperPage: ModalWrapperPage,
    private domSanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserAccountModificationFormPage');
    let loading = this.commonService.presentLoading();
    
    this.userService.getUserInfo()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.avatarImage = data.data.avatar_image;
          this.nickname = data.data.nickname;
          this.username = data.data.username;
          this.gender = data.data.gender;
          this.age = data.data.age;
          this.job = data.data.job;
          this.region = data.data.region;
          this.marriage = data.data.marriage;
          this.introduction = data.data.introduction;
          this.registrationDate = data.data.user_registration_date;
        }
        else if(data.success == false) {
          this.commonService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          })
        }
      },
      (err) => {
        console.log(err);
        this.commonService.showBasicAlert('오류가 발생했습니다.');
      }
    );
  }

  dismiss() {
    this.ModalWrapperPage.dismissModal();
  }

  sanitize(url: string){
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  modifyAvatar() {
    this.commonService.selectImage()
    .then(this.commonService.readFile)
    .then((params) => {
      this.avatarImage = params[0].localURL;
      this.formData = params[1];
    });
  }

  modifyNickname(oldNickname) {
    let alert = this.alertCtrl.create({
      title: '새로운 닉네임을 입력해주세요.',
      inputs: [
        {
          name: 'nickname',
          value: oldNickname,
        }
      ],
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: data => {
            console.log('취소');
          }
        },
        {
          text: '완료',
          handler: data => {
            let regExp = /[가-힣0-9a-zA-Z]{2,16}$/;
            let withoutKorean = data.nickname.replace(/[가-힣]/g, '');
            let withoutEnglish = data.nickname.replace(/[0-9a-zA-z]/g, '');
            let byte = withoutKorean.length + withoutEnglish.length * 2;
            if(!this.nickname.match(regExp) || byte < 4 || byte > 16) {
              this.commonService.showBasicAlert('닉네임은 한글 2 ~ 8자, 영문, 숫자 4 ~ 16자 이내로 입력해주세요.');
            }
            else {
              this.nickname = data.nickname;
            }
          }
        }
      ]
    });
    alert.present();
  }

  uploadFile() {
    return new Promise(
      (resolve, reject) => {
        if(!this.formData) {
          resolve();
        }
        else {
          this.commonService.uploadFile(this.formData)
          .subscribe(
            (data) => {
              if(data.success == true) {
                this.avatarImage = data.data;
                resolve();
              }
              else if(data.success == false) {
                this.commonService.apiRequestErrorHandler(data, this.navCtrl)
                .then(() => {
                  this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
                });
              }
            }
          ) 
        }
      }
    )
  }

  modifyAccount() {
    console.log("수정 완료");

    let loading = this.commonService.presentLoading();
    this.uploadFile()
    .then(() => {
      this.userService.updateAccount(this.avatarImage, this.nickname, this.introduction)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.commonService.showBasicAlert('수정이 완료되었습니다.');
            this.ModalWrapperPage.dismissModal("refresh");
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.modifyAccount();
            })
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );
    });
  }

  // swipeEvent(e) {
  //   if(e.direction == 16) {
  //     document.querySelector(".account-modification-page-content .scroll-content")['style'].background = 'transparent';
  //     if(this.contentHandle.scrollTop > -90) {
  //       this.dismiss();
  //     }
  //   }
  // }

  panEnd() {
    if(this.contentHandle.scrollTop <= -90) {
      console.log('pan: ' + this.lastBgV);
      document.querySelector(".account-modification-page-content .scroll-content")['style'].background = 'transparent';
      this.dismiss();
    }
  }

  scrollingEvent($e) {
    var stepV = $e.scrollTop /10 ;
    this.scrollVert = this.lastScrollV - stepV ;
    if (this.scrollVert < 0) {
       this.scrollVert = 0 ;
    } else {
       if (this.scrollVert > 100)
          this.scrollVert = 100 ;
    }
    if(this.scrollVert < 20) {
      // this.transparentPercent = 1 - (this.scrollVert /20);
      // document.querySelector(".account-modification-page-content .scroll-content")['style'].background = 'rgba(0,0,0,'+this.transparentPercent+')';
    }
  }

}
