import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Subscription } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Storage } from '@ionic/storage';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { UserServiceProvider } from '../../../providers/user-service/user-service';
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
  flag = false;
  onResumeSubscription: Subscription;

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserConfigurePage');
    this.permissionCheck();

    this.onResumeSubscription = this.platform.resume
    .subscribe(() => {
      console.log('resume');
      this.permissionCheck();
    });
  }

  ionViewDidLeave() {
    this.onResumeSubscription.unsubscribe();
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
      setTimeout(() => {
        this.flag = true;
      }, 1000);
    });
  }

  updateItem() {
    if(this.flag) {
      this.openNativeSettings.open("application_details");
      this.flag = false;
    }
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
    let contactModal = this.modalCtrl.create('ModalWrapperPage', {page: 'ContactPage'});
    contactModal.present();
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
