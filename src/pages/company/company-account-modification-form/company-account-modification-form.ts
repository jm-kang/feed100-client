import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';


import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { CompanyServiceProvider } from '../../../providers/company-service/company-service';
/**
 * Generated class for the CompanyAccountModificationFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-account-modification-form',
  templateUrl: 'company-account-modification-form.html',
})
export class CompanyAccountModificationFormPage {
  avatarImage: String = "";
  nickname: String = "";
  username: String = "";
  maxHeight: any =  "";
  maxWidth: any =  "";
  height: any =  "";
  width: any =  "";
  left: any =  "";
  top: any =  "";
  introduction: String = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public alertCtrl: AlertController,
    public commonService: CommonServiceProvider,
    public companyService: CompanyServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyAccountModificationFormPage');
    let loading = this.commonService.presentLoading();
    
    this.companyService.getCompanyInfo()
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.avatarImage = data.data.avatar_image;
          this.username = data.data.username;
          this.introduction = data.data.introduction;
          this.nickname = data.data.nickname;
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

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      this.viewCtrl.dismiss();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  modifyAvatar() {
    this.commonService.selectImage()
    .then(this.commonService.readFile)
    .then((formData) => {
      let loading = this.commonService.presentLoading();
      this.commonService.uploadFile(formData)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.avatarImage = data.data;
          }
          else if(data.success == false) {
            this.commonService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.');
            });
          }
        },
        (err) => {
          console.log(err);
          this.commonService.showBasicAlert('오류가 발생했습니다.');
        }
      );
    })
    .catch((err) => {
      console.log(err);
      this.commonService.showBasicAlert('오류가 발생했습니다.');
    });  

  }

  onAvatarImageLoad(img) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;

    if(img.width/16 >= img.height/9) {
      tempHeight = img.width*9/16 + 'px';
      tempWidth = 'auto';
      tempTop = 'initial';
      tempLeft = "-" + (img.width-img.height*16/9)/2  + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {

      tempWidth = img.height*16/9 + 'px';
      tempHeight = 'auto';
      tempLeft = 'initial';
      tempTop = "-" + (img.height-img.width*9/16)/2 + 'px';
      tempMaxWidth = '100%';
      tempMaxHeight = 'initial';
    }
    this.width = tempWidth;
    this.height = tempHeight;
    this.left = tempLeft;
    this.top = tempTop;
    this.maxHeight = tempMaxHeight;
    this.maxWidth = tempMaxWidth;
  }

  modifyNickname(oldNickname) {
    let alert = this.alertCtrl.create({
      title: '새로운 기업명을 입력해주세요.',
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
            if(data.nickname.length >= 2 && data.nickname.length <= 8) {
              this.nickname = data.nickname;
            }
            else {
              this.commonService.showBasicAlert('닉네임은 2~8글자여야 합니다.');
            }
          }
        }
      ]
    });
    alert.present();
  }

  modifyAccount() {
    console.log("수정 완료");
    let loading = this.commonService.presentLoading();
    
    this.companyService.updateAccount(this.avatarImage, this.nickname, this.introduction)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.commonService.showBasicAlert('수정이 완료되었습니다.');
          this.viewCtrl.dismiss("refresh");
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
  }
}
