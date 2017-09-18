import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, Content } from 'ionic-angular';

import { HttpServiceProvider } from '../../../providers/http-service/http-service';

/**
 * Generated class for the UserProjectFeedbackWritingEditorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-project-feedback-writing-editor',
  templateUrl: 'user-project-feedback-writing-editor.html',
})
export class UserProjectFeedbackWritingEditorPage {
  @ViewChild("contentRef") contentHandle: Content;

  project_id;

  feedbackContent: String = "";
  contentPlaceholder: String = '프로젝트에 대해 느낀점을 자세히 이야기해주세요. 성실히 작성된 이야기일수록 높은 공감수와 기업에게 큰 도움을 줍니다.';
  minTextLength: number = 100;
  isActiveNewHashtag: boolean = false;
  feedbackImages = [];

  projectHashtags = [];

  feedbackHashtags = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCntrl: ModalController, 
    public viewCtrl: ViewController, 
    public httpService: HttpServiceProvider) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProjectFeedbackWritingEditorPage');
    let loading = this.httpService.presentLoading();
    this.project_id = this.navParams.get('project_id');

    this.httpService.getProjectHome(this.project_id)
    .finally(() => {
      loading.dismiss();
    })
    .subscribe(
      (data) => {
        if(data.success == true) {
          this.projectHashtags = JSON.parse(data.data.project_hashtags);
        }
        else if(data.success == false) {
          this.httpService.apiRequestErrorHandler(data, this.navCtrl)
          .then(() => {
            this.ionViewDidLoad();
          });
        }
      },
      (err) => {
        console.log(err);
        this.httpService.showBasicAlert('오류가 발생했습니다.');
      }
    )

  }

  ionViewDidEnter() {    
    if(this.navParams.get('feedbackContent').length > 0) {
      this.feedbackContent = this.navParams.get('feedbackContent').replace(/<br *\/?>/gi, '\n');
    }
    for( let i=0; i < this.navParams.get('feedbackHashtags').length; i++) {
      this.feedbackHashtags.push(this.navParams.get('feedbackHashtags')[i]);
      for(let j = 0; j < this.projectHashtags.length; j++) {
        if(this.projectHashtags[j] == this.feedbackHashtags[i]) {
          this.projectHashtags.splice(j,1);
        }
      }
    }
    for( let i=0; i < this.navParams.get('feedbackImages').length; i++) {
      delete this.navParams.get('feedbackImages')[i].width;
      delete this.navParams.get('feedbackImages')[i].height;
      delete this.navParams.get('feedbackImages')[i].left;
      delete this.navParams.get('feedbackImages')[i].top;
      delete this.navParams.get('feedbackImages')[i].maxWidth;
      delete this.navParams.get('feedbackImages')[i].maxHeight;
      this.feedbackImages.push({"img" : this.navParams.get('feedbackImages')[i].img});
    }
  }

  scrollingFun(e) {
    // console.log("Y: " + this.contentHandle.getContentDimensions().contentTop);
    if (e.scrollTop < -150) {
      let data = "";
      this.viewCtrl.dismiss(data);
    }
  }

  completeEditor() {
    for(let i=0; i<this.feedbackImages.length; i++) {
      delete this.feedbackImages[i].width;
      delete this.feedbackImages[i].height;
      delete this.feedbackImages[i].left;
      delete this.feedbackImages[i].top;
      delete this.feedbackImages[i].maxWidth;
      delete this.feedbackImages[i].maxHeight;
    }
    let data = { feedbackContent: this.feedbackContent, feedbackImages: JSON.parse(JSON.stringify(this.feedbackImages)), feedbackHashtags: this.feedbackHashtags };
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
    let data = "";
    this.viewCtrl.dismiss(data);
  }

  activeHashtag(hashtag) {
    this.feedbackHashtags.push(hashtag);
    let index: number = this.projectHashtags.indexOf(hashtag);
    this.projectHashtags.splice(index, 1);
  }

  inactiveHashtag(hashtag) {
    let index: number = this.feedbackHashtags.indexOf(hashtag);
    if(this.feedbackHashtags[index].isActiveHashtag) {
      this.feedbackHashtags.splice(index, 1);
      this.isActiveNewHashtag = false;
    } else {
      this.projectHashtags.push(hashtag);
      this.feedbackHashtags.splice(index, 1);
    }
  }

  onFeedbackLoad(img, i) {
    let tempHeight: any;
    let tempWidth: any;
    let tempLeft: any;
    let tempTop: any;
    let tempMaxHeight: any;
    let tempMaxWidth: any;

    if(img.width >= img.height) {
      tempHeight = img.width + 'px';
      tempWidth = 'auto';
      tempTop = 'initial';
      tempLeft = "-" + (img.width*(img.width/img.height)-img.width)/2 + 'px';
      tempMaxHeight = '100%';
      tempMaxWidth = 'initial';
    } else {
      tempWidth = img.height + 'px';
      tempHeight = 'auto';
      tempLeft = 'initial';
      tempTop = "-" + (img.height-img.width)/2 + 'px';
      tempMaxWidth = '100%';
      tempMaxHeight = 'initial';
    }
    this.feedbackImages[i].width = tempWidth;
    this.feedbackImages[i].height = tempHeight;
    this.feedbackImages[i].left = tempLeft;
    this.feedbackImages[i].top = tempTop;
    this.feedbackImages[i].maxHeight = tempMaxHeight;
    this.feedbackImages[i].maxWidth = tempMaxWidth;
    console.log("feedback-writing : ", img.width, img.height, tempWidth, tempHeight, tempLeft, tempTop, tempMaxHeight, tempMaxWidth);
  }

  deleteImage(i) {
    console.log("deleteImage(): 이미지 삭제 버튼");
    this.feedbackImages.splice(i, 1);
  }

  addImage() {
    console.log("addImage(): 이미지 추가 버튼");
    this.httpService.selectImage()
    .then(this.httpService.readFile)
    .then((formData) => {
      let loading = this.httpService.presentLoading();
      this.httpService.uploadFile(formData)
      .finally(() => {
        loading.dismiss();
      })
      .subscribe(
        (data) => {
          if(data.success == true) {
            this.feedbackImages.push({ "img" : data.data });
          }
          else if(data.success == false) {
            this.httpService.apiRequestErrorHandler(data, this.navCtrl)
            .then(() => {
              this.httpService.showBasicAlert('잠시 후 다시 시도해주세요.');
            });
          }
        },
        (err) => {
          console.log(err);
          this.httpService.showBasicAlert('오류가 발생했습니다.');
        }
      );
    })
    .catch((err) => {
      console.log(err);
      this.httpService.showBasicAlert('오류가 발생했습니다.');
    });
  }

}
