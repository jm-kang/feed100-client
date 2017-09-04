import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { UserProjectSearchResultPage } from '../user-project-search-result/user-project-search-result';

/**
 * Generated class for the UserProjectSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-search',
  templateUrl: 'user-project-search.html',
})
export class UserProjectSearchPage {
  projectMainImage: String = "assets/img/project-main-image2.png";
  projectName: String = "프로젝트 이름 프로젝트 이름";

  projectHashtags = [
    {value: '기능', isActiveHashtag: false},
    {value: '개선사항', isActiveHashtag: false},
    {value: 'Shes a Baby', isActiveHashtag: false},
    {value: '전지전능', isActiveHashtag: false},
    {value: '로비', isActiveHashtag: false},
    {value: '설현', isActiveHashtag: false},
  ];

  searchResults = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectSearchPage');
  }

  ionViewDidEnter() {
    this.statusBar.hide(); 
  }

  back() {
    this.navCtrl.pop(); 
  }

  openUserProjectSearchResultPage(hashtags) {
    let userProjectSearchResultModal = this.modalCtrl.create(UserProjectSearchResultPage, {hashtags: hashtags});  
    userProjectSearchResultModal.present();
  }

  activeHashtag(hashtag) {
    hashtag.isActiveHashtag = true;
    this.searchResults.push(hashtag);
  }

  inactiveHashtag(hashtag) {
    hashtag.isActiveHashtag = false;
    let index: number = this.searchResults.indexOf(hashtag);
    console.log('index' + index);
    this.searchResults.splice(index, 1);
  }

  skip() {
    this.searchResults.splice(0, this.searchResults.length);
    for(let i = 0; i < this.projectHashtags.length; i++) {
      this.searchResults.push(this.projectHashtags[i]);
      this.projectHashtags[i].isActiveHashtag = true;
    }

    this.openUserProjectSearchResultPage(this.searchResults);
  }

  activeAllHashtag() {
    this.searchResults.splice(0, this.searchResults.length);
    for(let i = 0; i < this.projectHashtags.length; i++) {
      this.searchResults.push(this.projectHashtags[i]);
      this.projectHashtags[i].isActiveHashtag = true;
    }
    
    console.log("...start");
    for(let i = 0; i < this.searchResults.length; i++) {
      console.log(this.searchResults[i].value);
    }
    console.log("...end");
  }

  inactiveAllHashtag() {
    this.searchResults.splice(0, this.searchResults.length);
    for(let i = 0; i < this.projectHashtags.length; i++) {
      this.projectHashtags[i].isActiveHashtag = false;
    }
    
  }
}
