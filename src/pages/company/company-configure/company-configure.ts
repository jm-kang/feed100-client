import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { LoginPage } from '../../common/login/login';
import { AppIntroPage } from '../../common/app-intro/app-intro';
import { TutorialPage } from '../../common/tutorial/tutorial';
import { ManualPage } from '../../common/manual/manual';
import { FaqPage } from '../../common/faq/faq';
import { TermsPage } from '../../common/terms/terms';
import { PrivateInfoPolicyPage } from '../../common/private-info-policy/private-info-policy';
import { NoticePage } from '../../common/notice/notice';
import { CompanyProjectRegistrationPage } from '../company-project-registration/company-project-registration';
import { ContactPage } from '../../common/contact/contact';
import { CompanyAccountModificationFormPage } from '../company-account-modification-form/company-account-modification-form';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the CompanyConfigurePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-configure',
  templateUrl: 'company-configure.html',
})
export class CompanyConfigurePage {
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

  openCompanyProjectRegistrationPage() {
    let companyProjectRegistrationModal = this.modalCtrl.create(CompanyProjectRegistrationPage);
    companyProjectRegistrationModal.present();
  }

  openContactPage() {
    let contactModal = this.modalCtrl.create(ContactPage);
    contactModal.present();
  }

  openCompanyAccountModificationFormPage() {
    let companyAccountModificationFormModal = this.modalCtrl.create(CompanyAccountModificationFormPage);
    companyAccountModificationFormModal.present();
  }

  logout() {
    this.httpService.showConfirmAlert('정말 로그아웃하시겠습니까?', 
      () => {
        this.httpService.logout(this.navCtrl);
      }
    );
  }

}
