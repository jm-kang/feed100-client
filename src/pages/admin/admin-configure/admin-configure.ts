import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Subscription } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { Storage } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer';

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
  flag = false;
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
    private openNativeSettings: OpenNativeSettings,
    public emailComposer: EmailComposer) {
    this.viewCtrl.showBackButton(true);
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload AdminConfigurePage');    
    this.onResumeSubscription.unsubscribe();
    this.onPauseSubscription.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminConfigurePage');
    this.permissionCheck();

    this.onResumeSubscription = this.platform.resume
    .subscribe(() => {
      console.log('resume');
      this.permissionCheck();
    });

    this.onPauseSubscription = this.platform.pause
    .subscribe(() => {
      console.log('pause');
      this.flag = false;
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
    }
  }

  back() {
    this.navCtrl.pop();
  }

  openAppIntroPage() {
    let appIntroModal = this.modalCtrl.create('ModalWrapperPage', {page: 'AppIntroPage'});
    appIntroModal.present();
  }

  openCompanyTutorialPage() {
    this.navCtrl.push('CompanyTutorialPage');
  }

  openCompanyHelpPage() {
    let manualModal = this.modalCtrl.create('ModalWrapperPage', {page: 'CompanyHelpPage'});
    manualModal.present();
  }

  openUserTutorialPage() {
    this.navCtrl.push('UserTutorialPage');
  }

  openUserHelpPage() {
    let manualModal = this.modalCtrl.create('ModalWrapperPage', {page: 'UserHelpPage'});
    manualModal.present();
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
    // this.emailComposer.isAvailable().then((available: boolean) =>{
    //   if(available) {
    //     //Now we know we can send
    //   }
    //  });
     
    //  let email = {
    //    to: 'feed100.help@gmail.com',
    //    subject: '',
    //    body: '<br><br><br>- FEED100 Version: 1.0.0',
    //    isHtml: true
    //  };
     
    //  // Send a text message using default options
    //  this.emailComposer.open(email);
  }

  openAdminAccountModificationFormPage() {
    let adminAccountModificationFormModal = this.modalCtrl.create('ModalWrapperPage', {page: 'AdminAccountModificationFormPage'});
    adminAccountModificationFormModal.present();
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
