import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { UserProjectFilterResultPage } from '../user-project-filter-result/user-project-filter-result';

/**
 * Generated class for the UserProjectFilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-filter',
  templateUrl: 'user-project-filter.html',
})
export class UserProjectFilterPage {
  projectMainImage: String = "assets/img/project-main-image2.png";
  projectName: String = "프로젝트 이름 프로젝트 이름";
  

  filters = [
    {option: '기능', value:'selcetOption1', isActiveFilter: false},
    {option: '개선사항', value:'selcetOption2', isActiveFilter: false},
    {option: 'Shes a Baby', value: 'selcetOption5', isActiveFilter: false},
    {option: '전지전능', value:'selcetOption3', isActiveFilter: false},
    {option: '로비', value: 'selcetOption4', isActiveFilter: false},
    {option: '설현', value: 'selcetOption6', isActiveFilter: false},
  ];

  filterResults = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFilterPage');
    // this.filterResults.splice(0, this.filterResults.length);
    // for(let i=0; i<this.filters.length; i++) {
    //   this.filters[i].isActiveFilter = false;
    // }
  }

  ionViewDidEnter() {
    this.statusBar.hide(); 
  }

  back() {
    this.navCtrl.pop(); 
  }

  openUserProjectFilterResultPage(filters) {
    let userProjectFilterResultModal = this.modalCtrl.create(UserProjectFilterResultPage, {filters: filters});  
    userProjectFilterResultModal.present();
  }

  activeFilter(filter) {
    filter.isActiveFilter = true;
    this.filterResults.push(filter);
  }

  inactiveFilter(filter) {
    filter.isActiveFilter = false;
    let index: number = this.filterResults.indexOf(filter);
    console.log('index' + index);
    this.filterResults.splice(index, 1);
  }

  skip() {
    this.filterResults.splice(0, this.filterResults.length);
    for(let i = 0; i < this.filters.length; i++) {
      this.filterResults.push(this.filters[i]);
      this.filters[i].isActiveFilter = true;
    }

    this.openUserProjectFilterResultPage(this.filterResults);
  }

  activeAllFilter() {
    this.filterResults.splice(0, this.filterResults.length);
    for(let i = 0; i < this.filters.length; i++) {
      this.filterResults.push(this.filters[i]);
      this.filters[i].isActiveFilter = true;
    }
    
    console.log("...start");
    for(let i = 0; i < this.filterResults.length; i++) {
      console.log(this.filterResults[i].option);
    }
    console.log("...end");
  }

  inactiveAllFilter() {
    this.filterResults.splice(0, this.filterResults.length);
    for(let i = 0; i < this.filters.length; i++) {
      this.filters[i].isActiveFilter = false;
    }
    
  }

}
