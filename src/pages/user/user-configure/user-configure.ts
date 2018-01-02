import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

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
  isPushAlarm: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public commonService: CommonServiceProvider,
    public userService: UserServiceProvider,
    public alertCtrl: AlertController,
    public emailComposer: EmailComposer) {
    this.viewCtrl.showBackButton(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserConfigurePage');
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
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: 'feed100.help@gmail.com',
       subject: '',
       body: '<br><br><br>- FEED100 Version: 1.0.0',
       isHtml: true
     };
     
     // Send a text message using default options
     this.emailComposer.open(email);
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
      }
    );
  }
}
