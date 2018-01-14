import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

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
  project_id;
  
  projectMainImage: String = "";
  projectName: String = "";

  projectHashtags = [];

  searchResults = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyProjectSearchPage');
    this.projectHashtags = this.navParams.get('project_hashtags');
    for(let i = 0; i < this.projectHashtags.length; i++) {
      this.projectHashtags[i] = { "value" : this.projectHashtags[i] };
    }
    this.projectMainImage = this.navParams.get('project_main_image');
    this.projectName = this.navParams.get('project_name');
    this.project_id = this.navParams.get('project_id');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter CompanyProjectSearchPage');
  }

  back() {
    this.navCtrl.pop(); 
  }

  openCompanyProjectSearchResultPage() {
    let hashtags = [];
    for(let i = 0; i < this.searchResults.length; i++) {
      hashtags.push(this.searchResults[i].value);
    }
    this.navCtrl.push('CompanyProjectSearchResultPage', { "hashtags" : hashtags, "project_id" : this.project_id })
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

  activeAllHashtag() {
    this.searchResults.splice(0, this.searchResults.length);
    for(let i = 0; i < this.projectHashtags.length; i++) {
      this.searchResults.push(this.projectHashtags[i]);
      this.projectHashtags[i].isActiveHashtag = true;
    }
  }

  inactiveAllHashtag() {
    this.searchResults.splice(0, this.searchResults.length);
    for(let i = 0; i < this.projectHashtags.length; i++) {
      this.projectHashtags[i].isActiveHashtag = false;
    }
    
  }

}
