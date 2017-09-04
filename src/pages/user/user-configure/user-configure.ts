import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { LoginPage } from '../../common/login/login';
import { UserPointExchangePage } from '../user-point-exchange/user-point-exchange';
import { UserPointUsageHistoryPage } from '../user-point-usage-history/user-point-usage-history';
import { AppIntroPage } from '../../common/app-intro/app-intro';
import { TutorialPage } from '../../common/tutorial/tutorial';
import { ManualPage } from '../../common/manual/manual';
import { FaqPage } from '../../common/faq/faq';
import { TermsPage } from '../../common/terms/terms';
import { PrivateInfoPolicyPage } from '../../common/private-info-policy/private-info-policy';
import { NoticePage } from '../../common/notice/notice';
import { ContactPage } from '../../common/contact/contact';
import { UserAccountModificationFormPage } from '../user-account-modification-form/user-account-modification-form';
import { UserProfileModificationFormPage } from '../user-profile-modification-form/user-profile-modification-form';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

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
    public httpService: HttpServiceProvider,
    public alertCtrl: AlertController) {
    this.viewCtrl.showBackButton(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserConfigurePage');
  }

  back() {
    this.navCtrl.pop();
  }

  openUserPointExchangePage() {
    this.navCtrl.push(UserPointExchangePage);
  }

  openUserPointUsageHistoryPage() {
    this.navCtrl.push(UserPointUsageHistoryPage);
  }
  
  openAppIntroPage() {
    let appIntroModal = this.modalCtrl.create(AppIntroPage);
    appIntroModal.present();
  }

  openTutorialPage() {
    let tutorialModal = this.modalCtrl.create(TutorialPage);
    tutorialModal.present();
  }

  openManualPage() {
    let manualModal = this.modalCtrl.create(ManualPage);
    manualModal.present();
  }

  openFaqPage() {
    let faqModal = this.modalCtrl.create(FaqPage);
    faqModal.present();
  }

  openTermsPage() {
    let termsModal = this.modalCtrl.create(TermsPage);
    termsModal.present();
  }

  openPrivateInfoPolicy() {
    let privateInfoPolicyModal = this.modalCtrl.create(PrivateInfoPolicyPage);
    privateInfoPolicyModal.present();
  }

  openNoticePage() {
    let noticeModal = this.modalCtrl.create(NoticePage);
    noticeModal.present();
  }

  openContactPage() {
    let contactModal = this.modalCtrl.create(ContactPage);
    contactModal.present();
  }

  openUserAccountModificationFormPage() {
    let userAccountModificationFormModal = this.modalCtrl.create(UserAccountModificationFormPage);
    userAccountModificationFormModal.present();
  }

  openUserProfileModificationFormPage() {
    let userProfileModificationFormModal = this.modalCtrl.create(UserProfileModificationFormPage);
    userProfileModificationFormModal.present();
  }

  logout() {
    this.httpService.showConfirmAlert('정말 로그아웃하시겠습니까?', 
      () => {
        this.httpService.logout(this.navCtrl);
      }
    );
  }
}
