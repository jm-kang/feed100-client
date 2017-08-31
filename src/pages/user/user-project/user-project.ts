import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';

import { UserProjectHomePage } from '../user-project-home/user-project-home';
import { UserProfileModificationFormPage } from '../user-profile-modification-form/user-profile-modification-form';
import { UserProjectStoryPage } from '../user-project-story/user-project-story';
import { UserProjectParticipationConditionFormPage } from '../user-project-participation-condition-form/user-project-participation-condition-form';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the UserProjectPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project',
  templateUrl: 'user-project.html',
})
export class UserProjectPage {

  projects = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public appCtrl: App,
    public httpService: HttpServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectPage');
    this.httpService.getProjects()
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projects = data.data;
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          })
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
        this.httpService.showBasicAlert('오류가 발생했습니다.')
      }
    )

  }

  accessProjectCard(project_id) {
    // 프로필 수정 페이지 이동 (프로필 작성을 하지 않은 경우)
    // 프로젝트 스토리 이동 (인원이 다 찼거나 프로젝트 기간이 끝난 경우)
    // 프로젝트 참여조건 페이지 이동 (프로젝트 기간이고 인원이 다 차지 않은 경우)
    // 프로젝트 홈 페이지 이동 (프로젝트에 참여했고 프로젝트 기간인 경우)
    this.openUserProjectStoryPage(project_id);
  }

  openUserProjectHomePage() {
    let userProjectHomeModal = this.modalCtrl.create(UserProjectHomePage);
    userProjectHomeModal.present();
  }

  openUserProfileModificationFormPage() {
    let userProfileModificationFormModal = this.modalCtrl.create(UserProfileModificationFormPage);
    userProfileModificationFormModal.present();
  }

  openUserProjectStoryPage(project_id) {
    this.appCtrl.getRootNav().push(UserProjectStoryPage, { "project_id" : project_id });
  }

  openUserProjectParticipationConditionFormPage() {
    let userProjectParticipationConditionFormModal = this.modalCtrl.create(UserProjectParticipationConditionFormPage);
    userProjectParticipationConditionFormModal.present();
  }
}
