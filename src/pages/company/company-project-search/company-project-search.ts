import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';

import { CompanyProjectSearchResultPage } from '../company-project-search-result/company-project-search-result';

/**
 * Generated class for the CompanyProjectSearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-project-search',
  templateUrl: 'company-project-search.html',
})
export class CompanyProjectSearchPage {
  projectMainImage: String = "";
  projectName: String = "";

  projectHashtags = [];

  searchResults = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectSearchPage');
    this.projectHashtags = this.navParams.get('project_hashtags');
    this.projectMainImage = this.navParams.get('project_main_image');
    this.projectName = this.navParams.get('project_name');
  }

  ionViewDidEnter() {
    this.statusBar.hide(); 
  }

  back() {
    this.navCtrl.pop(); 
  }

  openCompanyProjectSearchResultPage() {
    let companyProjectSearchResultModal = this.modalCtrl.create(CompanyProjectSearchResultPage, 
      { "searchResults" : JSON.parse(JSON.stringify(this.searchResults)),
        "projectHashtags" : JSON.parse(JSON.stringify(this.projectHashtags)),
        "feedbacks" : JSON.parse(JSON.stringify(this.navParams.get('feedbacks')))} );  
    companyProjectSearchResultModal.present();
  }

  activeHashtag(hashtag) {
    hashtag.isActiveHashtag = true;
    this.searchResults.push(hashtag);
  }

  inactiveHashtag(hashtag) {
    let index: number = this.searchResults.indexOf(hashtag);
    hashtag.isActiveHashtag = false;
    console.log('index' + index);
    this.searchResults.splice(index, 1);
  }

  skip() {
    this.searchResults.splice(0, this.searchResults.length);
    for(let i = 0; i < this.projectHashtags.length; i++) {
      this.searchResults.push(this.projectHashtags[i]);
      this.projectHashtags[i].isActiveHashtag = true;
    }

    this.openCompanyProjectSearchResultPage();
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
