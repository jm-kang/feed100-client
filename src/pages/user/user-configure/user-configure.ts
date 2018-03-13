import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Subscription } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Storage } from '@ionic/storage';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
import { Subscribable } from 'rxjs/Observable';

/**
 * Generated class for the UserConfigurePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-configure',
  templateUrl: 'user-configure.html',
})
export class UserConfigurePage {
  isPushAlarm = true;
  onResumeSubscription: Subscription;
  onPauseSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    public push: Push,
    private openNativeSettings: OpenNativeSettings) {
    this.viewCtrl.showBackButton(true);
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload UserConfigurePage');    
    this.onResumeSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserConfigurePage');
    this.permissionCheck();

    this.onResumeSubscription = this.platform.resume
    .subscribe(() => {
      console.log('resume');
      this.permissionCheck();
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter UserConfigurePage');
  }

  permissionCheck() {
    // to check if we have permission
    this.push.hasPermission()
    .then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
        this.isPushAlarm = true;
      } else {
        console.log('We do not have permission to send push notifications');
        this.isPushAlarm = false;
      }
    });
  }

  updateItem() {
    this.openNativeSettings.open("application_details");
  }

  back() {
    this.navCtrl.pop();
  }

  openUserPointExchangePage() {
    this.navCtrl.push('UserPointExchangePage');
  }

  openUserPointUsageHistoryPage() {
    this.navCtrl.push('UserPointUsageHistoryPage');
  }

  openAppIntroPage() {
    let appIntroModal = this.modalCtrl.create('ModalWrapperPage', {page: 'AppIntroPage'});
    appIntroModal.present();
  }

  openUserTutorialPage() {
    this.navCtrl.push('UserTutorialPage');
  }

  openUserHelpPage() {
    let manualModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserHelpPage'});
    manualModal.present();
  }

  openFaqPage() {
    let faqModal = this.modalCtrl.create('ModalWrapperPage', {page: 'FaqPage'});
    faqModal.present();
  }

  openTermsPage() {
    let termsModal = this.modalCtrl.create('ModalWrapperPage', {page: 'TermsPage'});
    termsModal.present();
  }

  openPrivateInfoPolicy() {
    let privateInfoPolicyModal = this.modalCtrl.create('ModalWrapperPage', {page: 'PrivateInfoPolicyPage'});
    privateInfoPolicyModal.present();
  }

  openNoticePage() {
    let noticeModal = this.modalCtrl.create('ModalWrapperPage', {page: 'NoticePage'});
    noticeModal.present();
  }

  openContactPage() {
    this.commonService.showBasicAlert('feed100.help@gmail.com<br/>으로 문의해주세요!');
  }

  openProjectCodePage() {
    let alert = this.alertCtrl.create({
      title: '프로젝트 코드를 입력해주세요.',
      inputs: [
        {
          name: 'code',
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
            let loading = this.commonService.presentLoading();
            
            this.userService.redeem(data.code)
            .finally(() => {
              loading.dismiss();
            })
            .subscribe(
              (data) => {
                if(data.success == true) {
                  if(data.data.project_id) {
                    this.accessProjectCard(data.data.project_id);
                  }
                  else {
                    this.commonService.showBasicAlert('코드가 정확하지 않습니다.');
                  }
                }
                else if(data.success == false) {
                  this.commonService.apiRequestErrorHandler(data, this.navCtrl)
                  .then(() => {
                    this.commonService.showBasicAlert('잠시 후 다시 시도해주세요.')                    
                  })
                }
              },
              (err) => {
                console.log(JSON.stringify(err));
                this.commonService.showBasicAlert('오류가 발생했습니다.')
              }
            );
          }
        }
      ]
    });
    
    alert.present();
  }

  accessProjectCard(project_id) {
    this.userService.accessProjectCard(this, project_id);    
  }

  openUserAccountModificationFormPage() {
    let userAccountModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserAccountModificationFormPage'});
    userAccountModificationFormModal.present();
  }

  openUserProfileModificationFormPage() {
    let userProfileModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserProfileModificationFormPage'});
    userProfileModificationFormModal.present();
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
