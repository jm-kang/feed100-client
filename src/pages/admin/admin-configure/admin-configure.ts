import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Subscription } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Storage } from '@ionic/storage';

import { CommonServiceProvider } from '../../../providers/common-service/common-service';
import { AdminServiceProvider } from '../../../providers/admin-service/admin-service';

/**
 * Generated class for the AdminConfigurePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-configure',
  templateUrl: 'admin-configure.html',
})
export class AdminConfigurePage {
  isPushAlarm = true;
  onResumeSubscription: Subscription;
  onPauseSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public adminServiceProvider: AdminServiceProvider,
    public alertCtrl: AlertController,
    public platform: Platform,
    public push: Push,
    private openNativeSettings: OpenNativeSettings) {
    this.viewCtrl.showBackButton(true);
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload AdminConfigurePage');    
    this.onResumeSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminConfigurePage');
    this.permissionCheck();

    this.onResumeSubscription = this.platform.resume
    .subscribe(() => {
      console.log('resume');
      this.permissionCheck();
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AdminConfigurePage');
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

  openAppIntroPage() {
    let appIntroModal = this.modalCtrl.create('ModalWrapperPage', {page: 'AppIntroPage'});
    appIntroModal.present();
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

  logout() {
    this.commonService.showConfirmAlert('정말 로그아웃하시겠습니까?',
      () => {
        this.commonService.logout(this.navCtrl);
        localStorage.clear();
      }
    );
  }
}
